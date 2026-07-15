import { useEffect, useRef } from 'react'
import { CATEGORIES, THUMBNAIL_SECTION, THUMBNAILS } from '../config/site'
import { FALLBACK_PROJECTS } from '../config/fallback'
import { fetchProjects } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'

function ReelCard({ item }) {
  return (
    <div className="relative h-56 w-40 shrink-0 overflow-hidden rounded-none border border-line bg-ink-2 sm:h-64 sm:w-48">
      {item.video ? (
        <video
          src={item.video}
          poster={item.poster}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
          data-reel-video
        />
      ) : (
        <img src={item.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
      <span className="absolute bottom-2.5 left-2.5 right-2.5 truncate rounded-full border border-line bg-ink/60 px-2.5 py-1 text-center font-display text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
        {item.label}
      </span>
    </div>
  )
}

/** One preview per category (3 real projects + the thumbnail gallery) in a
 *  left-to-right infinite marquee. Rendered inline inside Hero as its
 *  video-collage entrance step — no own section wrapper or scroll reveal. */
export default function CategoryReel() {
  const { data: projects } = useSupabase(fetchProjects, FALLBACK_PROJECTS)
  const containerRef = useRef(null)

  const items = CATEGORIES.map((cat) => {
    const p = projects.find((proj) => proj.category === cat.key)
    if (!p) return null
    return {
      key: cat.key,
      label: cat.title,
      poster: p.cover_image_url || p.thumbnail_url,
      video: p.preview_video_url,
    }
  }).filter(Boolean)

  items.push({
    key: THUMBNAIL_SECTION.key,
    label: THUMBNAIL_SECTION.title,
    poster: THUMBNAILS[0],
    video: null,
  })

  const loop = [...items, ...items]

  // Play/pause every looping video together based on section visibility —
  // the marquee itself is CSS-driven, so this only saves battery when scrolled away.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const videos = el.querySelectorAll('[data-reel-video]')
        videos.forEach((v) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()))
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="marquee mx-auto max-w-7xl overflow-hidden px-5 sm:px-8"
      style={{ maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}
    >
      <div className="marquee-track marquee-track-reverse gap-5" style={{ '--marquee-speed': '32s' }}>
        {loop.map((item, i) => (
          <ReelCard key={`${item.key}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}
