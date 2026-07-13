import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, Zap, Crown, PenLine, Image, Clapperboard, Boxes, Compass, Target, Rocket } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import GlowPillButton from '../components/GlowPillButton'

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const gridItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
}

const PACKAGES = [
  {
    index: '01',
    title: 'Personal Brand Management',
    desc: 'Build your personal brand while we handle everything behind the scenes.',
    highlight: true,
    icons: [Crown, PenLine, Image],
    items: [
      'Content Strategy & Positioning',
      'Script Writing & Content Planning',
      'Dedicated Client Manager',
      'Professional Shoot Team (Camera + Crew)',
      'Advanced Motion Graphics Editing',
      'Thumbnail & Publishing Support',
    ],
  },
  {
    index: '02',
    title: 'Advanced Video Editing',
    desc: "Already recording your content? We'll transform it into scroll-stopping videos.",
    icons: [Clapperboard, Boxes, Zap],
    items: [
      'Cinematic & Catchy Editing',
      'Motion Graphics & Animations',
      'Sound Design & Color Grading',
      'Captions, Hooks & Retention Effects',
      'Platform-Optimized Delivery',
      'Fast Turnaround',
    ],
  },
  {
    index: '03',
    title: 'Brand Building',
    desc: 'Build a brand people remember — not just another social media page.',
    icons: [Compass, PenLine, Target],
    items: [
      'Brand Positioning Strategy',
      'Brand Identity Development',
      'Content Pillars & Messaging',
      'Script Writing & Content Calendar',
      'Audience Growth Strategy',
      'Long-Term Brand Consultation',
    ],
  },
  {
    index: '04',
    title: 'Creator Growth Partner',
    desc: 'Your creative team for every shoot, every idea, and every upload.',
    growth: true,
    icons: [Rocket, Clapperboard, Target],
    items: [
      'Creative Direction',
      'Travel for On-Location Shoots',
      'Storytelling & Script Writing',
      'End-to-End Production',
      'High-End Editing & Motion Graphics',
      'Growth Strategy & Performance Reviews',
    ],
  },
]

const gradientText = (stops) => ({
  backgroundImage: `linear-gradient(${stops})`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
})

function IconBadges({ icons }) {
  const angles = [-8, 4, -5]
  return (
    <div className="mb-6 flex gap-3">
      {icons.map((Icon, i) => (
        <div
          key={i}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 grayscale"
          style={{ transform: `rotate(${angles[i]}deg)` }}
        >
          <Icon size={16} />
        </div>
      ))}
    </div>
  )
}

function PackageCard({ pkg, onCTA }) {
  return (
    <motion.div
      variants={gridItem}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border p-8 backdrop-blur-[20px] sm:p-10 ${
        pkg.highlight ? 'border-accent/50' : 'border-white/15'
      }`}
      style={{
        background: 'radial-gradient(115% 54% at 47.4% 27.8%, rgb(23,23,23) 0%, rgb(0,0,0) 100%)',
        boxShadow: pkg.highlight ? '0 0 60px -10px rgba(238,255,0,0.35)' : undefined,
      }}
    >
      {/* Dot-grid texture, faded toward the edges */}
      <div className="dot-grid pointer-events-none absolute inset-0 z-0" aria-hidden />

      <div className="relative z-10">
        {pkg.highlight && (
          <span className="absolute right-0 top-0 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-ink">
            <Zap size={12} className="fill-ink" /> Most Popular
          </span>
        )}

        <span
          className="font-display text-4xl font-bold tracking-wide sm:text-5xl"
          style={gradientText('0deg, rgb(255,255,255) 0%, rgba(255,255,255,0.25) 100%')}
        >
          {pkg.index}
        </span>

        <h3 className="display mt-3 text-2xl sm:text-3xl" style={gradientText('180deg, #fff 0%, rgba(255,255,255,0.7) 100%')}>
          {pkg.highlight ? (
            <>
              <span className="font-hero-eyebrow italic">Personal Brand</span> Management
            </>
          ) : (
            pkg.title
          )}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">{pkg.desc}</p>

        <div className="mt-6 mb-6">
          <GlowPillButton onClick={onCTA} className="text-[13px]">
            Get Started
          </GlowPillButton>
        </div>

        <IconBadges icons={pkg.icons} />

        <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          What&rsquo;s Included
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {pkg.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
              <Plus size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Animated growth path — Creator Growth Partner only */}
        {pkg.growth && (
          <svg
            className="mt-8 h-10 w-full"
            viewBox="0 0 300 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 30 Q 75 35, 150 20 T 300 5"
              fill="none"
              stroke="rgba(255,255,255,0.17)"
              strokeWidth={2}
            />
            <path
              d="M0 30 Q 75 35, 150 20 T 300 5"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeDasharray={100}
              strokeLinecap="round"
              className="dash-draw"
              pathLength={100}
            />
          </svg>
        )}
      </div>
    </motion.div>
  )
}

export default function Packages() {
  const navigate = useNavigate()

  return (
    <section id="packages" className="relative overflow-hidden py-24 sm:py-32">
      {/* Deep navy backdrop with a blurred color swirl, matching the reference pricing section */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #000000 0%, #0a1030 45%, #0c1440 75%, #000000 100%)' }}
        aria-hidden
      />
      <div
        className="aurora-blob -bottom-32 -left-32 h-[520px] w-[520px]"
        style={{ background: 'conic-gradient(from 200deg, #6366f1, #a855f7, #ec4899, #38bdf8, #6366f1)' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Packages"
          title="The Best *Packages* Ever"
          blurb="Pick your package and start creating today. One flat fee, zero guesswork."
        />
        <motion.div
          className="grid gap-5 sm:grid-cols-2"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.index} pkg={pkg} onCTA={() => navigate('/contact')} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
