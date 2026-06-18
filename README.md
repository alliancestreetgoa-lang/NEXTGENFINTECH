# NextGen FinTech — Website

Marketing website for **NextGen FinTech**, a financial & business advisory firm based in Margao, South Goa, led by **Aniruddha Roy** (CA, ICWA, CS, CFA).

## Stack
Pure static site — HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

- `index.html` — page markup & content
- `styles.css` — styling, layout, responsive rules
- `script.js` — mobile nav, scroll reveal, footer year

## Sections
- Hero with call-to-action
- Services (the 8 offerings: accounting, tax/GST, MSME/FSSAI, corporate/legal compliances, business analysis, growth consulting, strategic management, corporate banking & funding)
- About / Founder profile
- Why Us
- Contact form + details

## Run locally
Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Contact form
The contact form posts to [FormSubmit](https://formsubmit.co) targeting `nextgenfintech2@gmail.com`.
On first submission FormSubmit sends a one-time confirmation email to activate the endpoint.
Swap the form `action` if you prefer a different backend.

## Production features
- **SEO** — descriptive title/meta, canonical URL, `robots.txt`, `sitemap.xml`, and JSON-LD `AccountingService` structured data.
- **Social sharing** — Open Graph + Twitter Card tags with a generated 1200×630 share image (`assets/og-image.png`).
- **PWA / icons** — `site.webmanifest`, SVG favicon, 32px favicon, 180px Apple touch icon, 192/512px maskable icons.
- **Security headers** — `_headers` sets CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` (applied automatically on Netlify/Cloudflare Pages).
- **Caching** — long-lived immutable caching for assets, revalidation for HTML.
- **Accessibility** — skip-to-content link, visible focus rings, semantic landmarks, alt text.
- **Anti-spam** — honeypot field on the contact form.
- **Custom 404** — branded `404.html`.

## Logo assets
- `logo-mark.svg` — the "N" monogram (header, footer, favicon)
- `logo.svg` — full lockup with the "NextGen FinTech" wordmark
- `assets/icon.svg` — padded icon source; PNGs rendered from it
- `assets/og-image.svg` / `.png` — social share card

To re-generate the PNGs after editing the SVGs:
```bash
pip install cairosvg
python3 - <<'PY'
import cairosvg
cairosvg.svg2png(url='assets/og-image.svg', write_to='assets/og-image.png', output_width=1200, output_height=630)
for s in (32,180,192,512):
    cairosvg.svg2png(url='assets/icon.svg', write_to=f'assets/icon-{s}.png', output_width=s, output_height=s)
PY
```

## Before going live
Replace the placeholder domain **`https://nextgenfintech.in`** with your real domain in:
`index.html` (canonical, og:url, og:image, twitter:image, JSON-LD), `robots.txt`, and `sitemap.xml`.

## Deploy
Works on any static host — no build step.
- **Netlify / Cloudflare Pages** — drag-and-drop or connect the repo; `netlify.toml` + `_headers` are picked up automatically.
- **GitHub Pages** — enable Pages on the branch root (`.nojekyll` is included so all files are served as-is).
- **Vercel** — import the repo; framework preset "Other".

---
© NextGen FinTech · Margao, South Goa · +91 91120 13981
