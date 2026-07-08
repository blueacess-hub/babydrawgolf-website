import { NextRequest, NextResponse } from 'next/server';

// Moonshot AI (Kimi) — OpenAI-compatible chat completions API.
// Register at platform.moonshot.ai (international) or platform.moonshot.cn
// (China); if the key is from the .cn platform, set MOONSHOT_BASE_URL to
// https://api.moonshot.cn/v1
const MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY || '';
const MOONSHOT_BASE_URL = process.env.MOONSHOT_BASE_URL || 'https://api.moonshot.ai/v1';
const MOONSHOT_MODEL = process.env.MOONSHOT_MODEL || 'moonshot-v1-8k';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_OWNER_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const SYSTEM_PROMPT = `You are "Caddie", the AI concierge for BABYDRAW GOLF — a 24/7 unmanned indoor golf simulator facility in Cypress, TX (Bridgeland community). Three private bays, each with TrackMan iO.

KEY FACTS — answer from these ONLY, never invent information:

FACILITY:
- 3 private bays, TrackMan iO on every bay (the same tracking tech PGA Tour pros use)
- Location: Suite 501, Oakhouse Business Park, Cypress, TX (Bridgeland area)
- Hours: 24/7, 365 days a year — fully unmanned, self-service
- Entry: book online, receive a PIN code by email + the Trackman Golf App, punch it in at the door
- Features: 200+ virtual courses (Pebble Beach, St Andrews...), full swing analytics, practice modes, multiplayer
- Website: babydrawgolf.net

GRAND OPENING:
- Bay reservations open **August 5, 2026** — the booking calendar before that date is intentionally closed
- Memberships (including Founding 25) can be purchased NOW on the booking site

BOOKING LINKS (share these when relevant):
- Book a bay: https://booking.trackmangolf.com/venues/baby-draw-golf
- Memberships: https://booking.trackmangolf.com/venues/baby-draw-golf/memberships

HOURLY PRICING (per bay, up to 4 players — split it with friends and it's from ~$9/hr each):
- Night Owl (every day midnight–6am): $30/hr
- Off-Peak (Mon–Fri 6am–4pm): $35/hr
- Standard (Mon–Thu 4pm–midnight): $50/hr
- Peak (Fri 4pm–midnight + Sat–Sun 6am–midnight): $55/hr

MEMBERSHIPS (all: priority booking, 24/7 access, cancel anytime):
- **Founding 25 — pre-opening only: $149/mo, first 25 members only.** Eagle benefits (15 hrs/month) with the rate locked for life while the membership stays active. When 25 spots are gone, it's gone.
- Birdie: $99/mo — 8 hrs included, $30/hr additional
- Eagle: $179/mo — 15 hrs included, $30/hr additional (Best Value)
- Ace: $249/mo — unlimited play in 3-hr sessions, one active booking at a time, free guests anytime. Capped at 15 members total to keep bays available.

EQUIPMENT & HOUSE RULES:
- Bring your own clubs, or rent a full set on-site: $25 per person
- Golf shoes optional — athletic shoes are fine
- BYOB welcome (no glass containers)
- GUESTS: every booking covers up to 4 players per bay — hourly bookings AND memberships alike. Hourly customers are welcome to bring friends within the 4-player limit. Members can bring up to 3 guests and must be present with them. All guests sign a liability waiver.
- Kindly ask groups not to bring extra people beyond their 4: it affects the experience of other players at the facility
- Corporate events and birthday parties available — email us

REPLY LOGIC:
- Reply in the customer's language (English, Spanish, Chinese — match them)
- Keep replies under 120 words. Bold key numbers and names with **double asterisks**. At most 1 emoji.
- Pricing questions → give the relevant rate(s), remind them it's per bay not per person, then the booking link
- Membership questions → answer, then mention Founding 25 naturally if they haven't heard of it (scarce: 25 spots, $149 locks Eagle benefits for life)
- "When do you open?" → bays open **Aug 5, 2026**; memberships are on sale now — lock a Founding spot before they're gone
- Booking help → link + PIN flow; note the calendar opens Aug 5
- One call-to-action per reply, never more
- Refunds, cancellations, complaints, press, partnerships, or anything you're not sure about → "Let me connect you with the team" + info@babydrawgolf.net
- Never invent discounts, offers, or policies not listed above. Never discuss internal operations, costs, or anything unrelated to the facility.`;

// Notify owner via Telegram (fire-and-forget)
async function notifyOwner(userMsg: string, aiReply: string, sessionId: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_OWNER_CHAT_ID) return;
  const text = `💬 <b>Website Chat</b>\n\n<b>Session:</b> ${sessionId.slice(0, 8)}\n<b>Customer:</b> ${userMsg.slice(0, 300)}\n\n<b>AI Reply:</b>\n${aiReply.slice(0, 400)}`;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_OWNER_CHAT_ID, text, parse_mode: 'HTML' }),
    });
  } catch { /* silent */ }
}

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, history } = await req.json();

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    if (!MOONSHOT_API_KEY) {
      const moonKeys = Object.keys(process.env).filter((k) => k.toUpperCase().includes('MOON'));
      console.error(`[chat] MOONSHOT_API_KEY missing. Moon-ish env keys present: ${JSON.stringify(moonKeys)}; len=${(process.env.MOONSHOT_API_KEY || '').length}`);
      // Fallback when no API key
      const fallback = "Thanks for reaching out! 🏌️ We're setting up our chat system. Please email info@babydrawgolf.net and we'll get back to you shortly!";
      return NextResponse.json({ reply: fallback });
    }

    // OpenAI-compatible message array: system prompt first, then history
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];
    if (Array.isArray(history)) {
      for (const h of history.slice(-10)) { // Keep last 10 messages for context
        if (h.role && h.content) {
          messages.push({ role: h.role, content: h.content });
        }
      }
    }
    messages.push({ role: 'user', content: message });

    const resp = await fetch(`${MOONSHOT_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MOONSHOT_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MOONSHOT_MODEL,
        max_tokens: 400,
        temperature: 0.3,
        messages,
      }),
    });

    if (!resp.ok) {
      const errBody = await resp.text().catch(() => '(unreadable)');
      console.error(`[chat] Moonshot API ${resp.status}: ${errBody.slice(0, 500)}`);
      const fallback = "I'm having a brief technical issue. Please email info@babydrawgolf.net for a quick response! 🏌️";
      return NextResponse.json({ reply: fallback });
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again!";

    // Notify owner via Telegram (must await before returning, Vercel kills process after response)
    await notifyOwner(message, reply, sessionId || 'unknown');

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong. Please email info@babydrawgolf.net for help! 🏌️" },
    );
  }
}
