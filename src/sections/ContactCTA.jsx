import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MessageCircle, Mail, Loader2 } from 'lucide-react'
import { CALENDLY_URL, WHATSAPP_URL, CONTACT_EMAIL, BUDGET_OPTIONS } from '../config/site'
import { insertLead } from '../lib/supabase'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'
import ShinyButton from '../components/ShinyButton'

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'business_name', label: 'Business Name', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'instagram', label: 'Instagram', type: 'text', placeholder: '@yourhandle' },
]

const inputCls =
  'w-full rounded-xl border border-line bg-ink-3 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-accent'

export default function ContactCTA() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = Object.fromEntries(new FormData(e.currentTarget))
    try {
      await insertLead(form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="border-t border-line bg-ink-2 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Start Your Brand"
            title="Ready to Become *Unmissable?*"
            blurb="Tell us about your business, or skip the form and book a call directly."
            size="text-4xl sm:text-6xl"
          />
          <Reveal className="flex flex-wrap gap-4">
            <MagneticButton href={CALENDLY_URL} target="_blank" rel="noreferrer">
              <Calendar size={16} /> Book Strategy Call
            </MagneticButton>
            <ShinyButton href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp
            </ShinyButton>
            <ShinyButton href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={16} /> Email Us
            </ShinyButton>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-line bg-ink p-10 text-center"
              >
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden>
                  <circle cx="45" cy="45" r="42" stroke="var(--color-accent)" strokeWidth="3" className="draw-circle" />
                  <path d="M28 46 L40 58 L62 34" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
                </svg>
                <h3 className="display mt-7 text-2xl">Inquiry Received</h3>
                <p className="mt-3 max-w-xs text-sm text-muted">
                  We'll get back to you within 24 hours. Want to move faster? Book a call right now.
                </p>
                <MagneticButton href={CALENDLY_URL} target="_blank" rel="noreferrer" className="mt-7">
                  <Calendar size={16} /> Book Strategy Call
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                exit={{ opacity: 0, scale: 0.97 }}
                className="grid gap-4 rounded-2xl border border-line bg-ink p-6 sm:grid-cols-2 sm:p-8"
              >
                {fields.map((f) => (
                  <label key={f.name}>
                    <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
                      {f.label}{f.required && <span className="text-accent"> *</span>}
                    </span>
                    <input
                      name={f.name}
                      type={f.type}
                      required={f.required}
                      placeholder={f.placeholder}
                      className={inputCls}
                    />
                  </label>
                ))}
                <label>
                  <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">Budget</span>
                  <select name="budget" className={inputCls} defaultValue="">
                    <option value="" disabled>Select a range</option>
                    {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
                    Project Description<span className="text-accent"> *</span>
                  </span>
                  <textarea name="description" rows={4} required className={inputCls} placeholder="What are we building together?" />
                </label>

                {status === 'error' && (
                  <p className="text-sm text-red-400 sm:col-span-2">
                    Something went wrong sending your inquiry. Please reach us on WhatsApp or email instead.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60 sm:col-span-2"
                >
                  {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
                  {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
