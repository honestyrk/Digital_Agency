// Graceful-degradation content: shown whenever a Supabase fetch fails or the
// project has no env vars configured yet. Sections never render empty/broken.
//
// Client names, logos, stats and the testimonial are REAL (taken from
// primecutbyrealupgrade.in). Video URLs are sample placeholders — the old site
// published no portfolio videos — replace them with real work via Supabase.

const MP4 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample'
const poster = (text, size = '800x1000') =>
  `https://placehold.co/${size}/121212/e8fb5a?text=${encodeURIComponent(text)}`

const project = (i, slug, title, client, category, industry, description, extra = {}) => ({
  id: `fallback-${slug}`,
  slug,
  title,
  client_name: client,
  category,
  industry,
  description,
  services: ['Video Editing', 'Creative Direction'],
  tags: [],
  thumbnail_url: poster(title),
  cover_image_url: poster(title, '1600x900'),
  preview_video_url: `${MP4}/ForBiggerBlazes.mp4`,
  full_video_url: `${MP4}/BigBuckBunny.mp4`,
  gallery_urls: [],
  results: null,
  is_featured: i < 2,
  sort_order: i,
  ...extra,
})

export const FALLBACK_PROJECTS = [
  // 1) Personal Branding — flagship
  project(0, 'real-upgrade-brand', 'The Real Upgrade Brand', 'Real Upgrade', 'personal-branding', 'Creative Agency',
    'Building the @real__upgrade personal brand — the content system behind Edit Theory itself.',
    { services: ['Personal Branding', 'Business Storytelling', 'Video Editing'], thumbnail_url: '/logos/edit-theory.png' }),
  project(1, 'rish-gang-branding', 'Rish Gang Creator Brand', 'Rish Gang', 'personal-branding', 'Content Creator',
    'A 2.5-year personal branding partnership: study content, Instagram reels and branded videos with a consistent identity.',
    { services: ['Personal Branding', 'Content Strategy', 'Video Editing'], thumbnail_url: '/logos/rish-gang.png',
      results: 'Multi-million views across platforms' }),

  // 2) Businesses & Brands
  project(2, 'limowide-brand-films', 'LIMOWIDE Brand Films', 'LIMOWIDE', 'business', 'Luxury Transportation',
    'Premium brand video content for a global chauffeur and limousine platform.',
    { services: ['Commercial', 'Branding Visuals'], thumbnail_url: '/logos/limowide.png' }),
  project(3, 'fone-carz-content', 'Fone Carz Content System', 'Fone Carz', 'business', 'Retail',
    'Promotional videos and social content built to drive store footfall and sales.',
    { services: ['Promotional Campaigns', 'Business Reels'], thumbnail_url: '/logos/fone-carz.png' }),
  project(4, 'elahi-campaigns', 'Elahi Campaigns', 'Elahi', 'business', 'Lifestyle Brand',
    'Campaign videos and branding visuals crafted for a lifestyle brand.',
    { services: ['Product Videos', 'Creative Production'], thumbnail_url: '/logos/elahi.png' }),

  // 3) Creators & Artists
  project(5, 'rish-gang-reels', 'Rish Gang Reels Engine', 'Rish Gang', 'creators', 'Content Creator',
    'Study content edits and Instagram reels with an editing style that generated multi-million views.',
    { services: ['Reels', 'YouTube Videos'], thumbnail_url: '/logos/rish-gang.png',
      results: 'Multi-million views across platforms' }),
  project(6, 'asal-kolar-artist', 'Asal Kolar Artist Content', 'Asal Kolar', 'creators', 'Artist',
    'Creator content and edits crafted around a distinctive artist identity.',
    { services: ['Creator Content', 'Shorts'], thumbnail_url: '/logos/asal-kolar.png' }),
]

export const FALLBACK_CASE_STUDIES = [
  {
    id: 'fallback-cs-1',
    slug: 'rish-gang-growth',
    client_name: 'Rish Gang',
    goal: 'Grow a content creator into a recognized brand through consistent, premium content across platforms.',
    process:
      'A 2.5-year partnership: study content edits → Instagram reels → branded videos, with a consistent editing style and quality bar maintained across every upload.',
    final_video_url: `${MP4}/ElephantsDream.mp4`,
    results: 'Multi-million views generated across platforms; quality and consistency that stood out in the niche.',
    gallery_urls: ['/logos/rish-gang.png'],
    cover_image_url: poster('RISH GANG', '1600x900'),
    sort_order: 0,
  },
]

// The one REAL testimonial from the old site (Rish Gang).
export const FALLBACK_TESTIMONIALS = [
  {
    id: 't1',
    client_name: 'Rish Gang',
    company: 'Content Creator, Rish Gang Channel',
    review:
      "I've been working with Edit Theory for more than 2.5 years, and the growth we achieved together has been incredible. From study content edits to Instagram reels and branded videos, the quality and consistency always stood out. Their editing style helped generate multi-million views across platforms.",
    photo_url: '/logos/rish-gang.png',
    video_url: null,
    sort_order: 0,
  },
]

// Real client logos (downloaded from the old site into public/logos/)
export const FALLBACK_LOGOS = [
  { name: 'LIMOWIDE', file: 'limowide' },
  { name: 'Fone Carz', file: 'fone-carz' },
  { name: 'Rish Gang', file: 'rish-gang' },
  { name: 'Asal Kolar', file: 'asal-kolar' },
  { name: 'Elahi', file: 'elahi' },
].map(({ name, file }, i) => ({
  id: `logo-${i}`,
  name,
  logo_url: `/logos/${file}.png`,
  sort_order: i,
}))

// Real stats from the old site's "Crafting Digital Legacies" section
export const FALLBACK_STATS = [
  { id: 's1', label: 'Projects Completed', value: 102, suffix: '+', sort_order: 0 },
  { id: 's2', label: 'Brands Worked With', value: 29, suffix: '+', sort_order: 1 },
  { id: 's3', label: 'Client Satisfaction', value: 96, suffix: '%', sort_order: 2 },
  { id: 's4', label: 'Creative Support', value: 24, suffix: '/7', sort_order: 3 },
]
