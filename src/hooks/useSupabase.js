import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Fetch CMS data with a bundled fallback. Returns the fallback immediately
 * when Supabase isn't configured, and swaps to live data once it arrives.
 * On any error (or empty result) the fallback is kept, so sections never break.
 */
export function useSupabase(fetcher, fallback) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    fetcher()
      .then((rows) => {
        if (!cancelled && rows && (!Array.isArray(rows) || rows.length > 0)) {
          setData(rows)
        }
      })
      .catch(() => {}) // keep fallback
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading }
}
