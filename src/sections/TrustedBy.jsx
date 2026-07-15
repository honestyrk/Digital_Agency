import { useRef } from 'react'
import { useReducedMotion, useAnimationFrame } from 'framer-motion'
import { FALLBACK_LOGOS } from '../config/fallback'
import { fetchLogos } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'
import RevealOnScroll from '../components/RevealOnScroll'

const ARC_AMPLITUDE = 36 // px lift at the center of the strip

/** Client logos in an infinite marquee, bowed along a viewport-fixed arc as
 *  they scroll; pauses on hover, flat/static if reduced motion. */
export default function TrustedBy() {
  const { data: logos } = useSupabase(fetchLogos, FALLBACK_LOGOS)
  const loop = [...logos, ...logos] // duplicated for the seamless -50% loop

  const reduced = useReducedMotion()
  const containerRef = useRef(null)
  const logoRefs = useRef([])
  logoRefs.current = []
  const addLogoRef = (el) => el && logoRefs.current.push(el)

  useAnimationFrame(() => {
    if (reduced) return
    const container = containerRef.current
    if (!container || logoRefs.current.length === 0) return

    const containerRect = container.getBoundingClientRect()
    const centerX = containerRect.left + containerRect.width / 2
    const halfWidth = containerRect.width / 2

    // Batch reads, then batch writes — avoids layout thrash across ~10-16 logos/frame.
    const offsets = logoRefs.current.map((el) => {
      const rect = el.getBoundingClientRect()
      const logoCenterX = rect.left + rect.width / 2
      const normalized = Math.min(1, Math.abs(logoCenterX - centerX) / halfWidth)
      return ARC_AMPLITUDE * (1 - normalized * normalized)
    })
    logoRefs.current.forEach((el, i) => {
      el.style.transform = `translateY(${-offsets[i]}px)`
    })
  })

  return (
    <section className="py-20 sm:py-28">
      <RevealOnScroll className="mb-12 text-center">
        <div className="eyebrow">Trusted By</div>
      </RevealOnScroll>
      <div
        ref={containerRef}
        className="marquee overflow-hidden py-8"
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
      >
        <div className="marquee-track items-center gap-20 pr-20">
          {loop.map((logo, i) => (
            <img
              key={`${logo.id}-${i}`}
              ref={addLogoRef}
              src={logo.logo_url}
              alt={logo.name}
              loading="lazy"
              className="h-9 w-auto opacity-40 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
