'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { Lightbox } from './lightbox'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Sparkles, Image as ImageIcon } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

interface GalleryItem {
  id: string
  title: string
  category: string
  description: string
  src: string
  tags: string[]
}

interface Category {
  id: string
  name: string
  color: string
  icon: string
  description?: string
}

export function GalleryContent() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getGalleryData()
        setItems(data.items || [])
        setCategories(data.categories || [])
      } catch (error) {
        console.error('Failed to fetch gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const handlePrevious = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    )
  }

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)

  return (
    <main className="min-h-screen pt-20 overflow-hidden bg-white dark:bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden">
        {/* Deep mesh gradient background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <motion.div
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-bold tracking-widest uppercase text-teal-100">Cinematic Locations</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">
              Location <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A curated collection of Madhya Pradesh's most picturesque filming destinations, from ancient ruins to natural wonders.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 py-8 bg-white/80 dark:bg-background/80 backdrop-blur-xl border-b border-slate-100 dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              onClick={() => setSelectedCategory(null)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${selectedCategory === null
                ? 'bg-slate-900 dark:bg-card text-white shadow-xl shadow-slate-200 dark:shadow-none'
                : 'bg-slate-50 dark:bg-muted text-slate-500 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-muted/80'
                }`}
            >
              All Locations
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-xl shadow-blue-100 dark:shadow-none rotate-0`
                  : 'bg-slate-50 dark:bg-muted text-slate-500 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-muted/80'
                  }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Category Info */}
      <AnimatePresence mode="wait">
        {selectedCategoryData && (
          <motion.section
            key={selectedCategoryData.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-50/50 dark:bg-muted/10"
          >
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-6"
              >
                {selectedCategoryData.icon}
              </motion.div>
              <h2 className="text-4xl font-display font-bold mb-6 text-slate-900 dark:text-foreground">
                {selectedCategoryData.name} Exploration
              </h2>
              <p className="text-lg text-slate-600 dark:text-muted-foreground leading-relaxed mb-0">
                {selectedCategoryData.description || `Discover the exceptional ${selectedCategoryData.name.toLowerCase()} locations across MP.`}
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-6" />
              <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">Initializing Gallery</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 dark:bg-muted/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-border">
              <div className="w-20 h-20 bg-white dark:bg-card rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-10 h-10 text-slate-300 dark:text-muted" />
              </div>
              <h3 className="text-2xl font-bold text-slate-400 dark:text-muted-foreground">No Captures Found</h3>
              <p className="text-slate-400 dark:text-muted-foreground/60 mt-2">Try selecting another category or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <div
                      className="relative h-[550px] rounded-[3rem] overflow-hidden cursor-pointer bg-slate-100 dark:bg-muted shadow-2xl shadow-slate-200/50 dark:shadow-none"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Subtle Vignette on hover */}
                      <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-500" />

                      {/* Top Info Tag */}
                      <div className="absolute top-8 left-8 flex gap-2">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em] text-white">
                          {item.category}
                        </div>
                      </div>

                      {/* Right Pin Accent */}
                      <div className="absolute top-8 right-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Floating Title Card */}
                      <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                        <motion.div
                          className="bg-white/40 dark:bg-card/40 backdrop-blur-2xl border border-white/40 dark:border-border p-6 rounded-[2rem] shadow-2xl transition-all duration-500 group-hover:bg-white dark:group-hover:bg-card group-hover:translate-y-[-10px] group-hover:scale-[1.02]"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-foreground truncate pr-4">
                              {item.title}
                            </h3>
                            <div className="text-slate-400 group-hover:text-teal-500 transition-colors">
                              <Sparkles className="w-5 h-5" />
                            </div>
                          </div>

                          {/* Reveal description only on hover */}
                          <div className="h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 transform origin-top scale-y-0 group-hover:scale-y-100 mt-0 group-hover:mt-3">
                            <p className="text-sm text-slate-500 dark:text-muted-foreground leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          isOpen={lightboxOpen}
          images={filteredItems}
          imageIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </main>
  )
}
