import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { items } = await request.json()
    // items: [{ id, order }, ...]

    await Promise.all(
      items.map(({ id, order }) =>
        prisma.project.update({ where: { id }, data: { order } })
      )
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 })
  }
}
