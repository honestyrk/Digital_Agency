import { motion } from 'framer-motion'
import { HERO_EYEBROW, HERO_PREFIX, HERO_MAIN, HERO_SUBTEXT } from '../config/site'
import ShinyButton from '../components/ShinyButton'
import CursorGlow from '../components/CursorGlow'
import GeometricBackground from '../components/GeometricBackground'
import HeroMountains from '../components/HeroMountains'
import EmberParticles from '../components/EmberParticles'

const rise = (delay) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

/**
 * Cinematic hero: badge pill → italic prefix → massive accent headline →
 * subtext → CTA, entering as a staggered sequence.
 */
export default function Hero() {
  const words = HERO_MAIN.split(' ')

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32">
      <HeroMountains />
      <GeometricBackground />
      <CursorGlow />
      <EmberParticles />

      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge pill */}
        <motion.div
          {...rise(0.2)}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/50 py-1.5 pl-2 pr-4 backdrop-blur-xl"
        >
          <img
            src="/logos/edit-theory.png"
            alt=""
            className="h-5 w-auto object-contain"
          />
          <span className="font-display text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
            {HERO_EYEBROW}
          </span>
        </motion.div>

        {/* Italic prefix */}
        <motion.p {...rise(0.35)} className="font-display text-2xl italic text-white/70 sm:text-3xl">
          {HERO_PREFIX}
        </motion.p>

        {/* Massive accent headline */}
        <h1
          className="display mt-1 text-6xl text-accent sm:text-8xl md:text-9xl"
          aria-label={`${HERO_PREFIX} ${HERO_MAIN}`}
        >
          {words.map((word, i) => (
            <span key={i} aria-hidden>
              <span className="inline-block overflow-x-visible overflow-y-clip pb-[0.1em] pr-[0.06em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p {...rise(0.75)} className="mt-9 text-sm leading-relaxed text-muted sm:text-base">
          {HERO_SUBTEXT[0]}
          <br />
          {HERO_SUBTEXT[1]}
        </motion.p>

        {/* CTA */}
        <motion.div {...rise(0.9)} className="mt-8">
          <ShinyButton href="#portfolio">View Portfolio</ShinyButton>
        </motion.div>
      </div>
    </section>
  )
}
