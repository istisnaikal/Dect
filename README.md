# eyupdevart.com

The home of **Eyüp · DevArt**, developer + artist. Hand-written, zero-framework, bilingual (Türkçe / English), built to score 100 on everything Lighthouse can measure and to be the source that search engines and AI answer engines cite.

```
npm install
npm run build     # src/ → dist/
npm run preview   # http://localhost:4321  (brotli, real 404, real CSP — like production)
npm run dev       # rebuild on save + preview
npm run check     # links, fragments, JSON-LD graph, speakable, hreflang, unique titles, crawl depth, OG cards, twins
npm run audit     # Lighthouse, every sitemap page, mobile + desktop (or: npm run audit -- /sozluk/)
npm run indexnow  # tell Bing / Copilot, Yandex, Naver… that the sitemap is fresh
```

Every push runs `build` + `check` on GitHub Actions (`.github/workflows/ci.yml`), so a broken link, a dangling `@id` or a one-sided `hreflang` never reaches production unnoticed.

## The numbers (local, Lighthouse 13, simulated throttling)

| Page | Mobile | Desktop |
| --- | --- | --- |
| `/` · `/en/` | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| `/rehber/aeo-geo/` · `/en/guide/aeo-geo/` | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| `/sozluk/` · `/en/glossary/` | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| `/hizmetler/` · `/en/services/` | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| 14 service pages (7 × TR / EN) | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |

Performance · Accessibility · Best Practices · SEO. Lighthouse 13's *agentic browsing* category is 100 too. Mobile: FCP / LCP 0.8–1.0 s, CLS 0, TBT 0–20 ms (a cold first run can read higher). Home page critical path: **~82 KB total** (HTML + inlined CSS + JS brotli + all three font families). The same 100s, all five categories, were measured on eyupdevart.com itself after the 2026-11-08 deploy.

**On eyupdevart.com**, Bot Fight Mode and its JavaScript Detections were switched off on 2026-11-08 (they cost Best Practices 81 and a ~250 ms mobile long task). With nothing injected at the edge but the cookieless analytics beacon, the CSP is hash-locked and enforces Trusted Types; see *Edge features* below.

## What's inside

**The emblem.** DevArt's *D*, split down its spine. The stem is built from cells on a grid (the developer: discrete, computed); the bowl is one continuous superelliptic curve, heavier where a pen would press (the artist); between them runs a night-blue needle with an eye (the tailor who joins the halves, and, upright, a developer's caret). It is constructed, not drawn: a 32-unit square with cap line 4, baseline 28 and spine 16; 2 × 8 cells of 2.6 spread exactly between the lines; equal 0.6 gaps either side of a 1.5 needle; an outer superellipse of exponent 2.4 with 0.25 of overshoot (round forms must pass flat ones to look the same height) and a counter of 2.2, giving strokes of 6.4 at the side and 3.6 at the top and bottom. Two optical sizes: the cell stem wherever there are pixels for it, a solid stem for favicons and 1× screens (chosen by CSS on `resolution`), so it never blurs to grey. The SVG box hugs the letter, so its edge sits exactly on the page gutter. On hover the needle takes one stitch and the cells re-scan top to bottom; reduced motion keeps it still. One generator (`logoMark` in `src/templates.mjs`) feeds the header, footer, 404, favicons, PWA icons and social cards.

