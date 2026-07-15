import { useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from '../lib/supabase'

/** Reactive Supabase auth session — used by the admin login gate. */
export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const subscription = onAuthStateChange((session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
