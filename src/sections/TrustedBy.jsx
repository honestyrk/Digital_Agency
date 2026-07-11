import { FALLBACK_LOGOS } from '../config/fallback'
import { fetchLogos } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'
import Reveal from '../components/Reveal'

/** Client logos in an infinite marquee; pauses on hover, static if reduced motion. */
export default function TrustedBy() {
  const { data: logos } = useSupabase(fetchLogos, FALLBACK_LOGOS)
  const loop = [...logos, ...logos] // duplicated for the seamless -50% loop

  return (
    <section className="py-20 sm:py-28">
      <Reveal className="mb-12 text-center">
        <div className="eyebrow">Trusted By</div>
      </Reveal>
      <div className="marquee overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}>
        <div className="marquee-track items-center gap-20 pr-20">
          {loop.map((logo, i) => (
            <img
              key={`${logo.id}-${i}`}
              src={logo.logo_url}
              alt={logo.name}
              loading="lazy"
              className="h-9 w-auto opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
