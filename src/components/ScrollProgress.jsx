import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin accent progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
