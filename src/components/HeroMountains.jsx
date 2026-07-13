import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Full-bleed night-mountain backdrop for the hero: fades/scales in on load,
 * parallaxes at ~40% of scroll speed on desktop, and drifts with a barely
 * visible 60s Ken Burns zoom. A dark gradient overlay keeps it moody so the
 * accent headline stays the brightest thing on screen.
 */
export default function HeroMountains() {
  const reduced = useReducedMotion()
  const [desktop, setDesktop] = useState(false)

  // Parallax only on md+ screens — cheap to keep static on mobile.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const { scrollY } = useScroll()
  // Cancelling 60% of scroll movement leaves the mountains scrolling at ~40%
  // of foreground speed. The wrapper is 135% tall so the shift never exposes
  // an empty edge.
  const y = useTransform(scrollY, (v) => (desktop && !reduced ? v * 0.6 : 0))

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.5, ease: 'easeOut' }}
      aria-hidden
    >
      <motion.div className="absolute inset-x-0 top-0 h-[135%] will-change-transform" style={{ y }}>
        <img
          src="/hero-mountains.webp"
          alt=""
          fetchPriority="high"
          className={`h-full w-full object-cover object-[50%_30%] ${reduced ? '' : 'kenburns'}`}
        />
      </motion.div>
      {/* Moody blend into the page background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 70%, #000000 100%)',
        }}
      />
    </motion.div>
  )
}
