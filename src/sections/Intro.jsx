import TextReveal from '../components/TextReveal'
import BackgroundPaths from '../components/BackgroundPaths'

const lines = [
  'We are Prime Cut.',
  'A *Personal* *Branding* agency.',
  'Video, scripting, branding visuals and',
  'AI-powered content systems that help',
  'brands stand out and scale.',
]

export default function Intro() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundPaths />
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-40">
        {lines.map((line, i) => (
          <TextReveal
            key={i}
            text={line}
            as="p"
            delay={i * 0.08}
            className="display text-3xl sm:text-5xl md:text-6xl"
          />
        ))}
      </div>
    </section>
  )
}
