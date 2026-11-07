# eyupdevart.com

The home of **Eyüp · DevArt**, developer + artist. Hand-written, zero-framework, bilingual (Türkçe / English), built to score 100 on everything Lighthouse can measure and to be the source that search engines and AI answer engines cite.

```
npm install
npm run build     # src/ → dist/
npm run preview   # http://localhost:4321  (brotli, real 404, real CSP — like production)
npm run dev       # rebuild on save + preview
npm run check     # links, fragments, JSON-LD graph, hreflang, sitemap, llms.txt
npm run audit     # Lighthouse, every page, mobile + desktop
```

## The numbers (local, Lighthouse 13, simulated throttling)

| Page | Mobile | Desktop |
| --- | --- | --- |
| `/` · `/en/` | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| `/rehber/aeo-geo/` · `/en/guide/aeo-geo/` | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |

Performance · Accessibility · Best Practices · SEO. Lighthouse 13's *agentic browsing* category is 100 too. Mobile: FCP / LCP 0.8 s, CLS 0, TBT 0–70 ms. Home page critical path: **~77 KB total** (HTML + inlined CSS + JS brotli + all three font families). The same 100s were measured on Cloudflare's edge (staging Worker).

**On eyupdevart.com today**, Cloudflare's *Bot Fight Mode* injects a "JavaScript Detections" script into every page. That script alone uses a deprecated browser API (Best Practices → 81) and runs a ~250 ms long task on throttled mobile (Performance → 94–97). Turning Bot Fight Mode off (Security → Bots) restores the 100s; see *Edge features* below.

## What's inside

**The Seam (hero).** One WebGL2 fragment shader renders a single living field twice. Left of the seam it's *code*: ASCII glyphs on a grid. Right of it it's *fire*: molten, lit, iridescent metal. The DevArt wordmark is embossed into both. Drag the seam and the word changes hands. It loads only after the page is idle, adapts its resolution to hold ~60 fps, pauses off-screen and in background tabs, renders a still frame for `prefers-reduced-motion`, and stays off entirely on software rasterisers (no GPU means no burning the visitor's CPU). In that case, and during the first ~300 ms on every device, a CSS wordmark (dot-matrix *Dev*, polished-metal *Art*, glowing seam) carries the hero by itself.

**Proof, not claims.** The "Kanıt / Proof" section measures *this* page on the visitor's own device with the browser's performance APIs (LCP, INP, CLS, FCP, TTFB, bytes, requests) and grades them against Google's Core Web Vitals thresholds, live.

**Developer touches.** ⌘K / Ctrl K / `/` opens a command palette (Turkish-aware search: "surec" finds "Süreç"). On phones the same palette is the menu. Magnetic CTAs, cursor-following spotlights, scroll-driven reveals, cross-document view transitions, speculative prerendering on hover, a sticky WhatsApp dock on mobile, a desktop QR that moves the chat to the phone, local time in Türkiye, and a hello in the console.

**Performance engineering.**
- Zero frameworks. ~3 KB of core JS (brotli); the shader is a separate 4 KB chunk loaded on idle.
- All CSS inlined: zero render-blocking requests.
- Fonts subset to Latin + Turkish (~54 KB for three families) and preloaded, with **metric-matched fallbacks** (`size-adjust`, `ascent-override`… computed from the real font files) so the font swap shifts nothing.
- `content-visibility: auto` skips rendering below-the-fold sections; `:root:has(:target)` turns it off the moment a fragment is targeted, so anchor jumps land pixel-exact.
- Every animation is CSS-only or compositor-only, and all of it is progressive: content is complete without JavaScript.

**SEO · AEO · GEO.**
- One connected JSON-LD `@graph` per page: `WebSite`, `Person` (Eyüp), `Organization` (DevArt) with an `OfferCatalog` of services, `ProfilePage` with `SpeakableSpecification`, an `ItemList` of portfolio sites (each with `creator` → Eyüp), `FAQPage`; the guide adds `TechArticle`, `BreadcrumbList`, `DefinedTermSet` and scholarly `citation`s.
- Answer-first content: the "Kısaca / In short" block answers *"Who is Eyüp DevArt?"* in its first sentence, plus a scannable fact sheet.
- `/llms.txt`, `/llms-full.txt`, and a Markdown twin of every page (`…/index.html.md`, advertised with `<link rel="alternate" type="text/markdown">`).
- `robots.txt` explicitly welcomes search and AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended…).
- Sitemap with `hreflang` alternates; reciprocal `hreflang` + `x-default` in every page head.
- A real, citable knowledge page, the **AEO & GEO guide** (TR + EN), which makes the site a *source* for the exact topic it sells.
- Social cards rendered from the real WebGL hero (`npm run assets:og`).

