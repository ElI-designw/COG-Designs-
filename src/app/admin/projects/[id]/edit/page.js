import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProjectForm from '@/components/admin/ProjectForm'

export const metadata = { title: 'Edit Project' }

export default async function EditProjectPage({ params }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { order: 'asc' } } },
  })

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bebas text-4xl tracking-widest gradient-text">Edit Project</h1>
        <p className="font-inter text-text-secondary text-sm mt-1">{project.title}</p>
      </div>
      <ProjectForm project={JSON.parse(JSON.stringify(project))} />
    </div>
  )
}
