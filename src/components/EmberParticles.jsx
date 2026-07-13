// Ambient cinematic embers drifting down the hero — pure CSS animation
// (keyframes in index.css), randomized once per page load. Particles past the
// first 12 only render on md+ screens; the whole layer hides under
// prefers-reduced-motion.
const rand = (min, max) => min + Math.random() * (max - min)

const PARTICLES = Array.from({ length: 24 }, (_, id) => ({
  id,
  left: rand(0, 100),
  size: rand(2, 5),
  opacity: rand(0.2, 0.7),
  fall: rand(10, 24), // seconds top → bottom
  delay: rand(-24, 0), // negative → mid-fall on first paint, never in sync
  drift: rand(8, 28), // horizontal sway amplitude in px
  accent: Math.random() < 0.45,
}))

export default function EmberParticles() {
  return (
    <div className="ember-layer pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className={`ember absolute top-0 rounded-full ${p.id >= 12 ? 'hidden md:block' : ''}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: p.accent ? 'var(--color-accent)' : '#fff',
            boxShadow: p.accent
              ? '0 0 6px rgba(232, 251, 90, 0.8)'
              : '0 0 6px rgba(255, 255, 255, 0.55)',
            animationDuration: `${p.fall}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
