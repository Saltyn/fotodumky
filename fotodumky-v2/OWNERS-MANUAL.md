# FotoDumky — Owner's Manual

You are not a web developer, and you never need to become one to run this site.
Everything you will ever routinely change lives in exactly two places:

1. **`src/content/fotodumky/`** — your FotoDumky (one folder per work).
2. **`src/_data/site.json`** — settings: prices, links, addresses, your email.

Everything else is machinery. You can ignore it.

Once the site is connected to Cloudflare Pages (see README, one-time setup),
**every change you save on GitHub automatically rebuilds and publishes the site
in about a minute.** You edit a file → the site updates. That's the whole loop.
You can do all of this from the GitHub website in a browser — no software needed.

---

## 1. How do I add a photograph (a new FotoDumka)?

1. On GitHub, open the folder `src/content/fotodumky/`.
2. Click **Add file → Create new file**. In the filename box type:
   `my-new-slug/index.md` (typing the `/` creates the folder).
   The slug becomes the web address: `/f/my-new-slug/`. Use short lowercase
   Latin words with hyphens, e.g. `quiet-harbor`.
3. Paste this template and fill it in:

   ```
   ---
   title: Quiet harbor
   slug: quiet-harbor
   date: 2026-08-02
   image: photo.jpg
   alt: "A small boat at dusk in an empty harbor."
   thought_ua: "Ваша думка українською."
   thought_en: "Your thought in English."
   secondary: ""
   location: ""
   series: ""
   published: true
   original:
     available: true
     mode: paid
     url: ""
     print_notes: ""
   ---
   ```

4. Commit (save).
5. Go into your new folder, **Add file → Upload files**, and upload your
   photograph named **`photo.jpg`** (a web export around 2000 px on the long
   side is ideal — NOT your original master; see §13).
6. Commit. Done — it appears at the top of the home page (newest date first).

**`alt`** is the description read aloud to blind visitors and read by Google.
Describe what's in the photo in one plain sentence. Always fill it in.

## 2. How do I add its thought?
`thought_ua` is the Ukrainian original — it is displayed first, as the authored
voice. `thought_en` is the English rendering — carry the idea, not the words.
`secondary` is an optional extra line; leave it `""` almost always.

## 3. How do I publish it?
`published: true`. Committing the file publishes it.

## 4. How do I remove a FotoDumka?
Open its folder on GitHub → open each file → the **⋯** menu → **Delete file**.
When the folder is empty it disappears. The page and its image vanish from the
site on the next automatic build.

## 5. How do I hide one without deleting it (unpublish / draft)?
Edit its `index.md` and set `published: false`. It keeps living in the folder
but has no page and appears nowhere. Set back to `true` to restore.

## 6. How do I replace the image?
Upload a new file named `photo.jpg` into the same folder (GitHub replaces the
old one). All the resized web versions are regenerated automatically.

## 7. How do I change the title / the Ukrainian / the English text?
Edit `index.md` in that FotoDumka's folder, change the field, commit.

## 8. How do I change the donation (crypto) address or network label?
Edit `src/_data/site.json` → the `support.crypto` block. **The crypto section
is invisible on the website until `network_label` is filled in.** This is a
deliberate safety lock: open your WhiteBIT app, look at the deposit screen for
that address, and copy the exact currency + network it shows (for example
"USDT on TRON (TRC-20)") into `network_label`. The moment you save it, the
crypto section appears on /support/. Never guess the network — money sent on
the wrong network is lost.

## 9. How do I change the QR code?
Upload your QR image to `src/assets/img/` (e.g. `donate-qr.png`), then set
`"qr_image": "/assets/img/donate-qr.png"` in `site.json`.

## 10. How do I see which FotoDumky are popular?
In your Cloudflare dashboard → **Web Analytics** → Pages. Every FotoDumka has
its own URL (`/f/slug/`), so the "top pages" list *is* your popularity ranking.
Use it to inform curation — not to replace your judgment.

## 11. How do I change the $5 price?
Two places, both without code:
- `src/_data/site.json` → `original.price` (what the website displays);
- your Ko-fi shop listings (what people actually pay).
Keep them matching. One work can also have its own price: add `price: "8"`
(and optionally `currency: "USD"`) inside that work's `original:` block, and
it overrides the default for that work only.

## 12. How do I make a FotoDumka VIEW ONLY / enable / disable the original?
In its `index.md`:
- View only: `available: false` and `mode: unavailable` — no purchase UI at all.
- Sold via Ko-fi: `available: true`, `mode: paid`, and put that item's Ko-fi
  shop listing link in `url`. (If `url` is empty but a general
  `original.kofi_shop_url` is set in `site.json`, that is used.)
- Manual email requests only: `available: true`, `mode: request`.

The site never shows a dead button. If a work is `paid` but no shop link
exists yet, it falls back to an email request — and if your `contact_email`
isn't set either, no purchase option appears at all until you configure one.
The same logic protects the coffee link: the footer invitation and the crypto
section only appear once real links/labels exist in `site.json`.

## 13. Where do my high-resolution originals live?
**Never in this repository and never on the website.** Keep masters on your
own drive + one backup. When you sell one, you upload that single file to its
Ko-fi shop listing; Ko-fi stores it privately and delivers it to the buyer
after payment. Nothing on the website ever links to the master file, so it
cannot leak through the page, the cache, or the HTML source.

## 14. How do I change the support links (Ko-fi, Wise)?
`src/_data/site.json` → `support.kofi_url` and `support.wise_url`. Empty `""`
hides the link. For Wise: in the Wise app choose Request → Anyone to get a
shareable payment link / Wisetag link, then paste it here. (Note: personal
payment requests expire after 30 days; your permanent Wisetag profile link is
the durable option.)

## 15. How do I deploy an update?
You don't, really. Committing on GitHub *is* deploying. Cloudflare Pages
rebuilds automatically. If a build fails, the previous version stays live —
you cannot take the site down by making a typo.

## 16. What should I never edit manually?
- Anything in `node_modules/` or `_site/` (generated; never committed anyway).
- `eleventy.config.js`, `package.json`, files in `src/_includes/`,
  `src/assets/css/` — these are the machinery. They only need touching if you
  deliberately want to change the design, and then ask an AI assistant or a
  developer, showing them this repo.
- In `index.md` files: keep the `---` lines and the exact field names; change
  only what's after the colons. Quotes around text with special characters
  (like `:` or `"`) keep things safe.

## 17. What happens if I make a mistake?
Two safety nets. (1) A broken commit fails the build and the live site keeps
showing the last good version. (2) GitHub keeps full history: open the file →
**History** → pick the previous version → restore. Nothing is ever truly lost.

---

## Before launch checklist (one-time)
- [ ] Replace the three PLACEHOLDER items with real FotoDumky (or unpublish them).
- [ ] Set your real email in `site.json` → `contact_email`. (Until you do,
      all email-based actions — original requests, commercial enquiries — are
      simply hidden from visitors rather than showing a broken link.)
- [ ] Verify the crypto network in WhiteBIT and fix `network_label` (§8).
- [ ] Upload your QR code (§9).
- [ ] Create a Ko-fi account; paste your page link into `support.kofi_url`;
      check Ko-fi's current shop fee in your dashboard.
- [ ] Set `site.json` → `url` to your final domain (also update `src/robots.txt`).
- [ ] Add the Cloudflare Web Analytics snippet into `analytics_snippet`
      (Cloudflare dashboard → Web Analytics → copy the one-line script).
- [ ] Optional: add Instagram/TikTok profile links in `social`.
