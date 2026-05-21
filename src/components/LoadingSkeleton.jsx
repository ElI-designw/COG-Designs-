export function ProjectCardSkeleton() {
  return (
    <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-bg-secondary" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-bg-secondary rounded w-3/4" />
        <div className="h-3 bg-bg-secondary rounded w-1/2" />
      </div>
    </div>
  )
}

export function ProjectGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-bg-secondary rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}
