import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useInViewVideo } from '../hooks/useInViewVideo'

/**
 * Portfolio preview card: lazy-mounted muted preview clip that plays only
 * while in the viewport, with a hover overlay showing title + category.
 */
export default function VideoCard({ project, aspect = 'aspect-video', big = false }) {
  const { containerRef, videoRef, shouldMount } = useInViewVideo()

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
      <Link
        to={`/work/${project.slug}`}
        ref={containerRef}
        className={`group relative block overflow-hidden rounded-2xl bg-ink-3 ${aspect}`}
      >
        {shouldMount && project.preview_video_url ? (
          <video
            ref={videoRef}
            src={project.preview_video_url}
            poster={project.thumbnail_url}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
          <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
            <div className="eyebrow !text-[0.65rem]">{project.client_name}</div>
            <div className={`display mt-1 ${big ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
              {project.title}
            </div>
          </div>
          <div className="rounded-full bg-accent p-2.5 text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight size={big ? 22 : 18} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
