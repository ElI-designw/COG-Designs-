export default function GlowHalos({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {/* Blue — left */}
      <div
        className="absolute -left-32 top-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
      {/* Cyan — center */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/3 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
      {/* Indigo — right */}
      <div
        className="absolute -right-32 top-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
    </div>
  )
}
