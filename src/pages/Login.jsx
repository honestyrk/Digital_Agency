import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    navigate('/admin', { replace: true })
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-ink px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-line bg-ink-2 p-8">
        <h1 className="display text-2xl">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">Sign in to manage Works and Testimonials.</p>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-line bg-ink-3 px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-line bg-ink-3 px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-accent py-3 font-display text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
