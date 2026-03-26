import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_OWNER_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const SYSTEM_PROMPT = `You are the AI customer service assistant for BABYDRAW GOLF, a 24/7 unmanned indoor golf simulator facility in Cypress, TX (Bridgeland area).

KEY FACTS - answer based on these ONLY, never make up information:

FACILITY:
- Location: Suite 501, Oakhouse Business Park, Cypress, TX (Bridgeland area)
- Hours: 24/7, 365 days a year — fully unmanned, self-service
- Technology: Trackman iO simulator (same as PGA Tour pros)
- Features: 200+ virtual courses, full swing analytics, slow-mo swing replay camera, multiplayer
- Booking: Online only, you get a PIN code to enter the facility

PRICING - Hourly:
- Off-Peak (Mon-Fri before 3pm): $35/hr
- Standard (Mon-Thu 3pm-9pm): $50/hr
- Peak (Fri eve + Weekends): $55/hr
- Late Night (midnight-6am): $30/hr

PRICING - Memberships:
- Birdie: $99/mo (8 hrs included, $30/hr additional)
- Eagle: $179/mo (20 hrs included, $25/hr additional) — Best Value
- Ace: $249/mo (Unlimited hours, free guests anytime)
- All memberships include priority booking & 24/7 access. Cancel anytime.

EQUIPMENT:
- Bring your own golf clubs (recommended)
- Club rental available: $25 per person for a full set
- Golf shoes optional — athletic shoes work fine
- BYOB welcome (no glass containers)

GROUPS:
- Up to 4 people per session
- Members can bring up to 3 guests (member must be present)
- All guests sign a liability waiver
- Corporate events and birthday parties available

GUIDELINES:
- Be friendly, concise, and helpful
- If you don't know something, say "Let me check with the team" and suggest emailing info@babydrawgolf.net
- For urgent issues, suggest emailing info@babydrawgolf.net
- Keep responses under 150 words
- Use 1-2 emojis max per message
- Website: babydrawgolf.net`;

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

    if (!ANTHROPIC_API_KEY) {
      // Fallback when no API key
      const fallback = "Thanks for reaching out! 🏌️ We're setting up our chat system. Please email info@babydrawgolf.net and we'll get back to you shortly!";
      return NextResponse.json({ reply: fallback });
    }

    // Build messages from history
    const messages: Array<{ role: string; content: string }> = [];
    if (Array.isArray(history)) {
      for (const h of history.slice(-10)) { // Keep last 10 messages for context
        if (h.role && h.content) {
          messages.push({ role: h.role, content: h.content });
        }
      }
    }
    messages.push({ role: 'user', content: message });

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!resp.ok) {
      const fallback = "I'm having a brief technical issue. Please email info@babydrawgolf.net for a quick response! 🏌️";
      return NextResponse.json({ reply: fallback });
    }

    const data = await resp.json();
    const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again!";

    // Notify owner via Telegram (must await before returning, Vercel kills process after response)
    await notifyOwner(message, reply, sessionId || 'unknown');

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong. Please email info@babydrawgolf.net for help! 🏌️" },
    );
  }
}
