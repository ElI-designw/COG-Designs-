'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'

export default function ProjectGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-secondary border border-bg-border hover:border-accent-purple/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-purple"
          >
            <Image
              src={img.url}
              alt={img.altText || `Gallery image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/30 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-montserrat text-xs uppercase tracking-widest bg-bg-primary/60 px-3 py-1 rounded-full">
                Expand
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
          onNext={() => setLightboxIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
        />
      )}
    </>
  )
}
