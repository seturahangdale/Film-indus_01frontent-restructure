'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from './ui/button'
import { ScrollReveal } from './scroll-reveal'
import { ArrowRight, Loader2 } from 'lucide-react'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { getFileUrl } from '@/lib/utils'

/* ================= ABOUT PREVIEW ================= */

function AboutPreviewSection() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.getAboutData()
        setData(res)
      } catch (error) {
        console.error('Failed to fetch about data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading || !data) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-slate-200 border-t-accent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                {data.whoWeAre.title}
              </h2>

              {data.whoWeAre.paragraphs.map((para: string, i: number) => (
                <p key={i} className="text-lg text-foreground/70">
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">{data.whatWeDo.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-foreground/80">
                {data.whatWeDo.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}

/* ================= GALLERY PREVIEW (CLICKABLE) ================= */

function GalleryPreviewSection() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await apiClient.getGalleryData()
        setData(res)
      } catch (error) {
        console.error('Failed to fetch gallery data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  if (loading || !data) {
    return (
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-accent mb-4" />
          <p>Loading Cinematic Locations...</p>
        </div>
      </section>
    )
  }

  const categories = data.categories || []
  const items = data.items || []

  const getThumbnail = (cat: any) => {
    if (cat.thumbnail && cat.thumbnail.trim() !== '') return cat.thumbnail
    // Auto-pick first item from this category
    const firstItem = items.find((item: any) => item.category === cat.id)
    return firstItem?.src || '/images/Khajuraho Temple.jpg'
  }

  return (
    <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              TOP CINEMATIC LOCATIONS IN MADHYA PRADESH
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Madhya Pradesh offers one of India’s richest location libraries for filmmakers. Over {categories.length} distinct categories for every script and visual treatment.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((cat: any, index: number) => (
            <ScrollReveal key={cat.id} delay={index * 0.1}>
              <Link href={`/locations/${cat.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-48 md:h-56 rounded-2xl overflow-hidden cursor-pointer group shadow-lg bg-slate-800"
                >
                  <img
                    src={getFileUrl(getThumbnail(cat))}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-colors" />

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4">
                    <span className="text-4xl mb-3 block group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-center">
                      {cat.name}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ================= PROJECTS PREVIEW (HOME ONLY – 4 ITEMS) ================= */

function ProjectsPreviewSection() {
  const homeProjects = [
    { title: 'Bollywood Movie', slug: 'bollywood-movie' },
    { title: 'South Movies', slug: 'south-movies' },
    { title: 'International Movie', slug: 'international-movie' },
    { title: 'Movie Promotion', slug: 'movie-promotion' },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover film projects and productions supported by Film Industry MP
              across Madhya Pradesh.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {homeProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1}>
              <Link href={`/categories/${project.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="h-48 rounded-xl bg-gradient-to-br from-[#8B6B3E] to-[#2F5D2F] flex items-center justify-center text-center cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-2xl font-display font-bold text-white">
                    {project.title}
                  </h3>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Link href="/projects">
              <Button className="bg-primary text-white">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}

/* ================= EXPORTS ================= */

export {
  AboutPreviewSection,
  GalleryPreviewSection,
  ProjectsPreviewSection,
}
