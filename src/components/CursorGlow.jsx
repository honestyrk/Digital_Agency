import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/** Soft accent glow that follows the cursor over the hero. Desktop only. */
export default function CursorGlow() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 60, damping: 20 })
  const sy = useSpring(y, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduced) return
    setEnabled(true)
    const onMove = (e) => { x.set(e.clientX - 250); y.set(e.clientY - 250) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, x, y])

  if (!enabled) return null
  return (
    <motion.div
      className="pointer-events-none absolute z-10 h-[500px] w-[500px] rounded-full opacity-[0.07]"
      style={{ x: sx, y: sy, background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
      aria-hidden
    />
  )
}
