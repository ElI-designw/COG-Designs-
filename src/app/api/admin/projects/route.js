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

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const projects = await prisma.project.findMany({
      include: { images: { orderBy: { order: 'asc' }, take: 1 } },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, category, tags, shortDescription, fullDescription, year, client, featured, published, images } = body

    const slug = slugify(title)

    // Get next order value
    const last = await prisma.project.findFirst({ orderBy: { order: 'desc' } })
    const order = (last?.order ?? 0) + 1

    const project = await prisma.project.create({
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
        order,
        images: images?.length
          ? { create: images.map((img, i) => ({ url: img.url, altText: img.altText || '', order: i })) }
          : undefined,
      },
      include: { images: true },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A project with this title already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
