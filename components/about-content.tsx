'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { CheckCircle, Target, Film, Sparkles, Zap, Loader2 } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

export function AboutContent() {
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

  const solutions = [
    { title: 'Line Producer Assignment', icon: '👥', color: 'from-blue-500 to-cyan-500' },
    { title: 'Location Scouting by Script', icon: '🎬', color: 'from-purple-500 to-pink-500' },
    { title: 'Government Coordination', icon: '🏛️', color: 'from-amber-500 to-orange-500' },
    { title: 'Casting & Local Talent', icon: '⭐', color: 'from-yellow-500 to-amber-500' },
    { title: 'Vendors & Production Crew', icon: '🔧', color: 'from-green-500 to-emerald-500' },
    { title: 'On-Ground Execution Support', icon: '📋', color: 'from-red-500 to-rose-500' },
  ]

  const advantages = [
    { title: 'Single-Window Professional Facilitation', description: 'One centralized platform for permissions, subsidies, locations, and execution — eliminating confusion, delays, and dependency on multiple intermediaries.' },
    { title: 'Verified Line Producers & Teams', description: 'We work only with experienced and vetted line producers and production professionals who understand large-scale film workflows and industry standards.' },
    { title: 'Policy-Aligned Execution', description: 'Deep understanding of Madhya Pradesh film policies ensures smooth permissions, accurate subsidy guidance, and full compliance.' },
    { title: 'Script-Driven Location Expertise', description: 'Locations are suggested and finalized based on script requirements, visual treatment, budget, and logistics — not guesswork.' },
    { title: 'Strong Government Coordination', description: 'Established coordination with Film Tourism MP and local authorities for faster approvals and smooth on-ground operations.' },
    { title: 'Reliable Vendor & Resource Network', description: 'Access to vetted vendors, equipment, artists, technicians, and services across Madhya Pradesh with proven reliability' },
    { title: 'End-to-End Accountability', description: 'From pre-production to final wrap-up, FilmIndustryMP remains responsible for execution quality, timelines, and coordination.' },
    { title: 'Proven Focus on Repeat Productions', description: 'Our system is designed to build long-term trust so producers confidently return to Madhya Pradesh for future projects.' },
    { title: 'Vision Beyond One Project', description: 'We work with a long-term goal — positioning Madhya Pradesh as a consistent, film-friendly, and globally competitive production destination.' },
  ]

  if (loading || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
        <p className="text-muted-foreground animate-pulse font-medium tracking-widest uppercase text-sm">Preparing Our Story</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#3E2723] via-[#5D4037] to-[#6D4C41] text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-semibold">Transforming Film Production</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 text-balance bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Transforming Madhya Pradesh Into a Global Filming Hub
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                Our mission is to bridge the trust and execution gap in film production
              </p>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" className="w-full h-16 fill-background">
            <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background via-red-50/10 dark:via-red-950/20 to-background overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-10 right-10 w-64 h-64"
          >
            <Film className="w-full h-full text-red-600" />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal>
              <div>
                <motion.h2
                  className="text-4xl md:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                >
                  The Problem
                </motion.h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Over the years, Madhya Pradesh has attracted filmmakers from across India and abroad due to its diverse natural landscapes, rich heritage locations, and cost-effective production environment. However, a recurring challenge has been consistently observed in large-scale film productions shot in the state.

                  Despite a successful first experience, many production houses do not return for subsequent projects. The primary reason is the involvement of unqualified intermediaries and informal local contacts who lack professional film production and line production experience.

                  These intermediaries often have limited understanding of:
                </p>
                <div className="space-y-4">
                  {[
                    '1. Structured film production workflows',
                    '2. Government permissions, policies, and subsidy framework',
                    '3. Professional line production standards',
                    '4. Vendor management, casting coordination, and location logistics',
                  ].map((problem, i) => (
                    <motion.div
                      key={problem}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Zap className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                      <p className="text-foreground/70">{problem}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <motion.div
                className="relative bg-gradient-to-br from-red-500/10 via-orange-500/10 to-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 md:p-10"
                whileHover={{ scale: 1.02, borderColor: 'rgba(239, 68, 68, 0.5)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-500 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-orange-500 rounded-br-2xl" />

                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  The Result
                </h3>
                <p className="text-lg text-foreground/70">
                  As a result, production houses—from Bollywood and regional cinema to OTT platforms and international studios—face delays, budget overruns, compliance issues, and operational inefficiencies. Such experiences create uncertainty and discourage repeat filming in Madhya Pradesh.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Objective */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-blue-950/20 overflow-hidden">
        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                {data.whoWeAre.title}
              </motion.h2>
              <div className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed space-y-6">
                {data.whoWeAre.paragraphs.map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Solution */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-purple-50/10 dark:to-purple-950/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {data.whatWeDo.title}
            </h2>
          </ScrollReveal>
          <p className="text-2xl text-foreground/70 leading-relaxed mb-16 text-center max-w-4xl mx-auto">
            FilmIndustryMP functions as a professional point of contact and execution partner for production houses from India and around the world seeking to shoot in Madhya Pradesh.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.whatWeDo.items.map((item: string, index: number) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="relative film-card p-8 text-center overflow-hidden group h-full flex flex-col items-center justify-center"
                >
                  {/* Use a default cinematic icon or cycle through colors/icons if needed, but for now title is dynamic */}
                  <div className="text-7xl mb-4 relative z-10">
                    {index === 0 ? '👥' : index === 1 ? '🎬' : index === 2 ? '🏛️' : index === 3 ? '⭐' : index === 4 ? '🔧' : '📋'}
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground relative z-10">
                    {item}
                  </h3>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#2F5D2F] via-[#3d7a3d] to-[#2F5D2F] text-white overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
              Why Film Industry MP?
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {advantages.map((advantage, index) => (
              <ScrollReveal key={advantage.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 12, scale: 1.02 }}
                  className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">
                      {advantage.title}
                    </h3>
                    <p className="opacity-90">{advantage.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-amber-950/20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 blur-2xl"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-orange-400/20 to-red-400/20 blur-2xl"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center space-y-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Target className="w-20 h-20 mx-auto text-amber-600" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Our Long Term Vision
              </h2>
              <p className="text-2xl text-foreground/70 leading-relaxed">
                Our mission extends beyond facilitating individual film shoots.

                FilmIndustryMP aims to build long-term confidence, encouraging production houses to repeatedly choose Madhya Pradesh for feature films, web series, OTT content, television shows, commercials, and international productions.

                Through professionalism, transparency, and institutional trust, we are committed to positioning Madhya Pradesh as a film-friendly, dependable, and globally competitive production destination.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
