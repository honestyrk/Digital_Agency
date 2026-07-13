import { motion } from 'framer-motion'
import { HERO_EYEBROW, HERO_PREFIX, HERO_MAIN, HERO_SUBTEXT } from '../config/site'
import MagneticButton from '../components/MagneticButton'
import CursorGlow from '../components/CursorGlow'
import GeometricBackground from '../components/GeometricBackground'
import HeroMountains from '../components/HeroMountains'
import EmberParticles from '../components/EmberParticles'
import CategoryReel from './CategoryReel'

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
}
// Video-collage row (item 6): larger initial offset + scale-in, since it's the largest visual element
const heroCollageItem = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
}

/**
 * Cinematic hero: badge pill → italic Playfair micro-headline → massive
 * accent headline (SF Pro/Inter) → Geist body copy → CTA, entering as a
 * page-load stagger sequence (not scroll-triggered).
 */
export default function Hero() {
  const words = HERO_MAIN.split(' ')

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32">
      <HeroMountains />
      <GeometricBackground />
      <CursorGlow />
      <EmberParticles />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-20 flex w-full flex-col items-center"
      >
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
        {/* 1. Badge pill */}
        <motion.div
          variants={heroItem}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/50 py-1.5 pl-2 pr-4 backdrop-blur-xl"
        >
          <img src="/logos/edit-theory.png" alt="" className="h-5 w-auto object-contain" />
          <span className="font-hero-headline text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
            {HERO_EYEBROW}
          </span>
        </motion.div>

        {/* 2. Micro-headline — italic Playfair Display */}
        <motion.p
          variants={heroItem}
          className="font-hero-eyebrow italic text-white/70"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 400 }}
        >
          {HERO_PREFIX}
        </motion.p>

        {/* 3. Main headline — SF Pro Display / Inter, one accent phrase, internal word cascade */}
        <motion.div variants={heroItem} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(238,255,0,0.25), transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <h1
            className="font-hero-headline mt-1 text-accent"
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1,
            }}
            aria-label={`${HERO_PREFIX} ${HERO_MAIN}`}
          >
            {words.map((word, i) => (
              <span key={i} aria-hidden>
                <span className="inline-block overflow-x-visible overflow-y-clip pb-[0.1em] pr-[0.06em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.2, 0, 0, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* 4. Body paragraph — Geist */}
        <motion.p
          variants={heroItem}
          className="font-hero-body mt-9 max-w-[600px] text-white/75"
          style={{ fontSize: '17px', fontWeight: 400 }}
        >
          {HERO_SUBTEXT[0]}
          <br />
          {HERO_SUBTEXT[1]}
        </motion.p>

      </div>

        {/* 5. Video collage row — largest visual element, bigger offset + scale-in */}
        <motion.div variants={heroCollageItem} className="mt-14 w-full">
          <CategoryReel />
        </motion.div>

        {/* 6. CTA — solid lime pill, black bold text, scale(1.03) ease-framer hover */}
        <motion.div variants={heroItem} className="mt-10">
          <MagneticButton href="#portfolio" variant="solid" className="font-bold!">
            View Portfolio
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
