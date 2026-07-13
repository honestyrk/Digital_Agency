import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

let lenis = null

/** Smooth scrolling for the whole app; scrolls to top on route change. */
export function LenisProvider({ children }) {
  const reduced = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    if (reduced) return
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenis = null
    }
  }, [reduced])

  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
      return
    }

    // Poll for the target element instead of a fixed delay — a cross-page
    // nav (e.g. /about -> /#services) mounts Home only after the route's
    // exit/enter transition finishes, so a fixed timeout can fire too early
    // (element not mounted yet) or needlessly late (already on the page).
    let raf
    let attempts = 0
    const tryScroll = () => {
      const el = document.querySelector(hash)
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -100 })
        else el.scrollIntoView()
        return
      }
      if (attempts++ < 60) raf = requestAnimationFrame(tryScroll)
    }
    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return children
}
