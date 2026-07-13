# Edit Theory — Personal Branding Agency Website

A premium, cinematic single-page-app website for **Edit Theory** (formerly Prime Cut). Personal Branding is the outcome; video editing, thumbnails, scripts and strategy are the services that achieve it — the site's hierarchy reflects that everywhere.

**Stack:** React 19 · Vite 6 · Tailwind CSS 4 · Framer Motion · Lenis · React Router 7 · Supabase (CMS + DB + storage) · Vercel

> **New here?** Follow [SETUP.md](SETUP.md) for the full step-by-step working procedure — from `npm install` to a deployed site with your own content.

---

## 1. Quick start (local)

```bash
npm install
npm run dev        # http://localhost:5173
```

The site runs **without Supabase configured** — every section falls back to bundled placeholder content (`src/config/fallback.js`), so nothing ever renders broken. Connect Supabase to make it live.

## 2. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql) — creates all tables, Row Level Security policies (public read on content; the `leads` table is insert-only for visitors, never readable), and the public `videos` / `images` storage buckets.
3. Run [`supabase/seed.sql`](supabase/seed.sql) — fills the site with realistic placeholder projects, case studies, testimonials, logos and stats.
4. Copy `.env.example` to `.env` and fill in from **Settings → API**:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_GA_ID=            # optional GA4 measurement id, e.g. G-XXXXXXX
```

5. Restart `npm run dev`.

## 3. How to add a new project (no coding needed)

Adding a project makes it appear on the home page, `/work`, and gives it its own page at `/work/your-slug` automatically.

1. **Upload your media** — Supabase dashboard → **Storage**:
   - Full video → `videos` bucket
   - Short preview clip (see §5) → `videos` bucket
   - Thumbnail / cover images → `images` bucket
   - After each upload click the file → **Get URL** → copy the public URL.
2. **Add the project row** — dashboard → **Table Editor → projects → Insert row**:

   | Field | What to put |
   |---|---|
   | `slug` | Short URL name, lowercase with dashes, e.g. `nike-campaign` (must be unique) |
   | `title` | Project name shown on the card |
   | `client_name` | Client's name |
   | `category` | Exactly one of: `personal-branding`, `business`, `creators` |
   | `industry` | e.g. `SaaS`, `Restaurant` |
   | `description` | 1–3 sentences |
   | `services` | JSON list, e.g. `["Video Editing","Thumbnail Design"]` |
   | `thumbnail_url` | Image URL from step 1 (shown on the card) |
   | `cover_image_url` | Wide image URL (shown on the project page + link previews) |
   | `preview_video_url` | Short muted preview clip URL (plays on the card) |
   | `full_video_url` | Full video URL (plays on the project page) |
   | `gallery_urls` | JSON list of image URLs, e.g. `["url1","url2"]` |
   | `results` | Optional one-line outcome, e.g. `2M views in 60 days` |
   | `sort_order` | Lower number = shown first |

3. **Save.** Refresh the website — the project is live. No code, no deploy.

Case studies work the same way in the `case_studies` table (pages appear at `/case-studies/your-slug`), and testimonials / client logos / stats in their tables.

**Thumbnail Portfolio is different** — it's a static 6-image gallery, not part of the Supabase CMS (there's no ongoing thumbnail content to manage there). To update it, edit the `THUMBNAILS` array directly in [`src/config/site.js`](src/config/site.js): drop your image files into `public/thumbnails/` and swap in the 6 URLs.

## 4. Editing site text, links & colors

Everything a non-developer would change lives in two files:

- [`src/config/site.js`](src/config/site.js) — hero headline (3 alternates included), Calendly URL, WhatsApp number + pre-filled message, email, social links, budget ranges, showreel URL, and the static `THUMBNAILS` gallery.
- [`src/index.css`](src/index.css) — the single `--color-accent` variable rebrands the entire site.

## 5. Video compression recommendations

- **Format:** H.264 MP4 (`yuv420p`), AAC audio — plays everywhere.
- **Preview clips** (portfolio cards): **≤ 5 seconds, ≤ 2 MB**, no audio, 720p is plenty:
  ```bash
  ffmpeg -i full.mp4 -t 5 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart preview.mp4
  ```
- **Full videos:** 1080p, CRF 21–23, `-movflags +faststart` so playback starts before the download finishes.
- **Hero showreel:** keep under ~10 MB; it loads on every visit.

## 6. Deploy to Vercel

1. Push this folder to a Git repo, import it at [vercel.com/new](https://vercel.com/new) (Vite is auto-detected).
2. Add the three environment variables from §2 in **Project → Settings → Environment Variables**.
3. Deploy. [`vercel.json`](vercel.json) already handles SPA routing (all paths → `index.html`) and long-term caching of hashed assets.

## 7. Project structure

```
src/
  config/site.js      # every editable constant (headline, links, categories)
  config/fallback.js  # placeholder content used when Supabase is absent/fails
  lib/supabase.js     # client + query helpers (null-safe without env vars)
  hooks/              # useInViewVideo, useSupabase, useCountUp, Lenis provider
  components/         # navbar, footer, loader, reveals, video card, lightbox…
  sections/           # the home-page sections in order
  pages/              # Home, Work, Project, CaseStudy, About, Contact, 404
supabase/             # schema.sql (tables+RLS+buckets), seed.sql
```

## 8. Assumptions & decisions

- **SEO without helmet:** React 19 hoists `<title>`/`<meta>` rendered from any component into `<head>`, so a tiny native `SEO` component is used instead of `react-helmet-async` (which has React 19 peer-dependency conflicts). Since this is a client-rendered SPA, crawlers that don't run JS see the defaults in `index.html`.
- **Placeholder media:** seed data uses Google's public sample MP4s and placehold.co images so the site looks complete on first run; replace via the Supabase dashboard.
- **Thumbnail Portfolio** is intentionally static (`THUMBNAILS` in `src/config/site.js`), not CMS-driven — there was no ongoing thumbnail content to manage.
- **Loader** shows once per browser session (sessionStorage), not on every navigation.
- **Autoplay with sound** on project pages is attempted but almost always blocked by browsers; the one-click "▶ Play with sound" overlay is the designed fallback, per spec.
- **Accent color** defaults to acid-lime `#e8fb5a` — deliberately un-corporate; change one CSS variable to swap.
- **Currency:** budget ranges are in ₹ per spec; WhatsApp number placeholder is Indian (`91…`) — replace in `site.js`.
- **Reduced motion:** users with `prefers-reduced-motion` get no smooth-scroll hijack, no marquee animation, no cursor glow, no magnetic buttons, and instant counters.
