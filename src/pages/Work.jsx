import { useState } from 'react'
import SEO from '../components/SEO'
import SectionHeading from '../components/SectionHeading'
import VideoCard from '../components/VideoCard'
import { SkeletonGrid } from '../components/Skeleton'
import { CATEGORIES } from '../config/site'
import { FALLBACK_PROJECTS } from '../config/fallback'
import { fetchProjects } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'

const filters = [{ key: 'all', title: 'All Work' }, ...CATEGORIES]

export default function Work() {
  const { data: projects, loading } = useSupabase(fetchProjects, FALLBACK_PROJECTS)
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-36 sm:px-8">
      <SEO title="Work" description="The full Edit Theory portfolio — personal branding, business films, creator content and thumbnails." />
      <SectionHeading eyebrow="Portfolio" title="All *Work*" />

      <div className="mb-12 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`rounded-full border px-5 py-2 font-display text-xs tracking-wide transition-colors ${
              active === f.key
                ? 'border-accent bg-accent text-ink'
                : 'border-line text-white/60 hover:border-white/30 hover:text-white'
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => <VideoCard key={p.id} project={p} />)}
        </div>
      )}
    </main>
  )
}
