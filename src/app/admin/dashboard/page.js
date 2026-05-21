import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/config/siteConfig'

export const metadata = { title: 'Dashboard' }

async function getStats() {
  try {
    const [total, published, featured, views, recent, categoryCounts] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { published: true } }),
      prisma.project.count({ where: { featured: true } }),
      prisma.project.aggregate({ _sum: { views: true } }),
      prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { images: { orderBy: { order: 'asc' }, take: 1 } },
      }),
      Promise.all(
        siteConfig.categories.map(async (cat) => ({
          name: cat.name,
          count: await prisma.project.count({ where: { category: cat.name } }),
        }))
      ),
    ])
    return { total, published, featured, totalViews: views._sum.views || 0, recent, categoryCounts }
  } catch {
    return { total: 0, published: 0, featured: 0, totalViews: 0, recent: [], categoryCounts: [] }
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const stats = await getStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bebas text-4xl tracking-widest gradient-text">Dashboard</h1>
        <p className="font-inter text-text-secondary text-sm mt-1">
          Welcome back, {session.user?.email}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: stats.total, icon: '⬡' },
          { label: 'Published', value: stats.published, icon: '◈' },
          { label: 'Featured', value: stats.featured, icon: '★' },
          { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: '◎' },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-card border border-bg-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-montserrat text-xs uppercase tracking-widest text-text-secondary">
                {stat.label}
              </span>
              <span className="text-xl gradient-text">{stat.icon}</span>
            </div>
            <p className="font-bebas text-4xl tracking-wide gradient-text">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Per-category counts */}
      <div>
        <h2 className="font-montserrat font-semibold text-sm uppercase tracking-widest text-text-secondary mb-4">
          By Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.categoryCounts.map((cat) => (
            <div key={cat.name} className="bg-bg-card border border-bg-border rounded-xl p-4">
              <p className="font-montserrat text-xs text-text-secondary mb-1 truncate">{cat.name}</p>
              <p className="font-bebas text-3xl gradient-text">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-montserrat font-semibold text-sm uppercase tracking-widest text-text-secondary">
            Recent Projects
          </h2>
          <Link href="/admin/projects" className="font-inter text-xs text-accent-purple hover:text-accent-pink transition-colors">
            View all →
          </Link>
        </div>
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bg-border">
                <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-5 py-3">Title</th>
                <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-5 py-3 hidden md:table-cell">Category</th>
                <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-5 py-3">Status</th>
                <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-5 py-3 hidden sm:table-cell">Views</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((p) => (
                <tr key={p.id} className="border-b border-bg-border/50 hover:bg-bg-secondary/50 transition-colors">
                  <td className="px-5 py-3 font-inter text-sm text-white max-w-[200px] truncate">{p.title}</td>
                  <td className="px-5 py-3 font-inter text-xs text-text-secondary hidden md:table-cell">{p.category}</td>
                  <td className="px-5 py-3">
                    <span className={`font-montserrat text-xs px-2.5 py-1 rounded-full font-semibold ${
                      p.published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-bg-border text-text-secondary border border-bg-border'
                    }`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-inter text-sm text-text-secondary hidden sm:table-cell">{p.views}</td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="font-montserrat text-xs text-accent-purple hover:text-accent-pink transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {stats.recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center font-inter text-sm text-text-secondary">
                    No projects yet.{' '}
                    <Link href="/admin/projects/new" className="text-accent-purple hover:underline">
                      Create your first one.
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-4">
        <Link
          href="/admin/projects/new"
          className="btn-gradient text-white font-montserrat font-semibold px-6 py-3 rounded-full text-sm"
        >
          + New Project
        </Link>
        <Link
          href="/admin/projects"
          className="border border-bg-border text-text-secondary font-montserrat font-semibold px-6 py-3 rounded-full text-sm hover:text-white hover:border-text-secondary/50 transition-all"
        >
          Manage Projects
        </Link>
      </div>
    </div>
  )
}
