import { motion } from 'framer-motion'

// Packages-only CTA: 3 stacked layers — blurred glow, gradient stroke ring, solid fill —
// instead of MagneticButton's flat pill, per the Packages visual-upgrade spec.
export default function GlowPillButton({ children, onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
      className={`relative isolate inline-flex items-center justify-center rounded-full px-5 py-2.5 ${className}`}
    >
      {/* 1. Blurred glow layer, hugging the button so it doesn't bleed into content below */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full opacity-50 blur-md"
        style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
      />
      {/* 2. Gradient stroke ring */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 rounded-full p-px"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent), rgba(238,255,0,0.2))',
          mask: 'linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)',
          WebkitMask: 'linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
      {/* 3. Solid fill */}
      <span aria-hidden className="absolute inset-0 z-[1] rounded-full bg-accent" />

      <span className="relative z-10 font-display text-sm font-bold tracking-wide text-ink">{children}</span>
    </motion.button>
  )
}
