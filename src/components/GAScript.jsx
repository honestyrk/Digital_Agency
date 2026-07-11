import { useEffect } from 'react'

/** Injects Google Analytics 4 when VITE_GA_ID is set; no-op otherwise. */
export default function GAScript() {
  const id = import.meta.env.VITE_GA_ID

  useEffect(() => {
    if (!id) return
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    function gtag() { window.dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', id)
  }, [id])

  return null
}
