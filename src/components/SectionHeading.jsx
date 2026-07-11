import TextReveal from './TextReveal'
import Reveal from './Reveal'

/** Standard section header: eyebrow + oversized reveal headline + blurb. */
export default function SectionHeading({ eyebrow, title, blurb, size = 'text-4xl sm:text-6xl md:text-7xl' }) {
  return (
    <div className="mb-12 sm:mb-16">
      {eyebrow && (
        <Reveal>
          <div className="eyebrow mb-4">{eyebrow}</div>
        </Reveal>
      )}
      <TextReveal text={title} className={`display ${size}`} />
      {blurb && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{blurb}</p>
        </Reveal>
      )}
    </div>
  )
}
