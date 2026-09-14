// Campaign-level attribution only: no customer IDs, emails or full referrer URLs.
export const ATTRIBUTION_KEY = 'bdg-attribution-v1';
export const ATTRIBUTION_TTL = 30 * 60 * 1000;
export type BookingAttribution = {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  capturedAt: number;
};

function label(value: string | null | undefined): string | undefined {
  if (typeof value !== 'string' || !value || value.length > 100 || /@|https?:|\d{10,}/i.test(value)) return undefined;
  // Opaque numeric campaign IDs (including Meta IDs) are allowed separately below.
  return value.trim().replace(/[^a-zA-Z0-9_.-]+/g, '_').slice(0, 80) || undefined;
}

function campaignLabel(value: string | null | undefined): string | undefined {
  if (typeof value === 'string' && /^\d{15,20}$/.test(value)) return value;
  return label(value);
}

export function pageLabel(pathname: string): string {
  const pages: Record<string, string> = {
    '/': 'home', '/pricing': 'pricing', '/memberships': 'memberships',
    '/faq': 'faq', '/visit': 'visit', '/trackman-io': 'trackman',
    '/24-7-indoor-golf-cypress': '24_7_cypress',
  };
  return pages[pathname.replace(/\/$/, '') || '/'] || 'other';
}

export function resolveAttribution(
  href: string, referrer: string, stored: BookingAttribution | null, now: number,
): BookingAttribution {
  const url = new URL(href);
  const source = label(url.searchParams.get('utm_source'));
  const medium = label(url.searchParams.get('utm_medium'));
  const campaign = campaignLabel(url.searchParams.get('utm_campaign'));
  const content = label(url.searchParams.get('utm_content'));
  if (source || medium || campaign) {
    return { source: source || 'unknown', medium: medium || 'unknown', campaign, content, capturedAt: now };
  }
  if (url.searchParams.has('gclid') || url.searchParams.has('gbraid') || url.searchParams.has('wbraid')) {
    return { source: 'google', medium: 'cpc', capturedAt: now };
  }
  let host = '';
  try { host = new URL(referrer).hostname.toLowerCase(); } catch { /* No referrer. */ }
  const internal = !host || ['babydrawgolf.net', 'www.babydrawgolf.net', url.hostname].includes(host);
  if (stored && now >= stored.capturedAt && now - stored.capturedAt < ATTRIBUTION_TTL) {
    return { source: label(stored.source) || 'unknown', medium: label(stored.medium) || 'unknown',
      campaign: campaignLabel(stored.campaign), content: label(stored.content), capturedAt: stored.capturedAt };
  }
  const matches = (domain: string) => host === domain || host.endsWith('.' + domain);
  let inferredSource = internal ? 'direct' : 'external';
  let inferredMedium = internal ? 'none' : 'referral';
  if (!internal) {
    if (matches('google.com')) inferredSource = 'google';
    else if (matches('bing.com')) inferredSource = 'bing';
    else if (matches('duckduckgo.com')) inferredSource = 'duckduckgo';
    else if (matches('instagram.com')) { inferredSource = 'instagram'; inferredMedium = 'social'; }
    else if (matches('facebook.com')) { inferredSource = 'facebook'; inferredMedium = 'social'; }
    else if (matches('chatgpt.com') || matches('chat.openai.com')) { inferredSource = 'chatgpt'; inferredMedium = 'ai_referral'; }
    else if (matches('perplexity.ai')) { inferredSource = 'perplexity'; inferredMedium = 'ai_referral'; }
    else if (matches('communityimpact.com')) inferredSource = 'communityimpact';
    else if (matches('booking.trackmangolf.com')) inferredSource = 'trackman';
  }
  // A Google referrer alone is NOT evidence of an organic/non-brand search.
  return { source: inferredSource, medium: inferredMedium, capturedAt: now };
}

export function attributedBookingUrl(href: string, attribution: BookingAttribution, pathname: string, placement = 'link'): string {
  let target: URL;
  try { target = new URL(href); } catch { return href; }
  const venue = '/venues/baby-draw-golf';
  if (target.protocol !== 'https:' || target.hostname !== 'booking.trackmangolf.com' ||
      !(target.pathname === venue || target.pathname.startsWith(venue + '/')) ||
      target.pathname.startsWith(venue + '/admin')) return href;
  const page = pageLabel(pathname);
  // Preserve deliberately tagged destination links and original incoming campaigns.
  const tags = {
    utm_source: attribution.source,
    utm_medium: attribution.medium,
    utm_campaign: attribution.campaign || `bdg_${attribution.source}_${attribution.medium}_${page}`,
    utm_content: attribution.content || `${page}_${label(placement) || 'link'}`,
  };
  for (const [key, value] of Object.entries(tags)) {
    if (!target.searchParams.get(key)) target.searchParams.set(key, value);
  }
  return target.toString();
}
