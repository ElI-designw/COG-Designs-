import Link from 'next/link'
import GlowHalos from '@/components/GlowHalos'
import { siteConfig } from '@/config/siteConfig'

export const metadata = { title: '404 — Page Not Found' }

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-bg-primary overflow-hidden px-4">
      <GlowHalos />
      <div className="relative z-10 text-center">
        <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">Oops</p>
        <h1 className="font-bebas text-[clamp(8rem,25vw,20rem)] leading-none tracking-widest gradient-text">
          404
        </h1>
        <p className="font-bebas text-2xl tracking-widest text-text-secondary mt-2">{siteConfig.name}</p>
        <p className="font-inter text-text-secondary mt-4 max-w-sm mx-auto">
          This page doesn&apos;t exist — but great design does. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/" className="btn-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm">
            Back to Home
          </Link>
          <Link href="/work" className="btn-outline-gradient font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm">
            <span className="gradient-text">View Work</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
