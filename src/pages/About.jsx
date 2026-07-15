import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import TextReveal from '../components/TextReveal'
import RevealOnScroll from '../components/RevealOnScroll'
import MagneticButton from '../components/MagneticButton'

const beliefs = [
  { title: 'Mission', text: 'Make every founder and creator we work with impossible to ignore.' },
  { title: 'Vision', text: 'A world where the best people in every field are also the best known.' },
  { title: 'Philosophy', text: 'Strategy decides what to say. Craft decides whether anyone listens. We obsess over both.' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <main className="pb-28 pt-36">
      <SEO title="About" description="The story, mission and creative philosophy behind Edit Theory — a Personal Branding Agency." />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="eyebrow mb-4">
          <RevealOnScroll>About Edit Theory</RevealOnScroll>
        </div>
        <TextReveal
          text="Crafting *Digital* *Legacies.*"
          as="h1"
          className="display max-w-5xl text-4xl sm:text-6xl md:text-8xl"
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <RevealOnScroll>
            <img
              src="/logos/edit-theory.png"
              alt="Edit Theory brand mark"
              className="w-full rounded-2xl bg-ink-2 object-contain p-10"
            />
          </RevealOnScroll>
          <div>
            <RevealOnScroll>
              <p className="display text-2xl leading-snug sm:text-3xl">
                Edit Theory is a creative powerhouse, production agency and branding
                studio powered by AI — transforming ambitious visions into
                remarkable realities.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <p className="mt-8 max-w-xl leading-relaxed text-muted">
                Personal Branding is the outcome we sell; premium video, scripting,
                branding visuals and AI-powered content systems are how we deliver
                it — with cutting-edge technology and unparalleled creative expertise.
              </p>
            </RevealOnScroll>

            <div className="mt-14 space-y-8">
              {beliefs.map((b, i) => (
                <RevealOnScroll key={b.title} delay={i * 0.1} className="border-t border-line pt-6">
                  <div className="grid gap-2 sm:grid-cols-[160px_1fr]">
                    <div className="eyebrow">{b.title}</div>
                    <p className="text-white/85">{b.text}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.2} className="mt-14">
              <MagneticButton onClick={() => navigate('/contact')}>
                Contact Us
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </main>
  )
}
