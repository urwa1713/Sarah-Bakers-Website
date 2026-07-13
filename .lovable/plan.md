# Home Baker Islamabad — Build Plan

A boutique-patisserie feel with real 3D depth (CSS 3D + Framer Motion), not a bakery template. Cream / dusty rose / chocolate / gold palette, Cormorant + Inter typography.

Note on your uploads: you gave 10 real cake photos. I'll use them directly in the Gallery and Menu cards instead of `[REPLACE]` placeholders — much stronger first impression. If you'd rather keep placeholders, tell me before I build.

## Sections
1. **Hero** — CSS-3D layered cake (3 tiers + candle + drifting sprinkles/macarons), slow rotation, mouse-parallax particles, tagline, WhatsApp + Instagram CTAs. Cake tiers assemble on load / scroll.
2. **About** — short warm story, "Made with pyaar", Islamabad & Rawalpindi only.
3. **Menu / Categories** — 5 tilt-on-hover 3D cards (Birthday, Anniversary, Cupcakes, Themed Kids', Custom) with gold rim-light on hover, backed by your uploaded photos.
4. **Gallery** — masonry grid of your 10 uploaded photos, 3D lift on hover.
5. **How to Order** — 3 steps with perspective-tilted step cards; explicit half-advance / half-refund-on-cancellation and 2-day minimum notice.
6. **Loved by our customers** — premium 3D Instagram card with gold border glow, single CTA to @sarahh_bakers.
7. **Footer / Contact** — @sarahh_bakers, 0317-5285494, service-area note, WhatsApp + Instagram icons.

## Design system (src/styles.css)
- Tokens (oklch): `--cream`, `--rose`, `--chocolate`, `--gold`, plus gradient + gold-shadow tokens. Background cream, foreground chocolate, primary chocolate, accent gold.
- Fonts via `<link>` in `__root.tsx` head: Cormorant Garamond (headings) + Inter (body).
- Custom utilities: `.tilt-card`, `.gold-rim`, `.cake-3d`, `.parallax-particle`, `.frosting-cursor`.

## 3D / animation approach (lightweight, no Three.js)
- Hero cake: pure CSS `transform-style: preserve-3d` — stacked tier divs, `rotateY` keyframe (~30s loop), candle + flame flicker, layered box-shadows for soft ground shadow. Tiers animate in via Framer Motion on mount.
- Particles: ~20 absolutely-positioned sprinkle/macaron dots animated with Framer Motion + mouse parallax hook (transform based on `mousemove`, throttled).
- Tilt cards: small `useTilt` hook (mouse-position → rotateX/rotateY, max 12°) with gold rim `box-shadow` on hover.
- Scroll reveals: Framer Motion `whileInView` with perspective + rotateX entrance (not flat fades).
- Custom cursor: fixed-position frosting-dot follower, desktop only (`matchMedia('(pointer: fine)')`), hidden on touch.

## Files
- `src/routes/__root.tsx` — real title/description/OG, Google Fonts link, og:image using hero photo.
- `src/routes/index.tsx` — composes all sections.
- `src/components/site/Hero.tsx`, `About.tsx`, `Menu.tsx`, `Gallery.tsx`, `HowToOrder.tsx`, `Reviews.tsx`, `Footer.tsx`, `Cake3D.tsx`, `Particles.tsx`, `TiltCard.tsx`, `CustomCursor.tsx`.
- `src/hooks/use-tilt.ts`, `src/hooks/use-parallax.ts`.
- `src/styles.css` — palette tokens + utilities.
- Uploaded photos → `lovable-assets` pointers in `src/assets/gallery/*.asset.json`, imported into Gallery + Menu.
- Deps to add: `framer-motion`, `lucide-react` (already present likely).

## Out of scope
- No cart / payments / backend.
- No Three.js (kept lightweight for mobile-heavy PK traffic).
- No testimonials data — replaced by Instagram card per your brief.
