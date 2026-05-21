import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = { title: { template: '%s | COG Admin', default: 'Admin' } }

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions)

  // Login page doesn't need sidebar
  return (
    <div className="min-h-screen bg-bg-primary">
      {session ? (
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 ml-64 min-h-screen p-8">{children}</main>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}
