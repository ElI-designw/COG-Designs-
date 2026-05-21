import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  try {
    const where = { published: true }
    if (category && category !== 'All') where.category = category

    const projects = await prisma.project.findMany({
      where,
      include: { images: { orderBy: { order: 'asc' }, take: 1 } },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
