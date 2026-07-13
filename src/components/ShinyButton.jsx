import { motion } from 'framer-motion'

// Sweeping-shine glass button (adapted from the shadcn ShinyButton to this
// codebase: plain JSX, accent-color driven, renders <a> when `href` is given).
const animationProps = {
  initial: { '--x': '100%', scale: 0.9 },
  animate: { '--x': '-100%', scale: 1 },
  whileHover: { scale: 1.03, transition: { duration: 0.15, ease: [0.2, 0, 0, 1] } },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: { type: 'spring', stiffness: 200, damping: 20, mass: 0.5 },
  },
}

const accent = (pct) => `color-mix(in srgb, var(--color-accent) ${pct}%, transparent)`

export default function ShinyButton({ children, href, className = '', ...props }) {
  const Comp = href ? motion.a : motion.button
  return (
    <Comp
      {...animationProps}
      href={href}
      className={`relative inline-flex items-center justify-center rounded-full px-7 py-5 font-display text-sm font-semibold tracking-wide text-white/90 backdrop-blur-xl transition-shadow duration-300 ease-framer hover:shadow-[0_0_24px_var(--shine-glow)] ${className}`}
      style={{
        '--shine-glow': accent(15),
        background: `radial-gradient(circle at 50% 0%, ${accent(12)} 0%, transparent 60%)`,
      }}
      {...props}
    >
      <span
        className="relative inline-flex items-center gap-2"
        style={{
          maskImage:
            'linear-gradient(-75deg, #fff calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #fff calc(var(--x) + 100%))',
          WebkitMaskImage:
            'linear-gradient(-75deg, #fff calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #fff calc(var(--x) + 100%))',
        }}
      >
        {children}
      </span>
      {/* Shine ring: gradient clipped to a 1px border via mask-composite */}
      <span
        aria-hidden
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        style={{
          background: `linear-gradient(-75deg, ${accent(20)} calc(var(--x) + 20%), ${accent(70)} calc(var(--x) + 25%), ${accent(20)} calc(var(--x) + 100%))`,
          mask: 'linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)',
          WebkitMask: 'linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
    </Comp>
  )
}
