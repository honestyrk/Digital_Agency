import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/** Sends the Contact form fields via EmailJS; no-ops when unconfigured
 *  (same graceful-degradation pattern as the Supabase client). */
export async function sendEnquiryEmail(fields) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return
  await emailjs.send(SERVICE_ID, TEMPLATE_ID, fields, { publicKey: PUBLIC_KEY })
}
