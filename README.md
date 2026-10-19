# Jiugypsum Nigeria Limited: website (Next.js)

Rebuild of the PHP site as a Next.js 16 (App Router, TypeScript) application. No PHP, no database.

## Run it

```bash
npm install
cp .env.example .env.local     # then fill in the SMTP values (see below)
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

Requires Node 20.9+.

## ⚠️ Do these first

1. **Rotate the old mailbox password.** `send-mail.php` in the old site had the SMTP password written in plain text. Treat it as exposed: change it on the mail server. The new code reads credentials only from environment variables and never ships them to the browser.
2. **Set the SMTP variables** in `.env.local` (and on your host). Until you do, both forms show an honest "temporarily unavailable, call or WhatsApp us" message and **never** a fake success. Quote requests and contact messages are delivered **by email only** (no database), so check the inbox you set as `MAIL_TO`.
3. **Hosting.** Next.js needs Node hosting (Vercel, a VPS, or cPanel with "Setup Node.js App"). Plain PHP shared hosting will not run it. Note some hosts cap request bodies at 4.5 MB (the quote form is built around that: photos are shrunk in the browser and capped at 4 MB total).

## Routes

| Route | Page |
|---|---|
| `/` | Home: hero, trust strip, featured projects, services, why choose us, how it works, FAQs, final CTA |
| `/services` | Six detailed service sections, FAQs, CTA |
| `/gallery` | Filterable gallery + keyboard/touch lightbox (`?category=` and `?project=` deep links) |
| `/about` | Company, vision, approach, selected work |
| `/contact` | Contact details + general enquiry form |
| `/get-a-quote` | Dedicated quotation page and form (`?service=` preselects a service) |
| `/privacy` | Rewritten for the new site (vendor/marketplace sections removed) |
| `POST /api/quote`, `POST /api/contact` | Form endpoints |
| `/sitemap.xml`, `/robots.txt` | Generated |

Main nav is exactly **Home · Services · Gallery · About Us · Contact Us**; **Get a Free Quote** is a separate button (outside `<nav>`) and every instance routes to `/get-a-quote`. FAQs sit at the bottom of Home and Services, never in the nav. On mobile there is a persistent quote bar.

Old URLs redirect (301): `/about.php`, `/services.php`, `/gallery.php`, `/privacy.php`, `/index.php`, and the old `jiugypsum.com.ng` domain → `jiugypsum.ng` (replaces the old `.htaccess` rule). Verification files for Google/Bing are preserved in `public/`.

## Where to edit things

| To change… | Edit |
|---|---|
| Phone, WhatsApp, email, address, hours, social links | `src/lib/site.ts` |
| Services text and images | `src/data/services.ts` |
| Gallery projects (add `.webp` to `public/images/projects/`) | `src/data/projects.ts` |
| FAQs | `src/data/faqs.ts` |
| How-it-works steps | `src/data/process.ts` |
| Testimonials (section hidden while empty) | `src/data/testimonials.ts` |
| Confirmed stats for the trust strip | `site.verifiedStats` in `src/lib/site.ts` |
| Colours, spacing, effects | `src/app/globals.css` (tokens at the top) |

## What I deliberately did NOT carry over (needs your confirmation)

- **"10+ years", "500+ projects", "500+ happy customers"** and **three named testimonials** (Mrs. Amina, Mr. Chukwu, Mrs. Fatima). I couldn't verify them, so they're gone. If they're true, add the numbers to `site.verifiedStats` and real, permitted quotes to `testimonials.ts`; they appear automatically.
- **"Train over 500 skilled professionals annually"** (old mission statement) and **"We complete projects on time"** (a delivery guarantee). Removed as unsubstantiated.
- **Team section** (Founder / Project Manager / Lead Installer): the photos (`team-1..3.jpg`) never existed in the old site and there were no names. Send real names/photos and a team section can be added.
- **Google Map embed:** the old one used placeholder coordinates (7.123456, 9.123456). Replaced with a "Get directions" link built from your address. Send a verified Google Maps embed link if you want a map.
- **Trustpilot widget:** dropped (extra third-party script). The Google review link is kept on the About page.
- **Kept from the old site (please re-confirm):** "Registered with CAC", opening hours (Mon–Sat 8–6), "tested and durable gypsum materials", and the safety wording.
- Service area is stated only as **Abuja**; the About page keeps your original "Abuja and beyond". No RC number is shown, so send it if you want it displayed.

## Images to verify

All gallery photos came from the old site. **Three images looked like 3D renders or stock rather than site photos** (`image-2.jpg` circular-niche sofa, `image-7/11.jpg` fireplace partition, `image-10.jpg` TV-wall living room):

- `image-2`, `image-7/11`: **not used.**
- `image-10`: used only on the Services page for *Custom TV Units*, with a visible **"Illustrative image"** label, because it was the only TV-wall picture available. Replace it with a real photo of your TV unit when you have one.

Please confirm everything in `src/data/projects.ts` is your own completed work. Not used: `image-4.jpg` (tilted, low quality), `image-15.jpg` (near-duplicate of 14), duplicates `image-8`/`image-11`. Project titles describe only what is visible; add `location` to each project once you want it shown. Photo of the arched seating shows a soft toy; swap if you'd prefer.

## Not migrated (not part of the new public site)

These lived in the old PHP and still exist in your original zip; nothing was deleted from it. They are **not** part of this project and will not run on Next.js:

- **JiuMarket / JiuStore / vendor login & registration** (`/jiumarket/`, `/store/`): hidden from the public site as requested. Needs its MySQL database; none was included in the zip.
- **Admin panel** (`/admin/`: login, users, gallery uploads, subscribers, email campaigns). Gallery is now managed through `projects.ts`.
- **Newsletter** (`subscribe.php`, `confirm.php`): was already broken in the zip (it required `adminpanel/includes/db.php`, which doesn't exist).
- **Visitor tracker** (IP lookup + China/Russia blocking). Not recreated.
- `/jiumarket/*` URLs will now 404 on this site. If you still want the marketplace online, host it separately (e.g., a subdomain).
- The footer keeps the "Website by USSADTECH Digital Solutions" credit from the old site; remove it in `src/components/Footer.tsx` if unwanted.

## Forms: how they work

**Quote** (`/get-a-quote`) and **Contact** (`/contact`) are different forms. Both validate in the browser *and* again on the server with the same rules (`src/lib/validation.ts`).

- Loading state, duplicate-submit guard, clear per-field errors, focus moves to the first error, entered data is kept on any failure.
- Success is shown **only** after the server has delivered the email. SMTP missing → 503, mail provider error → 502; both display an error plus WhatsApp/phone fallback.
- Quote photos: up to 5 (JPG/PNG/WebP/HEIC), ≤3 MB each, ≤4 MB total; shrunk in the browser first; the server checks type **and** real file signature. Photos are attached to the notification email, not stored.
- Spam: hidden honeypot field, minimum-time check, per-IP rate limit (5 per 10 min; in-memory, so per server instance. Add Cloudflare Turnstile or similar if you get abuse).
- Every quote gets a reference (e.g. `JQ-20261002-AB12`) shown to the customer and in the email subject. Replies go to the customer's email if they gave one.

Analytics (optional, off by default): set `NEXT_PUBLIC_GA_ID`. Events: `quote_cta_click`, `quote_form_start`, `quote_form_submit` (attempt), `quote_form_success` (server-confirmed), `contact_form_submit` (server-confirmed), `whatsapp_click`, `gallery_project_view`. No personal details are sent. Add a consent banner if your audience requires one.

## Design & motion

Teal/orange from the logo, Manrope + Inter, light frosted-glass header, deep-teal hero. Effects are CSS and three tiny client components, with **no animation or 3D library**: hero entrance, scroll reveals (visible without JS, skipped for reduced-motion), image reveals, staggered gallery tiles, subtle parallax on selected images (≥900px only), pointer tilt on the hero and featured projects (mouse devices only), glass panels on the hero, project captions and lightbox. Touch devices get none of the tilt/parallax. `prefers-reduced-motion` disables all of it and leaves content fully visible.

## What was tested (and what wasn't)

The sandbox this was built in has no access to the npm registry, so **`npm install`, `next build`, `next lint` and the real `tsc` were not run.** Instead I bundled the real components with esbuild (stubbing only `next/*`) and ran the real API route handlers (with a fake mail transport) in headless Chromium:

- All 7 pages + 404 at 360, 390, 768, 1024, 1440 and 1920 px: no console errors, no broken images, no horizontal overflow, one `<h1>` each.
- 54 checks: exact nav links, CTA outside nav, every quote CTA → `/get-a-quote`, no login/vendor/shop/cart/marketplace text anywhere, valid internal links, FAQ placement, mobile menu (open/Esc/navigate), gallery filter, lightbox (keyboard, touch swipe, focus return, deep links), reduced motion.
- 38 checks: form validation, SMTP-missing and mail-failure states, data preserved, double-click sends once, success + attachments + reference, header-injection safety, honeypot, too-fast, fake PNG, wrong MIME, oversize, too many files, rate limit.
- A type-check against shims (only noise remained, plus one real issue that I fixed).

**Please run `npm install && npm run typecheck && npm run lint && npm run build` before deploying** and send me any errors. Not tested at all: real SMTP delivery, `next/font` downloads, Next's image optimizer, Core Web Vitals (LCP/INP/CLS) and screen-reader behaviour. Images are pre-optimised WebP (≈560 KB for all of them), the hero image is `priority`, and the rest are lazy-loaded, but measure with Lighthouse on the live site.

## Deploy checklist

1. Set env vars (`SMTP_*`, `MAIL_FROM`, `MAIL_TO`, `NEXT_PUBLIC_SITE_URL`, optional `NEXT_PUBLIC_GA_ID`).
2. Send a test quote *and* a test contact message on the live site and confirm both arrive.
3. Re-submit `https://jiugypsum.ng/sitemap.xml` in Google Search Console / Bing.
4. Decide what to do with `/jiumarket/` (see above).
