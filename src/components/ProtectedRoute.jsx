import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/** Gates /admin behind a logged-in Supabase session. */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-svh items-center justify-center bg-ink text-white/60">Loading…</div>
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
