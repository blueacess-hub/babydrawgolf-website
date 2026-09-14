import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAttribution, attributedBookingUrl, ATTRIBUTION_TTL } from '../src/lib/booking-attribution.ts';

const site = 'https://babydrawgolf.net';
const booking = 'https://booking.trackmangolf.com/venues/baby-draw-golf';
const now = 100000000;
test('keeps explicit campaign, source and medium across internal navigation', () => {
  const first = resolveAttribution(site + '/?utm_source=instagram&utm_medium=paid_social&utm_campaign=120250003386040055', '', null, now);
  const next = resolveAttribution(site + '/pricing', 'https://instagram.com/', first, now + 1000);
  assert.equal(next.campaign, '120250003386040055');
  const result = new URL(attributedBookingUrl(booking, next, '/pricing'));
  assert.equal(result.searchParams.get('utm_medium'), 'paid_social');
  assert.equal(result.searchParams.get('utm_campaign'), first.campaign);
  assert.equal(result.searchParams.get('utm_content'), 'pricing_link');
});
test('Google referrer is referral, not invented organic; paid click indicator overrides', () => {
  assert.equal(resolveAttribution(site, 'https://www.google.com/search?q=private', null, now).medium, 'referral');
  const result = resolveAttribution(site + '/?gclid=DO_NOT_FORWARD', '', null, now);
  assert.equal(result.medium, 'cpc');
  assert.ok(!attributedBookingUrl(booking, result, '/').includes('DO_NOT_FORWARD'));
});
test('generated campaign makes page and source visible to Trackman', () => {
  const a = resolveAttribution(site, 'https://chatgpt.com/c/private', null, now);
  const u = new URL(attributedBookingUrl(booking, a, '/pricing', 'rates'));
  assert.equal(u.searchParams.get('utm_campaign'), 'bdg_chatgpt_ai_referral_pricing');
  assert.ok(!u.toString().includes('private'));
});
test('preserves membership path, query, hash, and intentionally tagged links', () => {
  const a = resolveAttribution(site, '', null, now);
  const u = new URL(attributedBookingUrl(booking + '/memberships?product=5&utm_campaign=partner#plans', a, '/'));
  assert.equal(u.pathname, '/venues/baby-draw-golf/memberships');
  assert.equal(u.searchParams.get('product'), '5');
  assert.equal(u.searchParams.get('utm_campaign'), 'partner');
  assert.equal(u.hash, '#plans');
});
test('leaves non-venue, spoofed hosts, admin and unsafe schemes unchanged', () => {
  const a = resolveAttribution(site, '', null, now);
  for (const href of ['#', '/pricing', booking.replace('https:', 'http:'), booking.replace('trackmangolf.com', 'trackmangolf.com.evil.test'), booking + '/admin/reports', booking.replace('baby-draw-golf', 'other-venue'), 'mailto:info@babydrawgolf.net']) {
    assert.equal(attributedBookingUrl(href, a, '/'), href);
  }
});
test('expires old attribution and rejects malformed storage and PII-like URL labels', () => {
  const stored = { source: 'instagram', medium: 'social', capturedAt: now - ATTRIBUTION_TTL - 1 };
  assert.equal(resolveAttribution(site, '', stored, now).source, 'direct');
  assert.equal(resolveAttribution(site, '', {}, now).source, 'direct');
  const a = resolveAttribution(site + '/?utm_source=person%40example.com&utm_campaign=5551234567', '', null, now);
  assert.equal(a.source, 'direct');
});
test('is idempotent and uses only public page labels', () => {
  const a = resolveAttribution(site, '', null, now);
  const one = attributedBookingUrl(booking, a, '/customer/private/email');
  assert.equal(attributedBookingUrl(one, a, '/customer/private/email'), one);
  assert.ok(one.includes('bdg_direct_none_other'));
  assert.ok(!one.includes('email'));
});
