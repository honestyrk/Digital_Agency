import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
      <SEO title="404" />
      <h1 className="display text-7xl sm:text-9xl">
        4<span className="text-accent">0</span>4
      </h1>
      <p className="text-muted">This cut didn't make the final edit.</p>
      <Link to="/" className="font-display font-semibold text-accent">← Back home</Link>
    </main>
  )
}
