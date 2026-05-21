'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { siteConfig } from '@/config/siteConfig'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function ProjectForm({ project }) {
  const isEdit = Boolean(project)
  const router = useRouter()

  const [form, setForm] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    category: project?.category || siteConfig.categories[0].name,
    tags: project?.tags || '',
    shortDescription: project?.shortDescription || '',
    fullDescription: project?.fullDescription || '',
    year: project?.year || new Date().getFullYear(),
    client: project?.client || '',
    featured: project?.featured || false,
    published: project?.published || false,
  })

  const [images, setImages] = useState(project?.images || [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value }
      if (name === 'title' && !isEdit) updated.slug = slugify(value)
      return updated
    })
  }

  async function uploadFiles(files) {
    if (!files || files.length === 0) return
    setUploading(true)

    const fd = new FormData()
    Array.from(files).forEach((f) => fd.append('files', f))

    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { files: uploaded } = await res.json()
      setImages((prev) => [...prev, ...uploaded])
      toast.success(`${uploaded.length} image(s) uploaded`)
    } else {
      toast.error('Upload failed')
    }
    setUploading(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    uploadFiles(e.dataTransfer.files)
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.shortDescription) {
      toast.error('Title and short description are required.')
      return
    }
    setSaving(true)

    const payload = { ...form, images }
    const url = isEdit ? `/api/admin/projects/${project.id}` : '/api/admin/projects'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSaving(false)

    if (res.ok) {
      toast.success(isEdit ? 'Project updated!' : 'Project created!')
      router.push('/admin/projects')
      router.refresh()
    } else {
      const err = await res.json()
      toast.error(err.error || 'Save failed')
    }
  }

  const inputClass =
    'w-full bg-bg-primary border border-bg-border text-white font-inter text-sm px-4 py-3 rounded-xl outline-none transition-all duration-200 focus:border-accent-purple/70 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)] placeholder:text-text-secondary/50'

  const labelClass = 'font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1.5 block'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Basic info */}
      <section className="bg-bg-card border border-bg-border rounded-xl p-6 space-y-5">
        <h2 className="font-montserrat font-semibold text-white text-sm uppercase tracking-widest">Basic Info</h2>

        <div>
          <label className={labelClass}>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required placeholder="Project title" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated-from-title" className={inputClass} />
          <p className="font-inter text-xs text-text-secondary mt-1">URL: /project/{form.slug || '...'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              {siteConfig.categories.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Year</label>
            <input type="number" name="year" value={form.year} onChange={handleChange} min="2000" max="2099" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Client</label>
          <input name="client" value={form.client} onChange={handleChange} placeholder="Client name (optional)" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="logo, branding, identity" className={inputClass} />
        </div>
      </section>

      {/* Descriptions */}
      <section className="bg-bg-card border border-bg-border rounded-xl p-6 space-y-5">
        <h2 className="font-montserrat font-semibold text-white text-sm uppercase tracking-widest">Descriptions</h2>

        <div>
          <label className={labelClass}>Short Description * <span className="normal-case text-text-secondary/60">(shown on cards)</span></label>
          <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} required rows={3} placeholder="One or two sentences about the project..." className={`${inputClass} resize-none`} />
        </div>

        <div>
          <label className={labelClass}>Full Description <span className="normal-case text-text-secondary/60">(project page)</span></label>
          <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} rows={6} placeholder="The full story behind this project..." className={`${inputClass} resize-none`} />
        </div>
      </section>

      {/* Images */}
      <section className="bg-bg-card border border-bg-border rounded-xl p-6 space-y-5">
        <h2 className="font-montserrat font-semibold text-white text-sm uppercase tracking-widest">Images</h2>
        <p className="font-inter text-xs text-text-secondary">First image becomes the cover thumbnail.</p>

        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragOver ? 'border-accent-purple bg-accent-purple/5' : 'border-bg-border hover:border-text-secondary/40'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => uploadFiles(e.target.files)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="pointer-events-none">
            <p className="font-montserrat text-sm text-text-secondary mb-1">
              {uploading ? 'Uploading...' : 'Drag & drop images or click to browse'}
            </p>
            <p className="font-inter text-xs text-text-secondary/50">JPG, PNG, WebP, GIF</p>
          </div>
        </div>

        {/* Image grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group aspect-[4/3] rounded-lg overflow-hidden bg-bg-secondary border border-bg-border">
                <Image src={img.url} alt={img.altText || `Image ${i + 1}`} fill className="object-cover" sizes="150px" />
                {i === 0 && (
                  <div className="absolute top-1 left-1 bg-accent-purple text-white font-montserrat text-[10px] px-1.5 py-0.5 rounded">
                    Cover
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Settings */}
      <section className="bg-bg-card border border-bg-border rounded-xl p-6 space-y-4">
        <h2 className="font-montserrat font-semibold text-white text-sm uppercase tracking-widest">Settings</h2>

        {[
          { name: 'featured', label: 'Featured', description: 'Show on homepage featured section' },
          { name: 'published', label: 'Published', description: 'Make visible on the public site' },
        ].map((opt) => (
          <label key={opt.name} className="flex items-center gap-4 cursor-pointer group">
            <div className="relative">
              <input type="checkbox" name={opt.name} checked={form[opt.name]} onChange={handleChange} className="sr-only" />
              <div className={`w-10 h-6 rounded-full transition-all ${form[opt.name] ? 'bg-accent-purple' : 'bg-bg-border'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form[opt.name] ? 'left-5' : 'left-1'}`} />
              </div>
            </div>
            <div>
              <p className="font-montserrat text-sm font-semibold text-white">{opt.label}</p>
              <p className="font-inter text-xs text-text-secondary">{opt.description}</p>
            </div>
          </label>
        ))}
      </section>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="btn-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm disabled:opacity-60"
        >
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Project'}
        </button>
        <a href="/admin/projects" className="font-montserrat text-sm text-text-secondary hover:text-white transition-colors">
          Cancel
        </a>
      </div>
    </form>
  )
}
