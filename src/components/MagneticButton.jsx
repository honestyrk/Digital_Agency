import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Button/link that magnetically follows the cursor within its bounds.
 * Renders an <a> when `href` is given, otherwise a <button>.
 */
export default function MagneticButton({ children, href, onClick, variant = 'solid', className = '', ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    if (reduced) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const styles =
    variant === 'solid'
      ? 'bg-accent text-ink hover:brightness-110'
      : 'border border-white/20 text-white hover:border-accent hover:text-accent'

  const Comp = href ? motion.a : motion.button

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-colors ${styles} ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}