**The Seam (hero).** One WebGL2 fragment shader renders a single living field twice. Left of the seam it's *code*: ASCII glyphs on a grid. Right of it it's *art*: liquid mother-of-pearl in morning light. The wordmark is set into both, as night-blue LED blocks in the code and ink lacquer in the pearl. Drag the seam and the word changes hands. It loads only after the page is idle, adapts its resolution to hold ~60 fps, pauses off-screen and in background tabs, renders a still frame for `prefers-reduced-motion`, and stays off entirely on software rasterisers (no GPU means no burning the visitor's CPU). In that case, and during the first ~300 ms on every device, a CSS wordmark (dot-matrix *Dev*, steel-lacquer *Art*, night-blue seam) carries the hero by itself. The opening never stutters: the canvas is transparent rather than opaque (an empty buffer shows paper, never black), resolution changes happen before a frame is drawn rather than after, and the resize observer only re-allocates on a real change of size and redraws in the same task. A screencast harness that records every composited frame of the first seconds, with a resize mid-load, finds zero dark frames.

**Morning light, night blue.** Paper (`#f6f4ef`), ink, and one accent in three strengths over a faint dot grid like a tailor's pattern paper: `--night` (`#14204a`) fills the primary action and the selection, with paper text on it at 12.9:1; `--night-text` (`#2a4590`, ≥ 7:1) carries accent words; `--night-line` (`#3557b8`) is reserved for hairlines that must still read as blue at a pixel or two (the thread, the needle, underlines). The shader, the CSS wordmark, the emblem, the icons (a night tile with a moonlight needle) and the social cards all draw from the same three. Around them the night keeps its range instead of one flat tone: indigo (`#2c2f78`) in the distance (far glows, the top of the thread), slate (`#3c4a68`) at the edges (hairlines and shadows carry a little of the sky instead of grey), and a faint violet warmth (`#8a76c4`) where the light hesitates (under the hand on a card, low in the closing boxes, at the end of the thread where it reaches WhatsApp). Primary fills have depth (indigo light from above, night below, a moonlit top edge). Words never use these washes, so contrast never moves. Verified with axe-core on fully revealed pages: zero contrast issues.

**The invitation.** The last card in the work rail is the next project, and it is built like the others: the same browser frame, but empty. Its address bar holds only a cursor; inside, a small night (indigo in the distance, slate rising from the edge, a horizon line) and a violet light that breathes on an eight-second cycle. When the hand comes, the breath holds and the light turns toward it, eased by `@property` so it drifts rather than jumps, and the cursor steadies as if listening. Below: the title, two sentences, the button, and one line that takes the weight off ("a message commits you to nothing"). Reduced motion keeps the sky still.

**The horizon.** The band of services under the hero is not a strip: no border, soft at both ends, slate at half strength. It drifts slower than anyone reads (150 s a loop) and shifts with the scroll through a `view()` timeline (it is `overflow: clip`, not `hidden`, because `hidden` would make it its own scroll container and freeze that timeline), so it keeps time with the reader instead of asking for attention. It pauses under the hand and stands still for reduced motion.

**The message follows the reader.** While the work, the services or the live measurements cross the middle of the screen, the always-present WhatsApp buttons (header and dock) carry the first line that fits: "here it is in two sentences" for the work and the services, "could you look at my site's speed?" over the measurements; elsewhere, the plain greeting. The visitor still writes the rest. On phones the dock sits a breath higher, 20px above the safe area.

**The thread.** A tailor's stitch drawn down the left margin as you read: a faint dotted route shows where it will go, the night-blue thread follows the reading position, passing each section marker, and ends tied to the WhatsApp button, which answers with a single pulse. Built from section boxes only (never forcing layout inside `content-visibility`-skipped sections), and the knot's path is sampled from the curves' own arithmetic rather than by asking the SVG for a thousand points (`getPointAtLength` cost ~110 ms of main thread on every build of the path; the arithmetic costs under one). Static for reduced motion, absent without JS. Two quiet invitations sit where the thought naturally occurs: after the measured numbers, and at the end of the FAQ.

**The signature.** The page signs itself. As the footer comes into view, a pen writes *DevArt* stroke by stroke, left to right, and lifts the moment the word is fully seen: nine contours, each on its own slice of a scroll-driven `view-timeline` (no JavaScript). The strokes are real type, Geist Mono *Dev* and Instrument Serif *Art*, converted to 2 KB of SVG by `scripts/signature.py`. Reduced motion shows it already signed. View the source and there's a note at the very top for whoever reads it.

**The calm path.** Nothing on the way to WhatsApp shouts. Every decision point (contact, every page's closing box) ends with *what happens next* in three plain steps, because uncertainty, not price, is what makes people hesitate. Beside the Türkiye clock, one honest line says whether it's working hours there; no countdowns, no invented scarcity, no promises of speed. A tapped WhatsApp button answers "opening…" at the same width (the app switch takes a moment on phones; a silent button feels broken), and "copy number" copies the number. Every prefilled message is written for the page it starts from. On phones the path lives in the dock: a glass capsule (translucent paper, 24px blur, a hairline of light along its top edge, a night-blue shadow), a night pill whose icon sits in its own small lamp and whose second line takes the effort away ("the first line is written"), and a weightless call button behind a hairline. It rises in with a slight scale, and once per page a single sheen crosses the pill as it arrives; reduced motion simply fades it in.

**Grace.** Motion that persuades without pressure, and only where it means something. The hero exhales into place (transform-only, so LCP and CLS never notice), section titles rise from behind a line as you reach them, content settles a short distance into place rather than sliding in, and portfolio cards lift a few pixels under the hand. A service row ignites under the hand: a night-blue hairline is drawn from its number, light falls from it onto the paper, the number takes the light; on leaving it dims in place like a lamp instead of retracting. In the process, each step's node lights as the drawn line reaches it (indigo at the start, violet at the end, matching the line), so the path itself says where you are. The measurements live in a lit room without hard walls: the paper and its dots give way to it over a long fade instead of stopping at an edge. Every quiet change of colour or opacity moves on the same curve; nothing uses the browser's default easing. Next to the WhatsApp button, one sentence takes the weight off the decision: *a message commits you to nothing.*

**The front door.** Every button shares one physics. Press answers within a tenth of a second (scale 0.965); release comes back on a small spring (`--ease-spring`). Light gathers inside under the hand, or under the finger where it lands: a radial layer that fades in, because gradients cannot transition and light can, so nothing ever jumps. The contents lean a third further toward the hand than the button does, which gives it depth, and the WhatsApp glyph nods. The hero's call to action breathes: its first breath comes the moment the hero has settled (1.6 s), then a faint violet halo exhales every few seconds while it waits and holds its breath while the hand is on it (transform and opacity only; still for reduced motion); the same halo is the single breath when the reading thread reaches the contact button (previously clipped by `overflow: hidden`, so it never showed). The quieter surfaces belong to the same family: a glass ghost button whose arrow leans toward where it leads, header controls that give under the finger, FAQ toggles that lean in, a copy button that turns into a check, a loading chip whose dot pings once when the measurement lands, a focus ring that settles into place, and a marquee that pauses under the hand. An empty `touchstart` listener lets iOS show any of it at all.

**Proof, not claims.** The "Kanıt / Proof" section measures *this* page on the visitor's own device with the browser's performance APIs (LCP, INP, CLS, FCP, TTFB, bytes, requests) and grades them against Google's Core Web Vitals thresholds, live.

**Developer touches.** ⌘K / Ctrl K / `/` opens a command palette with ranked, Turkish-aware search: a label that starts with your query beats a word inside a label, which beats a keyword; exact spelling beats accent-folded spelling ("hız" finds speed before "hizmetler", "surec" still finds "Süreç"), and "UI" matches the English acronym despite Turkish casing. On phones the same palette is the menu. Magnetic CTAs, cursor-following spotlights, scroll-driven reveals, cross-document view transitions, speculative prerendering on hover, a sticky WhatsApp dock on mobile, a desktop QR that moves the chat to the phone, local time in Türkiye, and a hello in the console.

**Performance engineering.**
- Zero frameworks. ~4.5 KB of core JS (brotli); the shader is a separate ~4.7 KB chunk loaded on idle, on the home pages only. The front-end service page quotes the total, and the build measures it: the number in the copy is never typed by hand.
- All CSS inlined: zero render-blocking requests. And each page carries only the CSS that can ever apply to it: `scripts/purge-css.mjs` (no dependency) keeps a rule only if every class it requires exists in that page's HTML or can be added by the site's own scripts, keeps anything it cannot judge (`:is`, `:where`, `:has`), and drops keyframes nothing animates with. A service page went from 64 KB of CSS to 35 KB (23.2 → 18.0 KB compressed), the 404 to 15 KB. Proven safe, not assumed: every page at desktop and phone width, plus the open palette and the dock, is captured with the full stylesheet and with the purged one, and the 54 captures are pixel-identical. `NO_PURGE=1 npm run build` builds the full version.
- A flat dependency tree: on the home pages the lazily-imported shader is announced with `modulepreload` (in the HTML and in the `Link` header, so it can travel in the 103 Early Hints too), so nothing waits on `app.js` to discover it.
- Fonts subset to Latin + Turkish (~54 KB for three families) and preloaded, with **metric-matched fallbacks** (`size-adjust`, `ascent-override`… computed from the real font files) so the font swap shifts nothing.
- `content-visibility: auto` skips rendering below-the-fold sections; `:root:has(:target)` turns it off the moment a fragment is targeted, so anchor jumps land pixel-exact.
- Every animation is CSS-only or compositor-only, and all of it is progressive: content is complete without JavaScript.
- **A page at rest does no work.** The endless loops (the horizon, the invitation's light, the live dot, the front door's breath) pause while out of sight. Far off-screen, the horizon's drift alone had kept the main thread painting 60 frames a second (≈ 17 % of a core, measured with a Chrome trace); now an idle page paints zero frames at every scroll depth, on every page. Desktop main-thread work for the home page fell from 0.5 s to 0.3 s, script evaluation from 151 ms to under 40 ms.
- **No dead code.** A whole-site pass (every page's classes plus every class the scripts can add) finds no CSS selector that can never match and no unreferenced function; the three leftovers it once found are gone.
- Font preloads are sent twice: as `<link rel=preload>` in the HTML and as an HTTP `Link` header on every page, so the fonts start from the response headers, and Cloudflare replays them as **103 Early Hints** before the page itself (verified on eyupdevart.com).

**SEO · AEO · GEO.**
- One connected JSON-LD `@graph` per page: `WebSite`, `Person` (Eyüp), `Organization` (DevArt) with an `OfferCatalog` of services, `ProfilePage` with `SpeakableSpecification`, an `ItemList` of portfolio sites (each with `creator` → Eyüp), `FAQPage`; the guide adds `TechArticle`, `BreadcrumbList`, `DefinedTermSet` and scholarly `citation`s.
- Answer-first content: the "Kısaca / In short" block answers *"Who is Eyüp DevArt?"* in its first sentence, plus a scannable fact sheet.
- `/llms.txt`, `/llms-full.txt`, and a Markdown twin of every page (`…/index.html.md`, advertised with `<link rel="alternate" type="text/markdown">`).
- `robots.txt` explicitly welcomes search and AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended…).
- Sitemap with `hreflang` alternates; reciprocal `hreflang` + `x-default` in every page head.
- A real, citable knowledge page, the **AEO & GEO guide** (TR + EN), which makes the site a *source* for the exact topic it sells.
- **Services** (`/hizmetler/` · `/en/services/`): a hub and one page per real search intent, never one page per keyword. Website design & development, UI/UX design, front-end, full-stack & back-end, SEO (with local SEO), AEO & GEO, and speed optimization, in both languages. Each opens with a self-contained answer (`#answer`, speakable), then an at-a-glance fact sheet, what's included, how the work runs, an FAQ, related services and glossary terms, and a WhatsApp message pre-written for that service. Each is a `Service` (provider → DevArt, `areaServed`, `audience`, a `ServiceChannel` to WhatsApp, `isRelatedTo` its neighbours) inside a `WebPage` whose `about` names the concept on Wikidata and the matching glossary terms. The guide (informational intent) and the AEO & GEO service page (commercial intent) link to each other instead of competing.
- **No doorway pages.** "Every city, every district" is served honestly: `areaServed` is Türkiye (pinned to Wikidata Q43) and worldwide, the copy says remote-from-anywhere, and the SEO page explains why mass-produced city pages are a named Google spam policy. Local-pack ranking comes from a Google Business Profile, which no page can replace.
- **The glossary** (`/sozluk/` · `/en/glossary/`): 22 terms of being found (SEO, AEO, GEO, RAG, E-E-A-T, JSON-LD, llms.txt, IndexNow, Core Web Vitals…), each opening with a one-sentence definition built to be quoted. It's a `DefinedTermSet` of `DefinedTerm`s, every term addressable by the same anchor in both languages (`#lcp`, `#geo`), and the guide's `about` points at these terms, so the two pages reinforce each other as one knowledge graph.
- **Entity clarity.** `Person` with `hasOccupation` (O*NET 15-1254.00, Web Developers; Wikidata Q6859454) and a contact point. Every `knowsAbout` concept is a `Thing` pinned to its Wikidata item (SEO Q180711, AEO Q97171941, GEO Q134083964, Core Web Vitals Q104618838…), looked up on wikidata.org rather than recalled, so "GEO" can never be read as geography; translations declared both ways with `workTranslation` / `translationOfWork`; social cards carry `creditText` and `copyrightNotice`.
- **Internal linking with intent.** Knowledge points at practice: every glossary term links the service that puts it to work ("In practice: Website speed optimization"), the guide's checklist and Core Web Vitals sections link SEO, speed and AEO & GEO in context, the home page's fact sheet and FAQ link the services by name, and the footer carries every service on every page.
- **Crawl architecture.** Home → services hub → service, and home → every service directly; every page links to its twin in the other language (header, footer, palette, contextual links). `npm run check` walks the built links from `/` and fails on any orphan, any page deeper than two clicks, or any page missing from the sitemap. The sitemap carries `hreflang` alternates *and* `image:image` entries, and `robots.txt` adds Cloudflare's `Content-Signal` (`search=yes, ai-input=yes, ai-train=yes`: a portfolio *wants* to be known by models). On deploy, every URL is pushed to **IndexNow** (key file served at `/<key>.txt`).
- Social cards rendered from the real WebGL hero (`npm run assets:og`).

**Accessibility beyond the checklist.** `prefers-contrast: more` deepens text and lines; `forced-colors: active` (Windows high contrast) gets system colours, visible button edges and `Highlight` focus rings, and the decorative layers step aside.

**Semantic HTML.** One `<h1>` per page, no skipped heading levels (enforced by `npm run check`), landmarks, `aria-current` on the breadcrumb and the current nav item, `<address>` for contact, `<dl>` for definitions and fact sheets, and `<time>` for dates.

**Security.** Edge-aware CSP, HSTS, `nosniff`, `frame-ancestors 'none'`, a locked-down `Permissions-Policy`, all generated into `_headers` (Cloudflare / Netlify) and `.htaccess` (Apache / cPanel) at build time, plus `/.well-known/security.txt` (RFC 9116) whose `Expires` renews with every build. Styles are locked to a build-time hash; scripts to `'self'`, build-time hashes and the analytics origin. **Trusted Types are enforced** (`require-trusted-types-for 'script'; trusted-types 'none'`): DOM XSS sinks such as `innerHTML` refuse plain strings and no policy may be created, which the site's own code never needs. The Cloudflare analytics beacon was tested under this exact policy with zero violations. If the zone ever injects JavaScript Detections again, set `site.config.mjs → edge.cloudflareJsDetections` and the build relaxes `script-src` to `'unsafe-inline'` and drops Trusted Types (that script changes on every request, so no hash can match it).

## Editing

| What | Where |
| --- | --- |
| Phone, WhatsApp, domain, social profiles, dates | `src/site.config.mjs` |
| Every Turkish word | `src/content/tr.mjs` |
| Every English word | `src/content/en.mjs` |
| Glossary terms (TR + EN) | `src/content/glossary.mjs` |
| Services: pages, FAQs, WhatsApp texts (TR + EN) | `src/content/services.mjs` |
| Portfolio projects | `work` in `src/site.config.mjs` + `work.items` in both content files |
| Design system | `src/styles/main.css` |
| Markup | `src/templates.mjs` |
| Behaviour / the shader | `src/js/app.js` · `src/js/seam.js` |

In copy, `*word*` renders in the artist's voice (Instrument Serif italic) and `` `word` `` in the developer's voice (Geist Mono).

**Before launch, please review:**
1. **`sameAs`** in `src/site.config.mjs`: add your GitHub / LinkedIn / Instagram / Behance URLs. This is how Google and LLMs tie "Eyüp DevArt" together across the web.
2. **Marchetti**: the site was unreachable while this was built, so its card uses a generative cover and a deliberately general description (`work.items.marchetti` in both content files). When it's back, set `shot: 'marchetti'` in the config and run `npm run assets:shots -- marchetti`.
3. **Claims**: services, languages (TR / EN) and the "remote, worldwide" line are written from what you told me. Adjust anything that isn't exactly right. On the service pages, check in particular the stacks (TypeScript · Node.js · Next.js · Edge), the back-end scope (APIs, databases, authentication, admin panels, integrations), working inside agencies' codebases, design-only hand-offs, and speeding up WordPress sites.
4. Bump `updated` in the config whenever content changes (feeds `<lastmod>` and `dateModified`).

## Assets (generated once, committed)

```
pip install fonttools brotli && npm run assets:fonts -- <dir-with-source-ttfs>  # subset + fallback metrics
npm run assets:icons                                                         # favicon.svg/.ico, PWA icons
npm run assets:shots -- [slug] # portfolio scroll-previews (needs Playwright + Chromium)
npm run build && npm run assets:og && npm run build                          # social cards from the live hero
npm run assets:signature                                                     # the footer signature path (fontTools)
```

## Deploy

Production runs on **Cloudflare Workers (static assets)** as the Worker `eyupdevart`, bound to `eyupdevart.com` and `www.eyupdevart.com` (`wrangler.jsonc`).

```
export CLOUDFLARE_API_TOKEN=…   CLOUDFLARE_ACCOUNT_ID=…
npm run deploy:staging          # build → checks → https://eyupdevart-staging.<account>.workers.dev
npm run deploy                  # build → checks → production → IndexNow ping
npx wrangler deployments list --name eyupdevart                  # history
npx wrangler rollback <version-id> --name eyupdevart -m "why"    # instant rollback
```

The build also emits `_redirects` (301 for slashless URLs) and `.assetsignore` (keeps `.htaccess` off the edge).

**From GitHub (no local token).** *Actions → deploy → Run workflow*, with the commit, branch or tag to ship. One build, the same bytes to staging, a smoke test (`.github/smoke.sh`: the edge serves this exact build, every sitemap URL answers 200, a missing page 404, security headers present), then production, the same smoke test, and the IndexNow ping. It needs one repository secret, `CLOUDFLARE_API_TOKEN`; the account is resolved from the token. This is also the way to deploy from a cloud development session: wrangler uploads assets with a short-lived ticket in the `Authorization` header, and a credential-injecting proxy overwrites that header, so the upload is refused there.

### Edge features (Cloudflare dashboard)

| Zone feature | Effect on this site | CSP flag (`site.config.mjs → edge`) |
| --- | --- | --- |
| Web Analytics | Cookieless page analytics, but the site's only third-party script: 10 KB with legacy polyfills and a 1-day cache, and a branch in the dependency tree. Switch it off in the dashboard (Web Analytics → the site → disable), then set the flag to `false`; edge analytics remain. (`Cache-Control: no-transform` would also stop the injection, but it stops the edge compressing HTML: 131 KB instead of 25 KB.) | `cloudflareWebAnalytics` |
| Bot Fight Mode / JS Detections | **Off since 2026-11-08.** Cost Best Practices (deprecated API) and ~200 ms mobile TBT; can challenge AI agents that fetch pages (bad for GEO) | `cloudflareJsDetections` |

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
5. Zone: `www` → apex is a permanent **301** (Single Redirect, path and query preserved; live since 2026-11-08). Still to do in the dashboard: SSL/TLS → Edge Certificates → Minimum TLS **1.2** (currently 1.0, which caps an SSL Labs grade at B).

## License

Code: all rights reserved, Eyüp · DevArt. Fonts: Geist, Geist Mono (© Vercel) and Instrument Serif (© The Instrument Serif Project Authors) under the SIL Open Font License 1.1; see `src/assets/fonts/`.
