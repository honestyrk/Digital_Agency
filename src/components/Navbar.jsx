import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SITE_NAME } from '../config/site'
import MagneticButton from './MagneticButton'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/#services', label: 'Services', hash: true },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

/**
 * Floating "island" navbar: a centered rounded pill detached from the top
 * edge, always frosted-glass (blur + translucent), logo left, links center,
 * accent CTA inside the pill. Background deepens slightly once scrolled.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-[80] px-4 sm:top-5">
      <div
        className={`mx-auto max-w-5xl border border-line backdrop-blur-xl transition-all duration-500 ${
          open ? 'rounded-3xl' : 'rounded-full'
        } ${scrolled ? 'bg-ink/75' : 'bg-ink/40'}`}
      >
        <nav className="flex items-center justify-between py-3 pl-6 pr-3 sm:pl-8">
          <Link to="/" className="display text-lg tracking-tight sm:text-xl" onClick={() => setOpen(false)}>
            {SITE_NAME.toUpperCase()}<span className="text-accent">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) =>
              l.hash ? (
                <Link
                  key={l.to}
                  to={l.to}
                  className="font-display text-sm tracking-wide text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `font-display text-sm tracking-wide transition-colors ${
                      isActive ? 'text-accent' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              )
            )}
            <MagneticButton onClick={() => navigate('/contact')} className="!px-5 !py-2.5">
              Contact Us
            </MagneticButton>
          </div>

          <button
            className="p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              className="overflow-hidden border-t border-line md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="py-3 font-display text-lg"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mb-2 mt-2 rounded-full bg-accent py-3 text-center font-display font-semibold text-ink"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
