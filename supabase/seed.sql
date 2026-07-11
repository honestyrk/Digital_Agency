-- ─── Prime Cut — seed data ───────────────────────────────────────────────────
-- Client names, logos, stats and the testimonial are REAL (carried over from
-- primecutbyrealupgrade.in). The old site published no portfolio videos, so
-- video URLs are Google sample MP4s and posters are placehold.co images —
-- replace them with real work uploaded to the `videos` / `images` buckets.
-- Logo paths like /logos/x.png are served from the website's public folder.

-- Projects ---------------------------------------------------------------------
insert into public.projects
  (slug, title, client_name, category, industry, description, services, tags, thumbnail_url, cover_image_url, preview_video_url, full_video_url, gallery_urls, results, project_date, is_featured, sort_order)
values
-- 1) Personal Branding (flagship)
('real-upgrade-brand', 'The Real Upgrade Brand', 'Real Upgrade', 'personal-branding', 'Creative Agency',
 'Building the @real__upgrade personal brand — the content system behind Prime Cut itself.',
 '["Personal Branding","Business Storytelling","Video Editing"]', '["founder","instagram"]',
 '/logos/prime-cut.png',
 'https://placehold.co/1600x900/121212/e8fb5a?text=Real+Upgrade',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
 '[]', null, '2026-01-15', true, 0),

('rish-gang-branding', 'Rish Gang Creator Brand', 'Rish Gang', 'personal-branding', 'Content Creator',
 'A 2.5-year personal branding partnership: study content, Instagram reels and branded videos with a consistent identity.',
 '["Personal Branding","Content Strategy","Video Editing"]', '["creator","reels"]',
 '/logos/rish-gang.png',
 'https://placehold.co/1600x900/121212/e8fb5a?text=Rish+Gang',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
 '[]', 'Multi-million views across platforms', '2026-02-10', true, 1),

-- 2) Businesses & Brands
('limowide-brand-films', 'LIMOWIDE Brand Films', 'LIMOWIDE', 'business', 'Luxury Transportation',
 'Premium brand video content for a global chauffeur and limousine platform.',
 '["Commercial","Branding Visuals"]', '["luxury","transport"]',
 '/logos/limowide.png',
 'https://placehold.co/1600x900/121212/e8fb5a?text=LIMOWIDE',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
 '[]', null, '2026-01-20', true, 2),

('fone-carz-content', 'Fone Carz Content System', 'Fone Carz', 'business', 'Retail',
 'Promotional videos and social content built to drive store footfall and sales.',
 '["Promotional Campaigns","Business Reels"]', '["retail"]',
 '/logos/fone-carz.png',
 'https://placehold.co/1600x900/121212/e8fb5a?text=Fone+Carz',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
 '[]', null, '2026-02-14', false, 3),

('elahi-campaigns', 'Elahi Campaigns', 'Elahi', 'business', 'Lifestyle Brand',
 'Campaign videos and branding visuals crafted for a lifestyle brand.',
 '["Product Videos","Creative Production"]', '["lifestyle"]',
 '/logos/elahi.png',
 'https://placehold.co/1600x900/121212/e8fb5a?text=Elahi',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
 '[]', null, '2026-03-01', false, 4),

-- 3) Creators & Artists
('rish-gang-reels', 'Rish Gang Reels Engine', 'Rish Gang', 'creators', 'Content Creator',
 'Study content edits and Instagram reels with an editing style that generated multi-million views.',
 '["Reels","YouTube Videos"]', '["reels","study-content"]',
 '/logos/rish-gang.png',
 'https://placehold.co/1600x900/121212/e8fb5a?text=Rish+Gang+Reels',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
 '[]', 'Multi-million views across platforms', '2026-01-25', false, 5),

('asal-kolar-artist', 'Asal Kolar Artist Content', 'Asal Kolar', 'creators', 'Artist',
 'Creator content and edits crafted around a distinctive artist identity.',
 '["Creator Content","Shorts"]', '["artist"]',
 '/logos/asal-kolar.png',
 'https://placehold.co/1600x900/121212/e8fb5a?text=Asal+Kolar',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
 '[]', null, '2026-02-20', false, 6);

-- Note: Thumbnail Portfolio is a static gallery, not stored in this table —
-- edit the THUMBNAILS array in src/config/site.js instead.

-- Case studies ------------------------------------------------------------------
insert into public.case_studies
  (slug, client_name, goal, process, final_video_url, results, gallery_urls, cover_image_url, sort_order)
values
('rish-gang-growth', 'Rish Gang',
 'Grow a content creator into a recognized brand through consistent, premium content across platforms.',
 'A 2.5-year partnership: study content edits → Instagram reels → branded videos, with a consistent editing style and quality bar maintained across every upload.',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
 'Multi-million views generated across platforms; quality and consistency that stood out in the niche.',
 '["/logos/rish-gang.png"]',
 'https://placehold.co/1600x900/121212/e8fb5a?text=RISH+GANG', 0);

-- Testimonials (real review from the old site) ------------------------------------
insert into public.testimonials (client_name, company, review, photo_url, video_url, sort_order) values
('Rish Gang', 'Content Creator, Rish Gang Channel',
 'I''ve been working with Prime Cut for more than 2.5 years, and the growth we achieved together has been incredible. From study content edits to Instagram reels and branded videos, the quality and consistency always stood out. Their editing style helped generate multi-million views across platforms.',
 '/logos/rish-gang.png', null, 0);

-- Client logos (real, served from the site's public/logos folder) -------------------
insert into public.client_logos (name, logo_url, sort_order) values
('LIMOWIDE',   '/logos/limowide.png', 0),
('Fone Carz',  '/logos/fone-carz.png', 1),
('Rish Gang',  '/logos/rish-gang.png', 2),
('Asal Kolar', '/logos/asal-kolar.png', 3),
('Elahi',      '/logos/elahi.png', 4);

-- Stats (real numbers from the old site) --------------------------------------------
insert into public.site_stats (label, value, suffix, sort_order) values
('Projects Completed',  102, '+',  0),
('Brands Worked With',  29,  '+',  1),
('Client Satisfaction', 96,  '%',  2),
('Creative Support',    24,  '/7', 3);
