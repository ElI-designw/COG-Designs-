'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableRow({ project, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-bg-border/50 hover:bg-bg-secondary/50 transition-colors"
    >
      <td className="px-4 py-3">
        <button
          {...attributes}
          {...listeners}
          className="text-text-secondary/40 hover:text-text-secondary cursor-grab active:cursor-grabbing p-1"
          aria-label="Drag to reorder"
        >
          ⠿
        </button>
      </td>
      <td className="px-4 py-3 font-inter text-sm text-white max-w-[180px] truncate">{project.title}</td>
      <td className="px-4 py-3 font-inter text-xs text-text-secondary hidden lg:table-cell">{project.category}</td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className={`font-montserrat text-xs px-2.5 py-1 rounded-full font-semibold ${
          project.published
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-bg-border text-text-secondary'
        }`}>
          {project.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        {project.featured && (
          <span className="font-montserrat text-xs px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
            Featured
          </span>
        )}
      </td>
      <td className="px-4 py-3 font-inter text-xs text-text-secondary hidden lg:table-cell">{project.views}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 justify-end">
          <Link
            href={`/project/${project.slug}`}
            target="_blank"
            className="font-montserrat text-xs text-text-secondary hover:text-white transition-colors px-2 py-1"
          >
            Preview
          </Link>
          <Link
            href={`/admin/projects/${project.id}/edit`}
            className="font-montserrat text-xs text-accent-purple hover:text-accent-pink transition-colors px-2 py-1"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(project.id, project.title)}
            className="font-montserrat text-xs text-text-secondary hover:text-red-400 transition-colors px-2 py-1"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminProjectsClient({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects)
  const router = useRouter()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  async function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = projects.findIndex((p) => p.id === active.id)
    const newIndex = projects.findIndex((p) => p.id === over.id)
    const reordered = arrayMove(projects, oldIndex, newIndex)

    setProjects(reordered)

    const items = reordered.map((p, i) => ({ id: p.id, order: i + 1 }))
    const res = await fetch('/api/admin/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })

    if (!res.ok) {
      toast.error('Failed to save order')
      setProjects(initialProjects)
    } else {
      toast.success('Order saved')
    }
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return

    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Project deleted')
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } else {
      toast.error('Failed to delete project')
    }
  }

  return (
    <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-bg-border">
              <th className="px-4 py-3 w-10" />
              <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-4 py-3">Title</th>
              <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-4 py-3 hidden lg:table-cell">Category</th>
              <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-4 py-3 hidden md:table-cell">Status</th>
              <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-4 py-3 hidden sm:table-cell">Featured</th>
              <th className="font-montserrat text-xs uppercase tracking-widest text-text-secondary text-left px-4 py-3 hidden lg:table-cell">Views</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <tbody>
                {projects.map((project) => (
                  <SortableRow key={project.id} project={project} onDelete={handleDelete} />
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center font-inter text-sm text-text-secondary">
                      No projects yet.{' '}
                      <Link href="/admin/projects/new" className="text-accent-purple hover:underline">
                        Create your first one.
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </SortableContext>
          </DndContext>
        </table>
      </div>
    </div>
  )
}
