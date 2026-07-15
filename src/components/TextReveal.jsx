import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Word-by-word slide-up reveal for headlines.
 * Words wrapped in *asterisks* render italic in the accent color.
 *
 * Visibility is observed on the heading element itself (not the clipped
 * words): a word translated 110% inside overflow-hidden has zero visible
 * area, so IntersectionObserver would never fire on it.
 */
export default function TextReveal({ text, as: Tag = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text.replaceAll('*', '')}>
      {words.map((word, i) => {
        const accented = word.startsWith('*') && word.endsWith('*')
        const clean = word.replaceAll('*', '')
        return (
          // The separating space must live OUTSIDE the overflow-hidden span —
          // trailing whitespace inside an inline-block gets trimmed by CSS.
          <span key={i} aria-hidden>
            {/* Clip only vertically: italic/tracked glyphs overhang the inline
                box horizontally and would get their right edge cut off. */}
            <span className="inline-block overflow-x-visible overflow-y-clip pb-[0.08em] pr-[0.06em] align-bottom">
              <motion.span
                className={`inline-block ${accented ? 'italic text-accent' : ''}`}
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : { y: '110%' }}
                transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {clean}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}
