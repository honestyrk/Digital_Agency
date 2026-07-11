import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import TextReveal from '../components/TextReveal'
import Skeleton from '../components/Skeleton'
import { FALLBACK_CASE_STUDIES } from '../config/fallback'
import { supabase, fetchCaseStudyBySlug } from '../lib/supabase'

const Block = ({ label, children }) => (
  <Reveal className="border-t border-line py-10">
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <div className="eyebrow">{label}</div>
      <div className="max-w-3xl leading-relaxed text-white/85">{children}</div>
    </div>
  </Reveal>
)

export default function CaseStudy() {
  const { slug } = useParams()
  const [cs, setCs] = useState(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    setCs(null)
    setMissing(false)
    const fallback = FALLBACK_CASE_STUDIES.find((c) => c.slug === slug)
    if (!supabase) {
      fallback ? setCs(fallback) : setMissing(true)
      return
    }
    fetchCaseStudyBySlug(slug)
      .then(setCs)
      .catch(() => (fallback ? setCs(fallback) : setMissing(true)))
  }, [slug])

  if (missing) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
        <SEO title="Case study not found" />
        <h1 className="display text-5xl">Case study not found</h1>
        <Link to="/" className="font-display text-accent">← Back home</Link>
      </main>
    )
  }

  if (!cs) {
    return (
      <main className="mx-auto max-w-5xl px-5 pt-36 sm:px-8">
        <Skeleton className="h-14 max-w-lg" />
        <Skeleton className="mt-8 aspect-video" />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pb-28 pt-32 sm:px-8">
      <SEO title={`Case Study — ${cs.client_name}`} description={cs.goal} image={cs.cover_image_url} />
      <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
        <ArrowLeft size={16} /> Home
      </Link>

      <div className="eyebrow mb-4">Case Study</div>
      <TextReveal text={cs.client_name} as="h1" className="display text-5xl sm:text-7xl" />

      <Reveal className="mt-12">
        <video
          src={cs.final_video_url}
          poster={cs.cover_image_url}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-2xl bg-ink-3"
        />
      </Reveal>

      <div className="mt-14">
        <Block label="The Goal">{cs.goal}</Block>
        <Block label="The Process">{cs.process}</Block>
        <Block label="The Results">
          <span className="display text-2xl text-accent sm:text-3xl">{cs.results}</span>
        </Block>
      </div>

      {cs.gallery_urls?.length > 0 && (
        <Reveal className="mt-8">
          <div className="grid grid-cols-2 gap-4">
            {cs.gallery_urls.map((src, i) => (
              <img key={i} src={src} alt={`${cs.client_name} case study ${i + 1}`} loading="lazy" className="aspect-video w-full rounded-xl object-cover" />
            ))}
          </div>
        </Reveal>
      )}
    </main>
  )
}
