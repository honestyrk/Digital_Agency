import { motion } from 'framer-motion'
import {
  Lightbulb, Gem, TrendingUp, Users, Zap, Crown, Rocket,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

// Merges the spec pillars with the old site's "Why Choose Prime Cut" values.
const features = [
  { icon: Crown, title: 'Personal Branding Expertise', desc: 'Branding people is different from branding products. It is all we do.' },
  { icon: Lightbulb, title: 'Innovation First', desc: 'We push boundaries with cutting-edge technology and AI-driven creative solutions.' },
  { icon: Gem, title: 'Quality Driven', desc: 'Every pixel, every cut, every frame is crafted with meticulous attention to detail.' },
  { icon: TrendingUp, title: 'Business-Oriented Content', desc: 'Views are vanity. We optimize for trust, leads and deals.' },
  { icon: Users, title: 'Client Success', desc: 'Your success is our mission — results that exceed expectations.' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Consistent publishing needs consistent delivery. We never miss.' },
  { icon: Rocket, title: 'Future Ready', desc: 'Scalable creative systems that adapt and grow with your brand.' },
]

export default function WhyEditTheory() {
  return (
    <section className="border-y border-line bg-ink-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Why Edit Theory" title="One Brand. *Infinite* Possibilities." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl border border-line bg-ink p-6 transition-colors hover:border-accent/40 ${
                i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              <Icon size={22} className="mb-4 text-accent" />
              <h3 className="font-display font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
