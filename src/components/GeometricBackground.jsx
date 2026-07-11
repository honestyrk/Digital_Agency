import { motion } from 'framer-motion'

/**
 * Elegant floating glass pills over a dark backdrop (adapted from Kokonut UI's
 * HeroGeometric). Shapes drop in once, then float gently forever.
 */
function ElegantShape({ className = '', delay = 0, width, height, rotate, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      className={`absolute ${className}`}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ width, height }}
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  )
}

export default function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Soft color wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <ElegantShape
        delay={0.3} width={600} height={140} rotate={12}
        gradient="from-indigo-500/[0.15]"
        className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
      />
      <ElegantShape
        delay={0.5} width={500} height={120} rotate={-15}
        gradient="from-rose-500/[0.15]"
        className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
      />
      <ElegantShape
        delay={0.4} width={300} height={80} rotate={-8}
        gradient="from-violet-500/[0.15]"
        className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
      />
      <ElegantShape
        delay={0.6} width={200} height={60} rotate={20}
        gradient="from-amber-500/[0.15]"
        className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
      />
      <ElegantShape
        delay={0.7} width={150} height={40} rotate={-25}
        gradient="from-cyan-500/[0.15]"
        className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
      />

      {/* Vertical fade into the page background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80" />
    </div>
  )
}
