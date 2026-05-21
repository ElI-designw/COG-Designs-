import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import GlowHalos from '@/components/GlowHalos'
import ProjectGallery from './ProjectGallery'

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.images[0] ? [{ url: project.images[0].url }] : [],
    },
  }
}

async function getProject(slug) {
  try {
    return await prisma.project.findUnique({
      where: { slug, published: true },
      include: { images: { orderBy: { order: 'asc' } } },
    })
  } catch {
    return null
  }
}

async function getNextProject(currentOrder) {
  try {
    return await prisma.project.findFirst({
      where: { published: true, order: { gt: currentOrder } },
      include: { images: { orderBy: { order: 'asc' }, take: 1 } },
      orderBy: { order: 'asc' },
    })
  } catch {
    return null
  }
}

async function incrementViews(id) {
  try {
    await prisma.project.update({ where: { id }, data: { views: { increment: 1 } } })
  } catch {}
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  await incrementViews(project.id)
  const nextProject = await getNextProject(project.order)

  const coverImage = project.images[0]
  const tags = project.tags ? project.tags.split(',').map((t) => t.trim()).filter(Boolean) : []

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-bg-primary overflow-hidden">
        <GlowHalos />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Category badge */}
          <span className="btn-gradient text-white font-montserrat font-semibold text-xs px-4 py-1.5 rounded-full inline-block mb-6">
            {project.category}
          </span>
          <h1 className="font-bebas text-[clamp(3rem,10vw,8rem)] leading-none tracking-widest gradient-text mb-4">
            {project.title}
          </h1>
          {/* Meta row */}
          <div className="flex flex-wrap gap-4 justify-center font-inter text-sm text-text-secondary">
            <span>{project.year}</span>
            {project.client && <><span className="text-bg-border">|</span><span>{project.client}</span></>}
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-montserrat text-xs border border-bg-border text-text-secondary px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cover image */}
      {coverImage && (
        <div className="relative w-full aspect-video bg-bg-secondary">
          <Image
            src={coverImage.url}
            alt={coverImage.altText || project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Description — dark */}
      <section className="bg-bg-primary py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bebas text-4xl tracking-widest gradient-text mb-6">About the Project</h2>
          <p className="font-inter text-text-secondary leading-relaxed text-lg">
            {project.shortDescription}
          </p>
          {project.fullDescription && (
            <p className="font-inter text-text-secondary leading-relaxed mt-4">
              {project.fullDescription}
            </p>
          )}
        </div>
      </section>

      {/* Gallery — light */}
      {project.images.length > 0 && (
        <section className="bg-bg-light py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bebas text-4xl tracking-widest gradient-text mb-10">Gallery</h2>
            <ProjectGallery images={project.images} />
          </div>
        </section>
      )}

      {/* Next project */}
      {nextProject && (
        <section className="bg-bg-primary py-20 px-4 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)',
            }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <p className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-2">Next Project</p>
            <h3 className="font-bebas text-5xl tracking-widest gradient-text mb-6">{nextProject.title}</h3>
            <Link
              href={`/project/${nextProject.slug}`}
              className="btn-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide inline-block"
            >
              View Project →
            </Link>
          </div>
        </section>
      )}

      {/* Back to work */}
      <div className="bg-bg-primary pb-12 text-center">
        <Link href="/work" className="font-inter text-sm text-text-secondary hover:text-white transition-colors">
          ← Back to All Work
        </Link>
      </div>
    </>
  )
}
