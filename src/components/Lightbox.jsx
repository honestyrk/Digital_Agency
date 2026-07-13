import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/** Fullscreen image lightbox with keyboard + arrow navigation. */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, images, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="absolute right-5 top-5 p-2 text-white/70 hover:text-white" aria-label="Close">
            <X size={28} />
          </button>
          <button
            className="absolute left-3 p-2 text-white/70 hover:text-accent sm:left-6"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + images.length) % images.length) }}
          >
            <ChevronLeft size={32} />
          </button>
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            className="max-h-[85vh] max-w-[90vw] rounded-none object-contain"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 p-2 text-white/70 hover:text-accent sm:right-6"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % images.length) }}
          >
            <ChevronRight size={32} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
