# FotoDumky — FINAL STATUS

Production-hardening pass completed. Same concept, same architecture, same
design. Nothing was rebuilt; gaps were fixed.

## A. What was audited
Full placeholder/secret sweep of source and generated output; every internal
link in the built site; all three commercial modes in both the unconfigured
(shipping) state and a simulated fully-configured state; image pipeline output
(AVIF/WebP/JPEG, four widths, width/height attributes, lazy/eager loading);
SEO output (titles, descriptions, canonicals, OG tags, JSON-LD, sitemap,
robots); heading hierarchy and keyboard access; dependencies; build.

## B. What was fixed
1. **No fake contact address.** `contact_email` ships empty; every
   email-dependent action (original requests, commercial enquiries) is hidden
   until a real address is configured. Previously a `REPLACE-WITH…@example.com`
   mailto could reach visitors.
2. **No dead buttons, ever.** `mode: paid` with no shop URL now degrades to an
   email request; with no email either, no commercial UI renders. The footer
   coffee invitation and the crypto section render only when real links/labels
   exist.
3. **Crypto safety lock.** `network_label` ships empty and the crypto section
   is invisible until the owner verifies the network in WhiteBIT and fills it
   in. The site can no longer display an unverified-network warning to the
   public, nor an address without a network.
4. **robots.txt** is now generated from `site.json → url` (was hardcoded).
5. **404 page** added (`/404.html`, which Cloudflare Pages serves natively),
   excluded from sitemap.
6. **Headings/accessibility:** proper `h1` on every page (the Ukrainian
   thought is the `h1` on individual pages; a screen-reader-only `h1` on the
   home feed), skip-to-content link, existing focus states and reduced-motion
   support verified.
7. **Per-work price override** (`original.price` / `original.currency`) with
   the site-wide default in one place; non-USD currencies display correctly.
8. **First image** gets `fetchpriority="high"`; all images carry width/height
   (no layout shift); AVIF/WebP/JPEG srcsets verified in output.
9. **JSON-LD** now includes the image URL.
10. **Social links** are configuration-driven: empty = nothing rendered.
11. **Empty states:** zero published works shows a quiet line, unconfigured
    support page shows a human sentence, missing QR simply doesn't render.
12. **Dependency slimmed:** removed the fontsource package (fonts are
    committed in `src/assets/fonts/`); only Eleventy + Eleventy Image remain.

## C. What was intentionally preserved
Architecture (Eleventy 3, folder-per-work, `site.json`), the approved motto,
the vertical one-work flow, Literata, the Archive page (kept under that name —
restrained text list, no thumbnail grid), Ko-fi as the delivery mechanism for
originals, the three sample works with Oleksandr's Ukrainian lines on
clearly-marked placeholder images.

## D. Fully operational now
Build (`npm install && npm run build` verified), all 11 output routes, image
pipeline, SEO/OG/sitemap/robots, prev/next navigation, publish/unpublish,
per-work commercial modes, all conditional gating.

## E. Requires one-time owner action — see the launch list below.

## F. Optional (site works correctly without them)
Wise link · crypto (address is ready; appears when network is verified) ·
QR image · Instagram/TikTok links · analytics snippet · custom domain (the
`pages.dev` URL works meanwhile; update `site.json → url` when it changes) ·
per-work price overrides.

## G. Honest limitations
- **Mobile rendering** was verified by inspecting generated HTML/CSS
  (responsive images, fluid type, breakpoints) — this environment has no
  browser, so no on-device visual test was possible. The layout is a single
  fluid column with no fixed widths, which is the lowest-risk mobile pattern,
  but look at it on your phone before launch.
- **Ko-fi** was chosen from published documentation and comparisons; its shop
  checkout was not executed end-to-end from here (that requires your account).
  Sources conflict on the current shop fee (0% vs 5% on the free plan) —
  check it in your Ko-fi dashboard.
- **Analytics:** Cloudflare Web Analytics gives visits, top pages (= most
  viewed FotoDumky), referrers (= social traffic), and countries. It does
  **not** track clicks on the "Get the original" button. Actual sales are
  visible in Ko-fi's own dashboard; views-vs-sales per work is your
  conversion signal. Adding click tracking would require extra JavaScript and
  was deliberately not done.
- **Legal text** on /original/ is a plain-language summary, not
  jurisdiction-specific legal advice, and says so.

---

## OLEKSANDR MUST DO THESE THINGS BEFORE PUBLIC LAUNCH

**Required (5 things):**
1. Put the project on GitHub and connect Cloudflare Pages
   (build command `npm run build`, output `_site` — README §One-time setup).
2. Set your real email: `src/_data/site.json → contact_email`.
3. Replace the three placeholder works with real FotoDumky (Manual §1) —
   or set `published: false` on them.
4. Create a Ko-fi account; paste your page link into `support.kofi_url`;
   for each work you sell, create a $5 shop listing (upload the high-res file
   there — never into this repository) and paste its link into that work's
   `original.url`. Until then, works in `paid` mode offer an email request —
   also fine for launch.
5. Verify the crypto network in your WhiteBIT app and fill `network_label`
   (the crypto section stays hidden until you do — that's intentional).

**Recommended but not blocking:** analytics snippet, QR image, custom domain
(then update `site.json → url`), Wise link, social links.

**Not needed:** servers, databases, CMS, payment API keys, cookie banners,
developer skills.
