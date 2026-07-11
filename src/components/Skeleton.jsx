/** Shimmering placeholder shown while CMS data loads. */
export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-2xl bg-ink-3 ${className}`} aria-hidden />
}

export function SkeletonGrid({ count = 3, className = 'aspect-video' }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={className} />
      ))}
    </div>
  )
}
