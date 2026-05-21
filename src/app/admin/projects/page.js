import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminProjectsClient from './AdminProjectsClient'

export const metadata = { title: 'Projects' }

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const projects = await prisma.project.findMany({
    include: { images: { orderBy: { order: 'asc' }, take: 1 } },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bebas text-4xl tracking-widest gradient-text">Projects</h1>
          <p className="font-inter text-text-secondary text-sm mt-1">{projects.length} total</p>
        </div>
        <a
          href="/admin/projects/new"
          className="btn-gradient text-white font-montserrat font-semibold px-5 py-2.5 rounded-full text-sm"
        >
          + New Project
        </a>
      </div>
      <AdminProjectsClient initialProjects={projects} />
    </div>
  )
}
