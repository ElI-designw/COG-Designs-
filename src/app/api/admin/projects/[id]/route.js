import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { images: { orderBy: { order: 'asc' } } },
    })
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, category, tags, shortDescription, fullDescription, year, client, featured, published, images } = body

    const slug = slugify(title)

    // Delete existing images and recreate
    await prisma.projectImage.deleteMany({ where: { projectId: params.id } })

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        category,
        tags: tags || '',
        shortDescription,
        fullDescription: fullDescription || '',
        year: parseInt(year) || new Date().getFullYear(),
        client: client || '',
        featured: Boolean(featured),
        published: Boolean(published),
        images: images?.length
          ? { create: images.map((img, i) => ({ url: img.url, altText: img.altText || '', order: i })) }
          : undefined,
      },
      include: { images: true },
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.project.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
