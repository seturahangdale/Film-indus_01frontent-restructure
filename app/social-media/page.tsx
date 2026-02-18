'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Sparkles,
  Video,
  MapPin,
  Landmark,
  Church,
  Trees,
  Award,
  Target,
  Loader2,
  Globe
} from 'lucide-react'
import { apiClient } from '@/lib/api-client'

export default function SocialMediaPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const res = await apiClient.getSocialData()
        setData(res)
      } catch (error) {
        console.error('Failed to fetch social:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSocial()
  }, [])

  const contentSections = [
    {
      title: 'Cinematic Locations',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Forests, wildlife reserves, rivers, waterfalls, hills, and lakes',
        'Urban cityscapes and rural village settings',
        'Terrains for historical, contemporary, and fantasy narratives',
      ],
    },
    {
      title: 'Heritage & Palaces',
      icon: Landmark,
      color: 'from-purple-500 to-pink-500',
      items: [
        'Historic forts, palaces, stepwells, and monuments',
        'UNESCO World Heritage Sites',
        'Royal architecture for period and grand productions',
      ],
    },
    {
      title: 'Temples & Spiritual Destinations',
      icon: Church,
      color: 'from-amber-500 to-orange-500',
      items: [
        'Ancient temples and sacred sites',
        'Pilgrimage destinations with cultural depth',
        'Locations for mythological and devotional storytelling',
      ],
    },
    {
      title: 'Wildlife & Natural Reserves',
      icon: Trees,
      color: 'from-green-500 to-emerald-500',
      items: [
        'National parks and wildlife sanctuaries',
        'Eco-sensitive forest landscapes',
        'Shooting feasibility & permission guidelines',
      ],
    },
    {
      title: 'Film Subsidy & Government Support',
      icon: Award,
      color: 'from-red-500 to-rose-500',
      items: [
        'Film shooting subsidy policies',
        'Government incentives & reimbursements',
        'Single-window permission processes',
      ],
    },
  ]

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram
      case 'facebook': return Facebook
      case 'youtube': return Youtube
      case 'linkedin': return Linkedin
      case 'twitter': return Twitter
      default: return Globe
    }
  }

  const getColors = (platform: string) => {
    switch (platform) {
      case 'instagram': return { color: 'text-pink-600', gradient: 'from-pink-500 to-rose-500' }
      case 'facebook': return { color: 'text-blue-600', gradient: 'from-blue-500 to-blue-700' }
      case 'youtube': return { color: 'text-red-600', gradient: 'from-red-500 to-red-700' }
      case 'linkedin': return { color: 'text-blue-700', gradient: 'from-blue-600 to-blue-800' }
      case 'twitter': return { color: 'text-foreground', gradient: 'from-gray-700 to-black' }
      default: return { color: 'text-slate-600', gradient: 'from-slate-500 to-slate-700' }
    }
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
        <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">Loading Social Presence...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            >
              <Video className="w-8 h-8 text-white/30" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold tracking-wide uppercase">Digital Awareness Initiative</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
                Our Digital Awareness & Promotion Initiative
              </h1>
              <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto leading-relaxed font-light">
                FilmIndustryMP aims to create large-scale awareness about Madhya Pradesh
                as a premier filming destination through digital content, reels, and
                cinematic video storytelling.
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* YouTube Video Section */}
        {data.youtubeUrl && (
          <ScrollReveal>
            <motion.div
              className="relative -mt-16 mb-20 z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe
                  src={data.youtubeUrl}
                  title="Film Industry MP YouTube"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-500/10 via-indigo-500/10 to-slate-500/10 blur-2xl -z-10" />
            </motion.div>
          </ScrollReveal>
        )}

        {/* What We Promote Section */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-400 bg-clip-text text-transparent uppercase tracking-tight">
                What We Promote Through Digital Content
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Our content strategy focuses on showcasing every aspect that makes
                Madhya Pradesh a complete, film-friendly production ecosystem.
              </p>
            </div>
          </ScrollReveal>

          {/* Content Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {contentSections.map((section, index) => (
              <ScrollReveal key={section.title} delay={index * 0.1}>
                <motion.div
                  className="relative film-card p-8 overflow-hidden group"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${section.color} text-white mb-4`}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <section.icon className="w-7 h-7" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-foreground/70"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Objective & Vision Section */}
        <section className="relative mb-20 py-16 px-8 rounded-2xl bg-slate-100/50 border border-slate-200 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-2xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <ScrollReveal>
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Target className="w-16 h-16 text-blue-600" />
              </motion.div>

              <h3 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent uppercase tracking-wider">
                Our Objective & Vision
              </h3>
              <p className="text-lg text-foreground/80 mb-4 max-w-3xl mx-auto">
                Our objective is to position Madhya Pradesh as a preferred,
                repeat-choice filming destination and build producer confidence
                even before they arrive on ground.
              </p>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                FilmIndustryMP acts as a digital-first bridge between Madhya Pradesh
                and the global film industry — where creative vision meets
                professional execution.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Social Media Links */}
        <section className="mb-20">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent uppercase tracking-widest">
              Connect With Us
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.socialLinks.map((social: any, index: number) => {
              const Icon = getIcon(social.platform)
              const colors = getColors(social.platform)
              return (
                <ScrollReveal key={social.name} delay={index * 0.1}>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative film-card py-8 text-center overflow-hidden group h-full block"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                      className="relative z-10"
                    >
                      <Icon className={`w-12 h-12 mx-auto mb-3 ${colors.color}`} />
                    </motion.div>
                    <p className="font-semibold relative z-10">{social.name}</p>
                  </motion.a>
                </ScrollReveal>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
