import { FALLBACK_STATS } from '../config/fallback'
import { fetchStats } from '../lib/supabase'
import { useSupabase } from '../hooks/useSupabase'
import { useCountUp } from '../hooks/useCountUp'
import RevealOnScroll from '../components/RevealOnScroll'

function Counter({ stat }) {
  const { ref, value } = useCountUp(stat.value)
  return (
    <div ref={ref} className="text-center">
      <div className="display text-5xl text-accent sm:text-7xl">
        {value.toLocaleString('en-IN')}{stat.suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.25em] text-muted">{stat.label}</div>
    </div>
  )
}

export default function Stats() {
  const { data: stats } = useSupabase(fetchStats, FALLBACK_STATS)
  return (
    <section className="border-y border-line bg-ink-2 py-20 sm:py-28">
      <RevealOnScroll className="mx-auto grid max-w-6xl grid-cols-2 gap-12 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s) => <Counter key={s.id} stat={s} />)}
      </RevealOnScroll>
    </section>
  )
}
