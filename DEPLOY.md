# Deploy Instructions

## Quick Deploy to Vercel

```bash
cd ~/.openclaw/workspace/artis-catalog/artis-catalog-frontend
export PATH="/usr/local/opt/node@24/bin:$PATH"
npx vercel --prod
```

## Configure DNS

**In cPanel:**
1. Go to DNS settings
2. Add CNAME record:
   - Name: `catalog`
   - Points to: `cname.vercel-dns.com`

**In Vercel Dashboard:**
1. Go to project settings → Domains
2. Add domain: `catalog.artislaminates.com`
3. Wait for verification

## Refresh Stock Data

To update with latest inventory:

```bash
cd ~/.openclaw/workspace/artis-catalog

# Fetch fresh data (takes ~15 min)
python3 enrich_with_stock.py

# Copy to frontend
cp unified_catalog_with_stock.json artis-catalog-frontend/src/data/catalog.json

# Rebuild and deploy
cd artis-catalog-frontend
npm run build
npx vercel --prod
```

## Preview Locally

```bash
cd ~/.openclaw/workspace/artis-catalog/artis-catalog-frontend
export PATH="/usr/local/opt/node@24/bin:$PATH"

# Development mode
npm run dev

# Production build + preview
npm run build
cd out && python3 -m http.server 3000
```

## Files

- **Built site:** `./out/` (329 static pages)
- **Source:** `./src/`
- **Data:** `./src/data/catalog.json` (324 products with stock)

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 + shadcn/ui
- Framer Motion + Recharts
- Static export (no server needed)

## Contact

Contact info in footer:
- Yamunanagar, Haryana, India
- +91 97290 37977
