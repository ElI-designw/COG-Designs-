import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/config/siteConfig'
import GlowHalos from '@/components/GlowHalos'
import FloatingShapes from '@/components/FloatingShapes'
import ProjectCard from '@/components/ProjectCard'
import HeroScrollIndicator from '@/components/HeroScrollIndicator'
import MarqueeTool from '@/components/MarqueeTool'

export const metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
}

async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true, featured: true },
      include: { images: { orderBy: { order: 'asc' }, take: 1 } },
      orderBy: { order: 'asc' },
      take: 6,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProjects()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
        <GlowHalos />
        <FloatingShapes />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="font-bebas text-[clamp(4rem,15vw,14rem)] leading-none tracking-widest gradient-text">
            {siteConfig.name}
          </h1>
          <p className="font-montserrat font-semibold text-[clamp(1rem,3vw,1.5rem)] text-white/80 tracking-widest mt-2 uppercase">
            {siteConfig.fullName}
          </p>
          <p className="font-inter text-[clamp(0.9rem,2vw,1.1rem)] text-text-secondary mt-4 max-w-lg mx-auto">
            {siteConfig.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/work"
              className="btn-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="btn-outline-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide bg-transparent"
            >
              <span className="gradient-text">Get In Touch</span>
            </Link>
          </div>
        </div>

        <HeroScrollIndicator />
      </section>

      {/* ── Featured Work ── */}
      <section className="bg-bg-light py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-dark/50 mb-3 block">
              Portfolio
            </span>
            <h2 className="font-bebas text-[clamp(3rem,7vw,6rem)] tracking-widest gradient-text">
              Selected Work
            </h2>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-secondary font-inter">Projects coming soon.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/work"
              className="btn-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide inline-block"
            >
              View All Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-bg-primary py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary mb-3 block">
              What I Do
            </span>
            <h2 className="font-bebas text-[clamp(3rem,7vw,6rem)] tracking-widest gradient-text">
              Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.categories.map((cat, i) => (
              <div
                key={cat.slug}
                className="bg-bg-card border border-bg-border rounded-xl p-6 group hover:border-accent-purple/50 transition-all duration-300 card-hover"
              >
                <div className="font-bebas text-4xl gradient-text mb-4">{cat.icon}</div>
                <h3 className="font-montserrat font-semibold text-white text-base mb-2">{cat.name}</h3>
                <p className="font-inter text-text-secondary text-sm leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="bg-bg-light py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-dark/50 mb-3 block">
              Toolkit
            </span>
            <h2 className="font-bebas text-[clamp(2.5rem,5vw,4rem)] tracking-widest gradient-text">
              Tools I Use
            </h2>
          </div>
        </div>
        <MarqueeTool tools={siteConfig.tools} />
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg-primary py-32 px-4 relative overflow-hidden">
        <GlowHalos />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-bebas text-[clamp(3rem,8vw,7rem)] leading-none tracking-widest gradient-text mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="font-inter text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Got a project in mind? Let&apos;s create something bold, strategic, and impossible to ignore.
          </p>
          <Link
            href="/contact"
            className="btn-gradient text-white font-montserrat font-semibold px-10 py-4 rounded-full text-base tracking-wide inline-block"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </>
  )
}
