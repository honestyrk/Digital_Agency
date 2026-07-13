import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const PACKAGES = [
  {
    index: '01',
    title: 'Personal Brand Management',
    desc: 'Build your personal brand while we handle everything behind the scenes.',
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

function PackageCard({ pkg, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-8 sm:p-10"
    >
      <span className="display pointer-events-none absolute -right-2 -top-6 text-8xl text-white/5 transition-colors duration-500 group-hover:text-accent/10 sm:text-9xl">
        {pkg.index}
      </span>

      <div className="relative">
        <span className="font-display text-sm font-semibold tracking-wide text-accent">{pkg.index}</span>
        <h3 className="display mt-3 text-2xl sm:text-3xl">{pkg.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">{pkg.desc}</p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {pkg.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
              <Plus size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Packages" title="Pick Your *Growth* Path" />
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.index} pkg={pkg} i={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
