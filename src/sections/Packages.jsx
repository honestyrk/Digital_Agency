import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, Zap } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'

const PACKAGES = [
  {
    index: '01',
    title: 'Personal Brand Management',
    desc: 'Build your personal brand while we handle everything behind the scenes.',
    highlight: true,
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

function PackageCard({ pkg, i, onCTA }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-colors duration-300 sm:p-10 ${
        pkg.highlight
          ? 'border-accent/50 bg-gradient-to-b from-accent/[0.08] to-ink-2'
          : 'border-line bg-ink-2/70 hover:border-accent/30'
      }`}
    >
      {pkg.highlight && (
        <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-ink">
          <Zap size={12} className="fill-ink" /> Most Popular
        </span>
      )}

      <span className="font-display text-sm font-semibold tracking-wide text-accent">{pkg.index}</span>
      <h3 className="display mt-3 text-2xl sm:text-3xl">{pkg.title}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">{pkg.desc}</p>

      <MagneticButton onClick={onCTA} variant="solid" className="mt-6 !px-6 !py-3 text-[13px]">
        Get Started
      </MagneticButton>

      <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
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
        style={{ background: 'linear-gradient(160deg, #05070f 0%, #0a1030 45%, #0c1440 75%, #05070f 100%)' }}
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
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.index} pkg={pkg} i={i} onCTA={() => navigate('/contact')} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
