'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'

const PER_PAGE = 9

export default function WorkClientPage({ projects, categories }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleCategoryChange(cat) {
    setActiveCategory(cat)
    setPage(1)
  }

  return (
    <section className="bg-bg-primary pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-14">
          {['All', ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`font-montserrat font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? 'btn-gradient text-white'
                  : 'border border-bg-border text-text-secondary hover:text-white hover:border-text-secondary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-text-secondary font-inter">No projects in this category yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-14">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className={`w-10 h-10 rounded-full font-montserrat font-semibold text-sm transition-all ${
                  p === page
                    ? 'btn-gradient text-white'
                    : 'border border-bg-border text-text-secondary hover:border-text-secondary/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
