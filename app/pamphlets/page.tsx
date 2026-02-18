'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { apiClient } from '@/lib/api-client'
import { Sparkles, FileText } from 'lucide-react'
import Image from 'next/image'

interface Document {
  id: number
  title: string
  buttonLabel: string
  filepath: string
  filesize: number
}

export default function PamphletsPage() {
  const [pamphlets, setPamphlets] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPamphlets = async () => {
      try {
        const { documents } = await apiClient.getAllDocuments('pamphlet')
        setPamphlets(documents)
      } catch (error) {
        console.error('Failed to fetch pamphlets:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPamphlets()
  }, [])

  return (
    <main className="min-h-screen pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#8B6B3E] via-[#A0826D] to-[#8B6B3E] text-white overflow-hidden">
        {/* Animated background icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 5 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            >
              <FileText className="w-10 h-10 text-white/20" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold">Information Resources</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Pamphlets & Brochures
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                Download our informational pamphlets about filming in Madhya Pradesh
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" className="w-full h-16 fill-background">
            <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Pamphlets Grid */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[#8B6B3E] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">Loading pamphlets...</p>
            </div>
          ) : pamphlets.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600">No pamphlets available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pamphlets.map((pamphlet, index) => (
                <ScrollReveal key={pamphlet.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="film-card overflow-hidden bg-white shadow-md border border-gray-100"
                  >
                    <div className="relative h-80 bg-gray-100">
                      <Image
                        src={pamphlet.filepath}
                        alt={pamphlet.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">{pamphlet.title}</h3>
                      <a
                        href={pamphlet.filepath}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-[#8B6B3E] to-[#B8860B] text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
                      >
                        {pamphlet.buttonLabel}
                      </a>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
