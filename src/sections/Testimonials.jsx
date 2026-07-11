import { Quote } from 'lucide-react'
import { FALLBACK_TESTIMONIALS } from '../config/fallback'
import { fetchTestimonials } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'
import { useInViewVideo } from '../hooks/useInViewVideo'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

function TestimonialCard({ t }) {
  const { containerRef, videoRef, shouldMount } = useInViewVideo()
  return (
    <figure
      ref={containerRef}
      className="mb-4 rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-accent/30"
    >
      <Quote size={18} className="mb-3 text-accent" />
      <blockquote className="text-sm leading-relaxed text-white/85">{t.review}</blockquote>
      {t.video_url && shouldMount && (
        <video
          ref={videoRef}
          src={t.video_url}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="mt-4 aspect-video w-full rounded-xl object-cover"
        />
      )}
      <figcaption className="mt-5 flex items-center gap-3">
        <img
          src={t.photo_url}
          alt={t.client_name}
          loading="lazy"
          className="h-10 w-10 rounded-full border border-line object-cover"
        />
        <div>
          <div className="font-display text-sm font-semibold">{t.client_name}</div>
          <div className="text-xs text-muted">{t.company}</div>
        </div>
      </figcaption>
    </figure>
  )
}

function MarqueeColumn({ items, reverse = false, duration = 40, className = '' }) {
  const loop = [...items, ...items] // duplicated for the seamless -50% loop
  return (
    <div
      className={`marquee h-full overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent)' }}
    >
      <div
        className={`marquee-track-vertical ${reverse ? 'marquee-track-reverse' : ''}`}
        style={{ '--marquee-speed': `${duration}s` }}
      >
        {loop.map((t, i) => <TestimonialCard key={`${t.id}-${i}`} t={t} />)}
      </div>
    </div>
  )
}

/**
 * Testimonial wall: vertical marquee columns scrolling in alternating
 * directions (middle column reversed), tilted in 3D on large screens.
 * Columns pause on hover; static under prefers-reduced-motion.
 */
export default function Testimonials() {
  const { data: testimonials } = useSupabase(fetchTestimonials, FALLBACK_TESTIMONIALS)

  const columns = Array.from({ length: 3 }, (_, c) =>
    testimonials.filter((_, i) => i % 3 === c)
  ).filter((col) => col.length > 0)
  const durations = [45, 35, 55]

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Testimonials" title="Trusted by the *Brands* We Built" />

        {/* Mobile: one column with everything */}
        <Reveal className="h-[560px] sm:hidden">
          <MarqueeColumn items={testimonials} duration={55} />
        </Reveal>

        {/* Tablet/desktop: tilted 3-column wall */}
        <Reveal className="hidden sm:block lg:[perspective:1000px]">
          <div className="grid h-[620px] grid-cols-2 gap-5 lg:grid-cols-3 lg:[transform:rotateX(12deg)_rotateY(-7deg)_rotateZ(6deg)_scale(1.05)]">
            {columns.map((col, c) => (
              <MarqueeColumn
                key={c}
                items={col}
                reverse={c % 2 === 1}
                duration={durations[c % 3]}
                className={c === 2 ? 'hidden lg:block' : ''}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
