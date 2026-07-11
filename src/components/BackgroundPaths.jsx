import { motion, useReducedMotion } from 'framer-motion'

// Generates a family of nested curved strokes that all share the same shape,
// offset slightly from each other — reads as flowing threads.
function FloatingPaths({ position }) {
  const reduced = useReducedMotion()
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <svg
      className="h-full w-full text-white"
      viewBox="0 0 696 316"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.06 + path.id * 0.012}
          initial={{ pathLength: 0.3, opacity: 0.4 }}
          animate={
            reduced
              ? { pathLength: 1, opacity: 0.3 }
              : { pathLength: 1, opacity: [0.2, 0.4, 0.2], pathOffset: [0, 1, 0] }
          }
          transition={reduced ? undefined : { duration: 24 + path.id, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </svg>
  )
}

/** Two mirrored sets of slow-drifting flowing lines, for use as a section backdrop. */
export default function BackgroundPaths() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  )
}
