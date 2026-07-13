import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, THUMBNAIL_SECTION, THUMBNAILS } from '../config/site'
import { FALLBACK_PROJECTS } from '../config/fallback'
import { fetchProjects } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'
import VideoCard from '../components/VideoCard'
import SectionHeading from '../components/SectionHeading'
import RevealOnScroll from '../components/RevealOnScroll'
import Lightbox from '../components/Lightbox'
import { SkeletonGrid } from '../components/Skeleton'

// Shared stagger variants for card grids (staggerChildren 0.1, ease-framer reveal)
const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const gridItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
}

/**
 * THE main highlight of the site: four dedicated CMS-driven portfolio
 * sections. Personal Branding is the flagship — largest cards, first.
 */
export default function PortfolioShowcase() {
  const { data: projects, loading } = useSupabase(fetchProjects, FALLBACK_PROJECTS)
  const byCategory = (key) => projects.filter((p) => p.category === key)

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Selected Work"
        title="The *Work* Speaks"
        blurb="Real projects, real growth. Personal branding first — everything else in service of it."
      />

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <div className="space-y-28 sm:space-y-36">
          <FlagshipSection category={CATEGORIES[0]} projects={byCategory('personal-branding')} />
          <VideoSection category={CATEGORIES[1]} projects={byCategory('business')} />
          <VideoSection category={CATEGORIES[2]} projects={byCategory('creators')} compact />
          <ThumbnailSection category={THUMBNAIL_SECTION} images={THUMBNAILS} />
        </div>
      )}

      <RevealOnScroll className="mt-20 text-center">
        <Link
          to="/work"
          className="group inline-flex items-center gap-3 font-display text-lg font-semibold text-accent"
        >
          Explore the Full Portfolio
          <ArrowRight className="transition-transform group-hover:translate-x-1.5" />
        </Link>
      </RevealOnScroll>
    </section>
  )
}

function CategoryHeader({ category, index }) {
  return (
    <RevealOnScroll className="mb-8 sm:mb-12">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm text-accent">0{index}</span>
        <div>
          <div className="eyebrow mb-2">{category.kicker}</div>
          <h3 className={`display ${index === 1 ? 'text-4xl sm:text-6xl md:text-7xl' : 'text-3xl sm:text-5xl'}`}>
            {category.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-muted">{category.blurb}</p>
        </div>
      </div>
    </RevealOnScroll>
  )
}

/** Personal Branding: oversized flagship layout — one hero card + large grid. */
function FlagshipSection({ category, projects }) {
  const [first, ...rest] = projects
  return (
    <div>
      <CategoryHeader category={category} index={1} />
      {first && (
        <RevealOnScroll>
          <VideoCard project={first} aspect="aspect-video" big />
        </RevealOnScroll>
      )}
      {rest.length > 0 && (
        <motion.div
          className="mt-6 grid gap-6 sm:grid-cols-2"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {rest.map((p) => (
            <motion.div key={p.id} variants={gridItem}>
              <VideoCard project={p} big />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

/** Business / Creator sections: standard responsive grids. */
function VideoSection({ category, projects, compact = false }) {
  const index = compact ? 3 : 2
  return (
    <div>
      <CategoryHeader category={category} index={index} />
      <motion.div
        className={`grid gap-6 sm:grid-cols-2 ${compact ? 'lg:grid-cols-3' : ''}`}
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((p) => (
          <motion.div key={p.id} variants={gridItem}>
            <VideoCard project={p} aspect={compact ? 'aspect-[4/5]' : 'aspect-video'} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/** Thumbnails: static 6-image grid with hover zoom + click-to-enlarge lightbox. */
function ThumbnailSection({ category, images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div>
      <CategoryHeader category={category} index={4} />
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {images.map((src, i) => (
          <motion.button
            key={i}
            variants={gridItem}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-video overflow-hidden rounded-none bg-ink-3"
            whileHover={{ scale: 1.03, transition: { duration: 0.18, ease: [0.2, 0, 0, 1] } }}
            aria-label={`Enlarge thumbnail ${i + 1}`}
          >
            <img
              src={src}
              alt={`Thumbnail design ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/10" />
          </motion.button>
        ))}
      </motion.div>
      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  )
}
