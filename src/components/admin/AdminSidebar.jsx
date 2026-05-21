'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { siteConfig } from '@/config/siteConfig'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '◈' },
  { label: 'Projects', href: '/admin/projects', icon: '⬡' },
  { label: '+ New Project', href: '/admin/projects/new', icon: '＋' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-bg-secondary border-r border-bg-border flex flex-col z-40">
      {/* Brand */}
      <div className="p-6 border-b border-bg-border">
        <Link href="/admin/dashboard">
          <p className="font-bebas text-2xl tracking-widest gradient-text">{siteConfig.name}</p>
          <p className="font-montserrat text-xs text-text-secondary uppercase tracking-widest mt-0.5">Admin</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-montserrat font-medium text-sm transition-all duration-200 ${
                active
                  ? 'bg-accent-purple/20 text-white border border-accent-purple/30'
                  : 'text-text-secondary hover:text-white hover:bg-bg-card'
              }`}
            >
              <span className="text-lg gradient-text">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom links */}
      <div className="p-4 border-t border-bg-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 rounded-xl font-montserrat text-xs text-text-secondary hover:text-white transition-colors"
        >
          ↗ View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-2 rounded-xl font-montserrat text-xs text-text-secondary hover:text-accent-pink transition-colors w-full text-left"
        >
          ← Sign Out
        </button>
      </div>
    </aside>
  )
}
