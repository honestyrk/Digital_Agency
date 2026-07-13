import { motion } from 'framer-motion'
import {
  Crown, Clapperboard, Image, PenLine, Compass, Boxes, Target, Share2, Bot,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const gridItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
}

// Personal Branding always first — it is the outcome, the rest are the tools.
// Service list mirrors what Edit Theory actually sells (primecutbyrealupgrade.in).
const services = [
  { icon: Crown, title: 'Personal Branding', desc: 'We turn founders and creators into recognized authorities.' },
  { icon: Clapperboard, title: 'Video Editing', desc: 'Cinematic storytelling that captivates and converts audiences.' },
  { icon: Image, title: 'Thumbnail Design', desc: 'Scroll-stopping thumbnails engineered for clicks.' },
  { icon: PenLine, title: 'Scripting', desc: 'Powerful narratives written to hook attention and drive results.' },
  { icon: Compass, title: 'Branding Visuals', desc: 'Complete brand identity systems that make lasting impressions.' },
  { icon: Boxes, title: 'CGI & Motion', desc: '3D visualization and motion graphics that bring ideas to life.' },
  { icon: Target, title: 'Marketing Systems', desc: 'Data-driven strategies that generate measurable ROI.' },
  { icon: Share2, title: 'Social Media Content', desc: 'Strategic content that builds communities and drives engagement.' },
  { icon: Bot, title: 'AI Automation', desc: 'Intelligent systems that streamline operations and boost efficiency.' },
]

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      {/* Deep-blue backdrop with iridescent floating shapes */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a1030 35%, #0c1440 62%, #000000 100%)' }}
        aria-hidden
      />
      <div
        className="aurora-blob -left-44 top-16 h-[420px] w-[420px]"
        style={{ background: 'conic-gradient(from 90deg, #7dd3fc, #c4b5fd, #f0abfc, #99f6e4, #7dd3fc)' }}
        aria-hidden
      />
      <div
        className="aurora-blob -right-44 bottom-8 h-[480px] w-[480px]"
        style={{ background: 'conic-gradient(from 240deg, #a5f3fc, #f0abfc, #93c5fd, #a7f3d0, #a5f3fc)', animationDelay: '-10s' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="What We Do"
        title="Services That *Build* Brands"
      />
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {services.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={gridItem}
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-line bg-ink/50 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40"
          >
            <div className="mb-5 inline-flex rounded-xl bg-ink-3 p-3 text-accent transition-transform duration-300 group-hover:scale-110">
              <Icon size={22} />
            </div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  )
}
