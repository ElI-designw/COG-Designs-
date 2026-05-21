'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/siteConfig'

const quickLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function BehanceIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.578c-.105-1.547-1.136-2.219-1.869-2.219-.932 0-1.519.418-1.709 2.219zm-3.635 6.692H5v-16h6.19C15.714 4.692 15.714 12.667 11.365 13.673zm-3.365-3.282h2.279c2.422 0 2.422-3.854 0-3.854H8v3.854z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function DribbbleIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.logout c.232-.38 3.105-5.195 8.337-6.87.186-.06.375-.115.566-.163-.363-.823-.776-1.64-1.209-2.436C7.692 11.87 3.136 11.982 2.726 11.99l-.012.28c0 2.21.712 4.24 1.872 5.89zm-1.918-7.603c.414.006 4.256-.057 8.445-1.247-1.515-2.7-3.15-4.97-3.386-5.3-2.567 1.21-4.346 3.53-5.059 6.547zM13.88 1.7c.23.315 1.893 2.55 3.386 5.32 3.22-1.205 4.586-3.03 4.74-3.25C20.44 2.02 17.344.9 13.88 1.7zm8.35 4.793c-.202.255-1.7 2.19-5.07 3.57.21.43.408.867.596 1.308.065.152.13.305.19.46 3.404-.428 6.792.258 7.13.326-.005-2.171-.624-4.195-1.847-5.664z" />
    </svg>
  )
}

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="bg-bg-primary border-t border-transparent relative">
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-accent-purple via-accent-pink to-accent-orange" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-bebas text-5xl tracking-widest gradient-text">{siteConfig.name}</h2>
            <p className="text-text-secondary font-inter text-sm leading-relaxed max-w-xs">
              {siteConfig.tagline}. Creative design studio based in {siteConfig.location}.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-xs uppercase tracking-widest text-text-secondary">
              Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-text-secondary hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-xs uppercase tracking-widest text-text-secondary">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              {[
                { Icon: BehanceIcon, label: 'Behance', url: siteConfig.social.behance },
                { Icon: LinkedInIcon, label: 'LinkedIn', url: siteConfig.social.linkedin },
                { Icon: DribbbleIcon, label: 'Dribbble', url: siteConfig.social.dribbble },
              ].map(({ Icon, label, url }) => (
                <span
                  key={label}
                  className="text-text-secondary/30 cursor-not-allowed"
                  title={`${label} — Coming Soon`}
                  aria-label={`${label} coming soon`}
                >
                  <Icon />
                </span>
              ))}
            </div>
            <p className="text-text-secondary font-inter text-xs">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors duration-200">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-secondary font-inter text-xs">
            © 2025 {siteConfig.name} · {siteConfig.fullName} · {siteConfig.location}
          </p>
          <Link href="/admin/login" className="text-text-secondary/30 font-inter text-xs hover:text-text-secondary/60 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
