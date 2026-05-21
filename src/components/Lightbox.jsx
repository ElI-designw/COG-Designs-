'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!images || images.length === 0) return null
  const image = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center lightbox-backdrop bg-black/90"
        onClick={onClose}
      >
        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl max-h-[85vh] w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <Image
              src={image.url}
              alt={image.altText || `Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 80vw"
            />
          </div>
          {image.altText && (
            <p className="text-center text-text-secondary font-inter text-sm mt-3 px-4">{image.altText}</p>
          )}
        </motion.div>

        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-bg-card/80 border border-bg-border rounded-full flex items-center justify-center text-white hover:bg-accent-purple/30 transition-colors"
              onClick={(e) => { e.stopPropagation(); onPrev() }}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-bg-card/80 border border-bg-border rounded-full flex items-center justify-center text-white hover:bg-accent-purple/30 transition-colors"
              onClick={(e) => { e.stopPropagation(); onNext() }}
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}

        {/* Close */}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-bg-card/80 border border-bg-border rounded-full flex items-center justify-center text-white hover:bg-accent-pink/30 transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          ✕
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-inter text-xs text-text-secondary bg-bg-card/80 px-3 py-1 rounded-full border border-bg-border">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
