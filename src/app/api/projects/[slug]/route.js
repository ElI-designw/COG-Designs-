import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug, published: true },
      include: { images: { orderBy: { order: 'asc' } } },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Increment views
    await prisma.project.update({
      where: { id: project.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}
