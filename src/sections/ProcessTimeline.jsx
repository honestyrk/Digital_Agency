import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

// The proven Prime Cut methodology (from primecutbyrealupgrade.in)
const steps = [
  { title: 'Discovery', desc: 'Understanding your vision, your goals and who needs to hear you.' },
  { title: 'Strategy', desc: 'Crafting the perfect roadmap — positioning, pillars and a publishing system.' },
  { title: 'Production', desc: 'Bringing ideas to life with premium edits, motion identity and thumbnails.' },
  { title: 'Optimization', desc: 'Refining for perfection — hooks, titles and packaging tuned from real data.' },
  { title: 'Scaling', desc: 'Growing your success into a brand that compounds.' },
]

/** Vertical timeline whose spine draws itself as you scroll through it. */
export default function ProcessTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.7'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow="The Process" title="From *Unknown* to Unmissable" />
      <div ref={ref} className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line sm:left-1/2" aria-hidden />
        <motion.div
          className="absolute bottom-0 left-[15px] top-0 w-px origin-top bg-accent sm:left-1/2"
          style={{ scaleY }}
          aria-hidden
        />
        <ol className="space-y-14">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal
                className={`ml-12 sm:ml-0 sm:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? '' : 'sm:ml-auto sm:text-left'
                } ${i % 2 === 0 ? 'sm:text-right' : ''}`}
              >
                <div className="eyebrow mb-1 !text-[0.65rem]">Step {String(i + 1).padStart(2, '0')}</div>
                <h3 className="display text-2xl sm:text-3xl">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.desc}</p>
              </Reveal>
              <motion.span
                className="absolute left-[9px] top-1 block h-3.5 w-3.5 rounded-full border-2 border-accent bg-ink sm:left-1/2 sm:-translate-x-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                aria-hidden
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
