import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import VideoCard from '../components/VideoCard'
import Reveal from '../components/Reveal'
import Skeleton from '../components/Skeleton'
import Lightbox from '../components/Lightbox'
import { CATEGORIES } from '../config/site'
import { FALLBACK_PROJECTS } from '../config/fallback'
import { supabase, fetchProjectBySlug, fetchProjects } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'

/**
 * Individual project page, fully generated from the CMS row.
 * The hero video attempts autoplay WITH sound; when the browser blocks it,
 * a prominent "Play with sound" overlay appears (one click required).
 */
export default function Project() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    setProject(null)
    setMissing(false)
    const fallback = FALLBACK_PROJECTS.find((p) => p.slug === slug)
    if (!supabase) {
      fallback ? setProject(fallback) : setMissing(true)
      return
    }
    fetchProjectBySlug(slug)
      .then(setProject)
      .catch(() => (fallback ? setProject(fallback) : setMissing(true)))
  }, [slug])

  if (missing) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
        <SEO title="Project not found" />
        <h1 className="display text-5xl">Project not found</h1>
        <Link to="/work" className="font-display text-accent">← Back to all work</Link>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="mx-auto max-w-6xl px-5 pt-36 sm:px-8">
        <Skeleton className="aspect-video" />
        <Skeleton className="mt-8 h-14 max-w-lg" />
      </main>
    )
  }

  return <ProjectView key={project.slug} project={project} />
}

function ProjectView({ project }) {
  const videoRef = useRef(null)
  const [blocked, setBlocked] = useState(false)
  const category = CATEGORIES.find((c) => c.key === project.category)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Try autoplay with sound; fall back to the overlay if the browser refuses.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    video.play().catch(() => setBlocked(true))
  }, [])

  const playWithSound = () => {
    const video = videoRef.current
    video.muted = false
    video.currentTime = 0
    video.play().then(() => setBlocked(false)).catch(() => {})
  }

  const { data: allProjects } = useSupabase(fetchProjects, FALLBACK_PROJECTS)
  const related = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3)

  return (
    <main className="pb-28 pt-24">
      <SEO title={project.title} description={project.description} image={project.cover_image_url} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link to="/work" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
          <ArrowLeft size={16} /> All Work
        </Link>

        <motion.div
          className="relative overflow-hidden rounded-2xl bg-ink-3"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <video
            ref={videoRef}
            src={project.full_video_url}
            poster={project.cover_image_url}
            controls
            playsInline
            className="aspect-video w-full"
          />
          {blocked && (
            <button
              onClick={playWithSound}
              className="absolute inset-0 flex items-center justify-center bg-ink/60 backdrop-blur-sm transition hover:bg-ink/50"
            >
              <span className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display font-semibold text-ink">
                <Play size={20} fill="currentColor" /> Play with sound
              </span>
            </button>
          )}
        </motion.div>

        <div className="mt-12 grid gap-10 md:grid-cols-[2fr_1fr]">
          <div>
            <Reveal>
              <div className="eyebrow mb-3">{category?.title || project.category}</div>
              <h1 className="display text-4xl sm:text-6xl">{project.title}</h1>
              <p className="mt-6 max-w-2xl leading-relaxed text-white/80">{project.description}</p>
              {project.results && (
                <p className="mt-4 font-display text-accent">{project.results}</p>
              )}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <dl className="space-y-5 rounded-2xl border border-line bg-ink-2 p-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Client</dt>
                <dd className="mt-1 font-display">{project.client_name}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">Industry</dt>
                <dd className="mt-1 font-display">{project.industry}</dd>
              </div>
              {project.services?.length > 0 && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span key={s} className="rounded-full border border-line px-3 py-1 text-xs">{s}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        {project.gallery_urls?.length > 0 && (
          <Reveal className="mt-16">
            <div className="eyebrow mb-6">Gallery</div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.gallery_urls.map((src, i) => (
                <button key={i} onClick={() => setLightboxIndex(i)} className="overflow-hidden rounded-xl" aria-label={`Enlarge gallery image ${i + 1}`}>
                  <img src={src} alt={`${project.title} gallery ${i + 1}`} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105" />
                </button>
              ))}
            </div>
            <Lightbox
              images={project.gallery_urls}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNavigate={setLightboxIndex}
            />
          </Reveal>
        )}

        {related.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <h2 className="display mb-8 text-3xl sm:text-4xl">Related Projects</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <VideoCard key={p.id} project={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
