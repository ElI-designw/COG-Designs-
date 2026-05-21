import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'

export const metadata = { title: 'New Project' }

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bebas text-4xl tracking-widest gradient-text">New Project</h1>
        <p className="font-inter text-text-secondary text-sm mt-1">Fill in the details below to add a new project.</p>
      </div>
      <ProjectForm />
    </div>
  )
}
