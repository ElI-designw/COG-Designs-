'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index = 0 }) {
  const coverImage = project.images?.[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/project/${project.slug}`} className="group block">
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden card-hover relative">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {coverImage ? (
              <Image
                src={coverImage.url}
                alt={coverImage.altText || project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-bg-secondary flex items-center justify-center">
                <span className="text-text-secondary/30 font-bebas text-4xl tracking-widest">
                  COG
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/50 transition-all duration-300" />

            {/* Category pill */}
            <div className="absolute top-3 left-3">
              <span className="btn-gradient text-white font-montserrat font-semibold text-xs px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>

            {/* Title overlay on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bebas text-xl tracking-wide text-white">{project.title}</h3>
              <p className="font-inter text-xs text-text-secondary mt-1 line-clamp-2">
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Card footer */}
          <div className="p-4">
            <h3 className="font-montserrat font-semibold text-sm text-white group-hover:gradient-text transition-all duration-300 truncate">
              {project.title}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="font-inter text-xs text-text-secondary">{project.year}</span>
              {project.client && (
                <span className="font-inter text-xs text-text-secondary truncate ml-2 max-w-[140px]">
                  {project.client}
                </span>
              )}
            </div>
          </div>

          {/* Gradient glow border on hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gradient-border" />
        </div>
      </Link>
    </motion.div>
  )
}
