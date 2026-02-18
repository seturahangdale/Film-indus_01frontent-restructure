'use client'

import { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Film } from 'lucide-react'

const showreelImages = [
  '/showreel/download.jpg',
  '/showreel/download (3).jpg',
  '/showreel/download (5).jpg',
  '/showreel/download (6).jpg',
  '/showreel/download (7).jpg',
  '/showreel/satyagraha.jpg',
  '/showreel/Sanju.jpg',
  '/showreel/Yamla Pagla Deewana.jpg',
  '/showreel/bhopal.jpg',
  '/showreel/peepli.jpg',
  '/showreel/Single.jpg',
  '/showreel/yaara.jpg',
  '/showreel/sui dhaaga .jpg',
  '/showreel/Mohenjo Daro.jpg',
  '/showreel/Fraud Saiyaan.jpg',
]

export function SubsidySection() {
  const [index, setIndex] = useState(0)

  const prev = () =>
    setIndex((i) => (i === 0 ? showreelImages.length - 1 : i - 1))

  const next = () =>
    setIndex((i) => (i + 1) % showreelImages.length)

  const prevIndex =
    index === 0 ? showreelImages.length - 1 : index - 1
  const nextIndex =
    (index + 1) % showreelImages.length

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prev()
    } else if (info.offset.x < -threshold) {
      next()
    }
  }

  return (
    <section className="relative pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 bg-gradient-to-b from-background via-amber-50/10 dark:via-amber-950/20 to-background overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated film strip pattern */}
        <motion.div
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-600/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-600/20 to-transparent"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating film elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <Film className="w-full h-full text-amber-700" />
          </motion.div>
        ))}
      </div>

      {/* Header with subtitle */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
            Showreel
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
            Celebrating cinematic excellence across Madhya Pradesh
          </p>
        </motion.div>
      </div>


      {/* Carousel Section */}
      <motion.div
        className="relative max-w-7xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative flex items-center justify-center gap-4 md:gap-6 lg:gap-10 px-4">

          {/* LEFT IMAGE (BLUR) - Hidden on mobile/tablet */}
          <motion.div
            className="hidden xl:block relative"
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.img
              key={prevIndex}
              src={showreelImages[prevIndex]}
              className="w-[200px] h-[280px] lg:w-[240px] lg:h-[340px] xl:w-[280px] xl:h-[380px] object-cover rounded-xl blur-sm opacity-40"
              alt="Previous showreel image"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* LEFT ARROW */}
          <motion.button
            onClick={prev}
            className="absolute left-2 sm:left-4 md:left-6 lg:left-8 xl:left-4 z-20 p-2 sm:p-2.5 md:p-3 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all touch-manipulation"
            aria-label="Previous image"
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.button>

          {/* CENTER IMAGE - Swipeable on mobile */}
          <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] md:w-[420px] md:h-[520px] lg:w-[480px] lg:h-[560px] xl:w-[520px] xl:h-[600px] rounded-2xl bg-gradient-to-br from-amber-900 to-orange-900 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Decorative border */}
            <div className="absolute inset-0 rounded-2xl border-4 border-amber-400/30" />

            <AnimatePresence mode="wait">
              <motion.img
                key={showreelImages[index]}
                src={showreelImages[index]}
                alt={`Showreel image ${index + 1}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing select-none"
              />
            </AnimatePresence>

            {/* Image counter */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {index + 1} / {showreelImages.length}
            </motion.div>
          </div>

          {/* RIGHT ARROW */}
          <motion.button
            onClick={next}
            className="absolute right-2 sm:right-4 md:right-6 lg:right-8 xl:right-4 z-20 p-2 sm:p-2.5 md:p-3 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all touch-manipulation"
            aria-label="Next image"
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.button>

          {/* RIGHT IMAGE (BLUR) - Hidden on mobile/tablet */}
          <motion.div
            className="hidden xl:block relative"
            animate={{ x: [5, -5, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.img
              key={nextIndex}
              src={showreelImages[nextIndex]}
              className="w-[200px] h-[280px] lg:w-[240px] lg:h-[340px] xl:w-[280px] xl:h-[380px] object-cover rounded-xl blur-sm opacity-40"
              alt="Next showreel image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Pagination dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {showreelImages.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 w-8'
                : 'bg-gray-300 dark:bg-zinc-800 w-2'
                }`}
              aria-label={`Go to image ${i + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom decorative text */}
      <motion.div
        className="relative z-10 text-center mt-12 sm:mt-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-base sm:text-lg text-foreground/60 italic">
          "Where stories come to life in the heart of India"
        </p>
      </motion.div>
    </section>
  )
}
