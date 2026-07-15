// ─── Edit Theory site-wide constants ─────────────────────────────────────────
// Everything a non-developer might want to change lives in this file.
// Contact details, clients and stats are taken from primecutbyrealupgrade.in
// (the agency's previous site, under its old name "Prime Cut").

export const SITE_NAME = 'Edit Theory'
export const SITE_TAGLINE = 'Personal Branding Agency'

// Hero headline — swap freely:
//   'We Turn Creators Into Brands'
//   'We Build Personal Brands'
//   'Stories That Build Businesses'
export const HERO_HEADLINE = 'We Turn Creators Into Brands'
export const HERO_EYEBROW = 'Edit Theory Presents'

// Split headline for the cinematic hero: small italic prefix + massive accent line
export const HERO_PREFIX = 'we create'
export const HERO_MAIN = 'Industry Leaders'
export const HERO_SUBTEXT = [
  'Every frame. Every Word. Every Strategy.',
  'Engineered to make you brand unforgettable.',
  'We don’t just create content. We build systems that earn attention,trust and customers'
]

// Hero showreel — REPLACE with your own compressed reel uploaded to the
// Supabase `videos` bucket (the old site had no showreel to carry over).
export const SHOWREEL_URL =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
export const SHOWREEL_POSTER =
  'https://placehold.co/1920x1080/0a0a0a/e8fb5a?text=EDIT+THEORY'

// Booking + contact (real details from primecutbyrealupgrade.in)
// NOTE: no Calendly account existed on the old site — replace this URL when one is created.
export const CALENDLY_URL = 'https://calendly.com/primecutrealupgrade/strategy-call'
export const WHATSAPP_NUMBER = '917200490940' // +91 72004 90940
export const WHATSAPP_MESSAGE =
  "Hi Edit Theory! I'm interested in building my personal brand."
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
export const CONTACT_EMAIL = 'primecutrealupgrade@gmail.com'
export const PHONE_NUMBER = '+91 72004 90940'
export const LOCATION = 'India'

export const SOCIALS = {
  instagram: 'https://www.instagram.com/real__upgrade',
  whatsapp: WHATSAPP_URL,
  email: `mailto:${CONTACT_EMAIL}`,
}

// Budget ranges shown in the inquiry form (matches the old site's form)
export const BUDGET_OPTIONS = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹5,00,000',
  '₹5,00,000+',
  "Let's Discuss",
]

// Portfolio categories — order = visual hierarchy (Personal Branding is flagship).
// These 3 are backed by the Supabase `projects` table (see /work and its filters).
export const CATEGORIES = [
  {
    key: 'personal-branding',
    title: 'Personal Branding',
    kicker: 'The Flagship',
    blurb:
      'Founder branding, CEO branding, entrepreneur content, LinkedIn personal branding, business storytelling, authority building.',
  },
  {
    key: 'business',
    title: 'Videos for Businesses & Brands',
    kicker: 'Commercial Work',
    blurb:
      'Commercials, product videos, restaurant videos, corporate videos, promotional campaigns, business reels.',
  },
  {
    key: 'creators',
    title: 'Videos for Creators & Artists',
    kicker: 'Creator Content',
    blurb:
      'YouTube videos, reels, shorts, podcast edits, creator content.',
  },
]

// Thumbnail Portfolio — a static gallery, NOT part of the Supabase CMS.
// To swap in real work: drop image files into public/thumbnails/ and update
// the URLs below (exactly 6 keeps the home page grid balanced).
export const THUMBNAIL_SECTION = {
  key: 'thumbnail',
  title: 'Thumbnail Portfolio',
  kicker: 'Designed to Get Clicked',
  blurb: 'Thumbnails engineered for attention and CTR.',
}

export const THUMBNAILS = [
  'https://wynzeyjmxfvoawgksbzx.supabase.co/storage/v1/object/public/images/Thumbnail/1.PNG',
  'https://wynzeyjmxfvoawgksbzx.supabase.co/storage/v1/object/public/images/Thumbnail/2.PNG',
  'https://wynzeyjmxfvoawgksbzx.supabase.co/storage/v1/object/public/images/Thumbnail/3.PNG',
  'https://wynzeyjmxfvoawgksbzx.supabase.co/storage/v1/object/public/images/Thumbnail/4.PNG',
  'https://wynzeyjmxfvoawgksbzx.supabase.co/storage/v1/object/public/images/Thumbnail/5.png',
  'https://wynzeyjmxfvoawgksbzx.supabase.co/storage/v1/object/public/images/Thumbnail/6.png',
]
