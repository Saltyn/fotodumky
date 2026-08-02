# FotoDumky

**One frame. One thought. / Один кадр. Одна думка.**

FotoDumky is a collection of thoughts expressed through photography. This
repository is the entire website: a static site with no database, no server,
no accounts, and no code the owner needs to touch for day-to-day publishing.

Daily use is covered in **OWNERS-MANUAL.md**. This file covers what the site
is made of and the one-time setup.

## What's inside

```
src/
  content/fotodumky/        ← one folder per FotoDumka (index.md + photo.jpg)
  _data/site.json           ← all settings: motto, price, links, crypto, email
  _includes/                ← page templates (base.njk, dumka.njk)
  assets/css/style.css      ← the design
  assets/fonts/             ← Literata (Latin + Cyrillic), self-hosted
  index.njk                 ← home: the vertical feed
  archive.njk / about.njk / support.njk / original.njk
  sitemap.njk / robots.txt
eleventy.config.js          ← build + responsive image pipeline
```

Build tool: [Eleventy](https://www.11ty.dev/) v3. At build time every
photograph is converted into AVIF + WebP + JPEG at four widths with lazy
loading — you upload one `photo.jpg`, the machinery does the rest.

## Design decisions (so future-you knows why)

- **No grid gallery.** One work per screenful, vertical scroll: the thought
  must be readable at the moment of looking, and thumbnails destroy that.
  A text-only Archive page provides wayfinding.
- **Ukrainian first, English as its echo.** The bilingualism is the identity,
  so it lives inside each work rather than behind a language switcher.
- **Two separated commercial intents.** "Get the original — $5" appears only
  on individual pages, after the work, below a hairline. "Buy the photographer
  a coffee" lives in the footer and on /support/. They never share a button.
- **Originals never touch the site.** Payment + secure file delivery are
  delegated to Ko-fi shop listings (or a plain email request). No signed URLs
  to maintain, nothing to leak.
- **No tags/categories at launch.** The `series` field exists in the content
  model, dormant, for when the collection is big enough to need it.

## One-time setup (about 30 minutes, all free)

1. **GitHub.** Create a repository (e.g. `fotodumky`) and upload this project
   (everything except `node_modules/` and `_site/` — see `.gitignore`).
2. **Cloudflare Pages.** dash.cloudflare.com → Workers & Pages → Create →
   Pages → Connect to Git → pick the repo. Build settings:
   - Build command: `npm run build`
   - Build output directory: `_site`
   Deploy. You get `https://<name>.pages.dev` immediately, on Cloudflare's
   free tier (unlimited bandwidth for static assets).
3. **Analytics.** Cloudflare dashboard → Web Analytics → add site → copy the
   snippet into `site.json` → `analytics_snippet`. Cookieless, no banner needed.
4. **Ko-fi.** Create an account at ko-fi.com. Your page link goes into
   `site.json` → `support.kofi_url`. For each work you want to sell, create a
   Shop listing (digital download, $5, upload the high-res file there) and put
   the listing link into that work's `original.url`.
5. **Domain.** I cannot check or buy domains from this environment, so:
   candidates in order of brand strength — `fotodumky.com`, `fotodumky.art`
   (`.art` is genuinely fitting here), `fotodumky.photo`. Check availability
   at any registrar (e.g. Cloudflare Registrar, porkbun.com). Buying it via
   **Cloudflare Registrar** is the least-friction path since the site already
   lives there: after purchase, Pages → Custom domains → add it. Then update
   `site.json` → `url` and `src/robots.txt`.
6. **Verify the crypto network** (see manual §8) before the support page goes
   public with a network label.

## Running locally (optional)

```
npm install
npm run dev      # local preview at http://localhost:8080
npm run build    # produces _site/
```

## What was deliberately NOT built

- No shopping cart, checkout, or license PDF generator — Ko-fi covers it,
  and a $5 experiment doesn't justify owning payment infrastructure.
- No CMS admin panel — GitHub's web editor is the admin panel, and it comes
  with free version history.
- No cookie banner — because there are no cookies.
- No newsletter, popups, or share buttons. The URL is the share button.
