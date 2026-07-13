import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react'
import { SITE_NAME, SOCIALS, PHONE_NUMBER } from '../config/site'

const socialIcons = [
  { icon: Instagram, href: SOCIALS.instagram, label: 'Instagram' },
  { icon: MessageCircle, href: SOCIALS.whatsapp, label: 'WhatsApp' },
  { icon: Mail, href: SOCIALS.email, label: 'Email' },
  { icon: Phone, href: `tel:${PHONE_NUMBER.replaceAll(' ', '')}`, label: 'Phone' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <div className="display text-3xl">
            {SITE_NAME.toUpperCase()}<span className="text-accent">.</span>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <img
              src="/logos/edit-theory.png"
              alt="Edit Theory logo"
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
            <p className="max-w-xs text-sm text-muted">
              A Personal Branding Agency crafting cinematic digital experiences
              and AI-powered content systems that help brands dominate attention.
            </p>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-5">Quick Links</div>
          <ul className="space-y-3 font-display text-sm">
            <li><Link to="/work" className="text-white/70 transition-colors hover:text-accent">Portfolio</Link></li>
            <li><Link to="/#services" className="text-white/70 transition-colors hover:text-accent">Services</Link></li>
            <li><Link to="/about" className="text-white/70 transition-colors hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="text-white/70 transition-colors hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-5">Connect</div>
          <div className="flex gap-3">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-line p-3 text-white/70 transition-all hover:scale-110 hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <div className="mt-5 space-y-1 text-sm text-muted">
            <div>{PHONE_NUMBER}</div>
            <div>India</div>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  )
}
