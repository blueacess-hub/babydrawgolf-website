# Baby Draw Golf Website

Single-page landing site for Baby Draw Golf — a 24/7 unmanned indoor golf simulator facility in Cypress, TX.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + custom SVG social icons
- **Hosting**: Vercel (static export, free tier)
- **Analytics**: Google Analytics 4 (optional)

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.local.example .env.local

# Run dev server
npm run dev

# Build for production
npm run build
```

## Configuration

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_TRACKMAN_BOOKING_URL` | Yes | Trackman booking portal URL for your venue |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED` | No | Google Maps embed URL (falls back to Cypress, TX area) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Contact email (defaults to info@babydrawgolf.net) |

Without `NEXT_PUBLIC_TRACKMAN_BOOKING_URL`, all Book Now buttons show "Coming Soon".

## Editable Data Files

Update these JSON files to change content without touching components:

- `src/data/site.json` — Business name, address, email, social links
- `src/data/pricing.json` — Pricing tiers, features, descriptions
- `src/data/faq.json` — FAQ questions and answers

## Deployment

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Add custom domain `babydrawgolf.net` in Vercel
5. Update Namecheap DNS: CNAME -> `cname.vercel-dns.com`

## SEO

Includes:
- Meta tags (title, description, OG, Twitter cards)
- JSON-LD structured data (SportsActivityLocation + FAQPage)
- Semantic HTML with proper heading hierarchy
- Static generation for maximum page speed

## Replacing Placeholder Images

The site uses Unsplash stock photos. Replace the image URLs in:
- `src/components/Hero.tsx` — Hero background
- `src/components/About.tsx` — About section image
- `src/components/Simulator.tsx` — Simulator showcase image