**Security.** Edge-aware CSP, HSTS, `nosniff`, `frame-ancestors 'none'`, a locked-down `Permissions-Policy`, all generated into `_headers` (Cloudflare / Netlify) and `.htaccess` (Apache / cPanel) at build time. Styles are always locked to a build-time hash. Scripts are locked to `'self'` + hashes, **unless** the Cloudflare zone injects JavaScript Detections: that script changes on every request, so no hash can match it and `script-src` falls back to `'unsafe-inline'` (external script origins stay locked). Toggle in `site.config.mjs → edge`.

## Editing

| What | Where |
| --- | --- |
| Phone, WhatsApp, domain, social profiles, dates | `src/site.config.mjs` |
| Every Turkish word | `src/content/tr.mjs` |
| Every English word | `src/content/en.mjs` |
| Portfolio projects | `work` in `src/site.config.mjs` + `work.items` in both content files |
| Design system | `src/styles/main.css` |
| Markup | `src/templates.mjs` |
| Behaviour / the shader | `src/js/app.js` · `src/js/seam.js` |

In copy, `*word*` renders in the artist's voice (Instrument Serif italic) and `` `word` `` in the developer's voice (Geist Mono).

**Before launch, please review:**
1. **`sameAs`** in `src/site.config.mjs`: add your GitHub / LinkedIn / Instagram / Behance URLs. This is how Google and LLMs tie "Eyüp DevArt" together across the web.
2. **Marchetti**: the site was unreachable while this was built, so its card uses a generative cover and a deliberately general description (`work.items.marchetti` in both content files). When it's back, set `shot: 'marchetti'` in the config and run `npm run assets:shots -- marchetti`.
3. **Claims**: services, languages (TR / EN) and the "remote, worldwide" line are written from what you told me. Adjust anything that isn't exactly right.
4. Bump `updated` in the config whenever content changes (feeds `<lastmod>` and `dateModified`).

## Assets (generated once, committed)

```
pip install fonttools brotli && npm run assets:fonts -- <dir-with-source-ttfs>  # subset + fallback metrics
npm run assets:icons                                                         # favicon.svg/.ico, PWA icons
npm run assets:shots -- [slug] # portfolio scroll-previews (needs Playwright + Chromium)
npm run build && npm run assets:og && npm run build                          # social cards from the live hero
```

## Deploy

Production runs on **Cloudflare Workers (static assets)** as the Worker `eyupdevart`, bound to `eyupdevart.com` and `www.eyupdevart.com` (`wrangler.jsonc`).

```
export CLOUDFLARE_API_TOKEN=…   CLOUDFLARE_ACCOUNT_ID=…
npm run deploy:staging          # build → checks → https://eyupdevart-staging.<account>.workers.dev
npm run deploy                  # build → checks → production
npx wrangler deployments list --name eyupdevart                  # history
npx wrangler rollback <version-id> --name eyupdevart -m "why"    # instant rollback
```

The build also emits `_redirects` (301 for slashless URLs) and `.assetsignore` (keeps `.htaccess` off the edge).

### Edge features (Cloudflare dashboard)

| Zone feature | Effect on this site | CSP flag (`site.config.mjs → edge`) |
| --- | --- | --- |
| Web Analytics | Cookieless page analytics; light (~50 ms script) | `cloudflareWebAnalytics` |
| Bot Fight Mode / JS Detections | Costs Best Practices (deprecated API) and ~200 ms mobile TBT; can challenge AI agents that fetch pages (bad for GEO) | `cloudflareJsDetections` |

If you turn a feature off in the dashboard, set its flag to `false` and redeploy: the CSP tightens back automatically.

### Other hosts

`dist/` is a plain static site:

- **Netlify / Cloudflare Pages**: build `npm run build`, output `dist`. `_headers` is picked up automatically (`netlify.toml` included).
- **Vercel**: same build and output; add the headers from `dist/_headers` in project settings if you want the CSP.
- **cPanel / Apache**: upload the *contents* of `dist/` (including the hidden `.htaccess`) to `public_html`.

After going live:
1. Submit `https://eyupdevart.com/sitemap.xml` in **Google Search Console** and **Bing Webmaster Tools** (Bing feeds ChatGPT search and Copilot).
2. Validate with the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).
3. Make your **Google Business Profile** and social profiles use exactly the same name, phone and URL as the site (entity consistency is a GEO signal).
4. Re-run PageSpeed Insights on the live URL.
5. Recommended zone tweaks: a Redirect Rule `www.eyupdevart.com/*` → `https://eyupdevart.com/$1` (301) so www stops serving duplicate pages, and SSL/TLS → Edge Certificates → Minimum TLS **1.2** (currently 1.0).

## License

Code: all rights reserved, Eyüp · DevArt. Fonts: Geist, Geist Mono (© Vercel) and Instrument Serif (© The Instrument Serif Project Authors) under the SIL Open Font License 1.1; see `src/assets/fonts/`.
