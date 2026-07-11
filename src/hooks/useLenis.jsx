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
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
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
    if (hash) {
      // Wait out the route transition before scrolling to the anchor
      const t = setTimeout(() => {
        const el = document.querySelector(hash)
        if (!el) return
        if (lenis) lenis.scrollTo(el, { offset: -100 })
        else el.scrollIntoView()
      }, 500)
      return () => clearTimeout(t)
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return children
}
