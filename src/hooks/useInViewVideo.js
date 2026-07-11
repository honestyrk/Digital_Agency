import { useEffect, useRef, useState } from 'react'

/**
 * Shared video-in-viewport behavior for portfolio preview cards:
 *  - `shouldMount` flips true when the card is NEAR the viewport (lazy mount)
 *  - once mounted, the video plays while visible and pauses when scrolled away
 *
 * Usage:
 *   const { containerRef, videoRef, shouldMount } = useInViewVideo()
 *   <div ref={containerRef}>{shouldMount && <video ref={videoRef} ... />}</div>
 */
export function useInViewVideo({ mountMargin = '400px' } = {}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true)
          io.disconnect()
        }
      },
      { rootMargin: mountMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mountMargin])

  useEffect(() => {
    if (!shouldMount) return
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current
        if (!video) return
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shouldMount])

  return { containerRef, videoRef, shouldMount }
}
