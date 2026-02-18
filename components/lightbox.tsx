'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface LightboxProps {
  isOpen: boolean
  imageIndex: number
  images: Array<{
    src: string
    title: string
    category?: string
  }>
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export function Lightbox({
  isOpen,
  imageIndex,
  images,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const currentImage = images[imageIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-96 md:max-h-[70vh] flex flex-col"
          >
            {/* Image */}
            <div className="relative h-full w-full flex items-center justify-center bg-black/50 rounded-lg overflow-hidden">
              {currentImage && (
                <Image
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              )}
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-3 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-3 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/60 backdrop-blur text-white px-6 py-4 flex justify-between items-center rounded-b-lg"
            >
              <div>
                <h3 className="text-lg font-semibold">{currentImage?.title}</h3>
                {currentImage?.category && (
                  <p className="text-sm text-white/70">{currentImage.category}</p>
                )}
              </div>
              <span className="text-sm text-white/70">
                {imageIndex + 1} / {images.length}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
