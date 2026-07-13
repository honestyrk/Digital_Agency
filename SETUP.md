# Edit Theory — Step-by-Step Setup Guide

Follow these steps in order. Steps 1–3 get the site running on your machine; steps 4–6 make it live with your own content; step 7 puts it on the internet.

---

## Step 1 — Prerequisites

| Tool | Version | Check with |
|---|---|---|
| Node.js | 20 or newer | `node --version` |
| npm | 10 or newer | `npm --version` |

Download Node from [nodejs.org](https://nodejs.org) if missing. You'll also need free accounts at [supabase.com](https://supabase.com) (content database) and [vercel.com](https://vercel.com) (hosting) — both have generous free tiers.

## Step 2 — Install and run locally

Open a terminal in the project folder (`d:\Projects\Digital_Agency`) and run:

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

> ✅ **Checkpoint:** you should see the loading animation, then the hero with "We Turn Creators Into Brands". The whole site works right now using built-in placeholder content — no database needed yet. If this works, continue.

## Step 3 — Create the Supabase project (the CMS)

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Pick any name (e.g. `prime-cut`), a strong database password, and the region closest to your visitors (e.g. Mumbai).
3. Wait ~2 minutes for the project to provision.

### 3a. Create the tables

1. In the Supabase dashboard, open **SQL Editor** → **New query**.
2. Open the file [`supabase/schema.sql`](supabase/schema.sql) from this project, copy **all** of it, paste it into the editor, press **Run**.
3. You should see "Success. No rows returned."

This creates the 6 tables (`projects`, `case_studies`, `testimonials`, `client_logos`, `site_stats`, `leads`), the security rules (visitors can read content but never read leads), and the two public storage buckets (`videos`, `images`).

### 3b. Load the sample content

1. Same SQL Editor → **New query**.
2. Copy all of [`supabase/seed.sql`](supabase/seed.sql), paste, **Run**.
3. Verify: **Table Editor → projects** should show 11 rows.

### 3c. Connect the website to Supabase

1. In the dashboard go to **Settings → API**. You need two values:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon public** key (long string under "Project API keys")
2. In the project folder, copy `.env.example` to a new file named `.env`.
3. Fill it in:

```bash
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key...
VITE_GA_ID=
```

4. Stop the dev server (Ctrl+C) and run `npm run dev` again (env changes need a restart).

> ✅ **Checkpoint:** the site now shows content from **your** database. Test it: change a project's `title` in Table Editor, refresh the browser — the new title appears. Also submit the contact form; the entry should appear in **Table Editor → leads**.

## Step 4 — Replace the placeholder business details

All editable constants live in one file: [`src/config/site.js`](src/config/site.js). Update:

- `HERO_HEADLINE` — three approved options are in the comment above it
- `CALENDLY_URL` — your real Calendly link
- `WHATSAPP_NUMBER` — country code + number, digits only (e.g. `9198XXXXXXXX`)
- `WHATSAPP_MESSAGE` — the pre-filled message clients send you
- `CONTACT_EMAIL` and `SOCIALS` — your real handles
- `SHOWREEL_URL` / `SHOWREEL_POSTER` — your hero showreel (upload it first, see Step 5)
- `BUDGET_OPTIONS` — adjust the ₹ ranges if needed

Optional: change the site accent color by editing `--color-accent` at the top of [`src/index.css`](src/index.css) — one line rebrands everything.

## Step 5 — Upload your real media

For every video project you need **two files**:

| File | Purpose | Spec |
|---|---|---|
| Preview clip | Autoplays silently on portfolio cards | ≤ 5 s, ≤ 2 MB, no audio, 720p |
| Full video | Plays on the project's own page | 1080p H.264 MP4 |

Make a preview clip with ffmpeg (or ask your editor to export one):

```bash
ffmpeg -i full.mp4 -t 5 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart preview.mp4
```

Upload steps:

1. Supabase dashboard → **Storage** → `videos` bucket → **Upload file** (videos), and `images` bucket for thumbnails/posters/photos/logos.
2. Click the uploaded file → **Get URL** → copy the public URL.
3. Paste those URLs into the matching columns in the Table Editor.

## Step 6 — Add a new project (the routine you'll repeat)

1. Upload preview clip + full video + thumbnail image (Step 5).
2. **Table Editor → projects → Insert → Insert row**:
   - `slug`: lowercase-with-dashes, unique (becomes the URL `/work/your-slug`)
   - `title`, `client_name`, `industry`, `description`
   - `category`: exactly one of `personal-branding` · `business` · `creators`
   - `services`: JSON list like `["Video Editing","Branding Visuals"]`
   - the four URL fields from your uploads
   - `gallery_urls`: JSON list of image URLs
   - `sort_order`: lower = shown first
3. Save. Refresh the site — the project card, its filter placement, and its dedicated page all exist. **No code, no redeploy.**

Case studies (`case_studies` table → `/case-studies/slug`), testimonials, client logos, and the four stats work the same way in their tables.

**Thumbnail Portfolio is not part of this CMS** — it's a static 6-image gallery. To update it, edit the `THUMBNAILS` array in `src/config/site.js` directly (drop image files into `public/thumbnails/` and swap in the URLs), then redeploy.

## Step 7 — Deploy to Vercel

1. Push the project to GitHub/GitLab (`.gitignore` already excludes `.env` and `node_modules`).
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo. Vercel auto-detects Vite; keep the defaults.
3. Before deploying, expand **Environment Variables** and add the same three values as your `.env`:
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and optionally `VITE_GA_ID` (your GA4 `G-…` id).
4. Click **Deploy**. `vercel.json` already handles SPA routing and asset caching.
5. Add your custom domain under **Project → Settings → Domains**.

> ✅ **Checkpoint:** visit the deployed URL, open a project page directly (e.g. `/work/founder-story-arjun`), and hard-refresh — it must load, not 404. Submit the contact form and confirm the row lands in `leads`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Site shows placeholder content, not my Supabase data | `.env` values wrong/missing, or dev server not restarted after editing `.env`. On Vercel: env vars not set → redeploy after adding them. |
| Contact form says "Something went wrong" | Supabase not connected (see above), or the `leads` insert policy is missing — re-run the RLS section of `schema.sql`. |
| New project doesn't appear | `category` must match one of the four values exactly (lowercase, with dash). Check `slug` is unique. |
| Video doesn't play on a card | The `preview_video_url` must be a direct public MP4 URL. Test it by opening the URL in a new tab. |
| Uploaded video is slow to start | Re-export with `-movflags +faststart` (see Step 5 command). |
| Changed `.env` but nothing happened | Vite only reads env vars at startup — stop and rerun `npm run dev`. |

## Command reference

```bash
npm run dev       # local development at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```
