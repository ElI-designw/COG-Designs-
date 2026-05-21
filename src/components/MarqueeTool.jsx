'use client'

export default function MarqueeTool({ tools }) {
  const doubled = [...tools, ...tools]

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-8 w-max animate-marquee"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {doubled.map((tool, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm whitespace-nowrap"
          >
            <span className="font-montserrat font-bold text-sm bg-gradient-to-r from-accent-purple via-accent-pink to-accent-orange bg-clip-text text-transparent">
              {tool.icon}
            </span>
            <span className="font-montserrat font-semibold text-sm text-text-dark">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
