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

## Deploy
Works on any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages.
For GitHub Pages: push to the repo and enable Pages on the branch root.

---
© NextGen FinTech · Margao, South Goa · +91 91120 13981
