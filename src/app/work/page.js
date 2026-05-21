import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/config/siteConfig'
import GlowHalos from '@/components/GlowHalos'
import WorkClientPage from './WorkClientPage'

export const metadata = {
  title: 'Work',
  description: 'Browse the complete portfolio of COG Designs — branding, print, motion graphics, and social media design.',
}

async function getProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      include: { images: { orderBy: { order: 'asc' }, take: 1 } },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-bg-primary overflow-hidden">
        <GlowHalos />
        <div className="relative z-10 text-center px-4">
          <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary mb-4 block">
            Portfolio
          </span>
          <h1 className="font-bebas text-[clamp(4rem,12vw,10rem)] leading-none tracking-widest gradient-text">
            My Work
          </h1>
          <p className="font-inter text-text-secondary mt-4 max-w-xl mx-auto">
            A collection of brand identities, print design, motion graphics, and social media work
            — each one crafted to make an impact.
          </p>
        </div>
      </section>

      {/* Filter + Grid (client component) */}
      <WorkClientPage projects={projects} categories={siteConfig.categories} />
    </>
  )
}
