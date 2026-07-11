import { motion } from 'framer-motion'
import { SITE_NAME } from '../config/site'

/** First-visit loading screen: logo reveal, then a curtain lift. */
export default function Loader({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onDone}
      aria-hidden
    >
      <div className="overflow-hidden">
        <motion.div
          className="display text-4xl sm:text-6xl"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE_NAME.toUpperCase()}
          <span className="text-accent">.</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
