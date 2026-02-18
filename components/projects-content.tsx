'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import {
  Megaphone,
  Users,
  Star,
  MapPin,
  Tv,
  Mic2,
  Ticket,
  ShieldCheck,
  Handshake,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Building2,
  GraduationCap
} from 'lucide-react'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { Loader2 } from 'lucide-react'

export function ProjectsContent() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.getPromotionData()
        setData(res)
      } catch (error) {
        console.error('Failed to fetch promotion data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getServiceIcon = (title: string) => {
    if (title.toLowerCase().includes('press')) return Tv
    if (title.toLowerCase().includes('mall')) return Megaphone
    if (title.toLowerCase().includes('college')) return GraduationCap
    if (title.toLowerCase().includes('premiere')) return Ticket
    return Megaphone
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!data) return null

  const { hero, whyPromote, cities, services, celebrityManagement, benefits } = data

  return (
    <main className="min-h-screen pt-20 overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/10 rounded-full blur-3xl"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold tracking-wider uppercase">Strategic Marketing Partner</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                {hero.title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed font-light">
                {hero.description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Stats Section */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Why Promote Your Film in <span className="text-purple-600">Madhya Pradesh?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Madhya Pradesh has emerged as a massive market for Indian cinema with a rapidly growing
                infrastructure and a passionate audience base.
              </p>
              <div className="space-y-4">
                {whyPromote.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-card p-8 rounded-3xl shadow-xl border border-border">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-red-500" /> Major Promotion-Friendly Cities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {cities.map((city: string, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-muted/50 rounded-2xl flex items-center gap-3 border border-border"
                  >
                    <Building2 className="w-5 h-5 text-indigo-500" />
                    <span className="font-bold text-foreground/90">{city}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-500 italic">
                Our network extends across all major and developing districts of MP.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Promotion Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4">Our Movie Promotion Services</h2>
              <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service: any, index: number) => {
              const ServiceIcon = getServiceIcon(service.title)
              return (
                <ScrollReveal key={service.title} delay={index * 0.1}>
                  <div className="h-full p-8 rounded-3xl bg-card border border-border hover:shadow-2xl transition-all duration-500 group">
                    <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-200">
                      <ServiceIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-foreground">{index + 1}. {service.title}</h3>
                    <ul className="space-y-3">
                      {service.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-foreground/70">
                          <span className="text-purple-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Celebrity Management Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <div className="space-y-8">
                <div className="inline-block p-3 bg-purple-500/20 rounded-2xl text-purple-300">
                  <Star className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-display font-bold text-white">Celebrity Management Services</h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {celebrityManagement.description}
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {celebrityManagement.types.map((type: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-slate-100">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="font-medium text-white">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-2xl font-bold border-b border-white/10 pb-4 text-white">Our Management Includes:</h3>
                <div className="space-y-4">
                  {celebrityManagement.includes.map((item: string, i: number) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      whileHover={{ x: 10 }}
                    >
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span className="text-slate-200">{item}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="pt-4 text-sm text-slate-400">
                  We ensure professional handling from confirmation to event completion.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Strategic Benefits */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Why Choose Us */}
            <ScrollReveal>
              <div className="bg-card p-10 rounded-3xl shadow-xl border border-border h-full">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <Handshake className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-6">Why Choose Film Industry MP?</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  As a Madhya Pradesh-based execution partner working closely with district administrations
                  and familiar with the processes of Madhya Pradesh Tourism Board, we provide:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.whyChooseUs.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-foreground/80 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Strategic Benefits */}
            <ScrollReveal delay={0.2}>
              <div className="bg-card p-10 rounded-3xl shadow-xl border border-border h-full">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-6">Strategic Benefits for Producers</h3>
                <div className="space-y-4">
                  {benefits.strategicBenefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl border border-border">
                      <div className="w-10 h-10 bg-card rounded-full shadow-sm flex items-center justify-center text-xl">
                        📈
                      </div>
                      <span className="font-bold text-foreground/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let’s Promote Your Next Release in MP</h2>
            <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
              Whether you are a Bollywood banner, South Indian production house, or an independent filmmaker,
              we provide end-to-end promotional execution support in Madhya Pradesh.
            </p>
            <div className="bg-purple-600 text-white p-10 rounded-3xl shadow-2xl shadow-purple-200">
              <h3 className="text-2xl font-bold mb-6">How Both Services Work Together</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  'Structured Movie Promotion Planning',
                  'Organized Celebrity Appearances',
                  'Strong Media & Public Engagement',
                  'Complete On-Ground Execution'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-300" />
                    </div>
                    <span className="font-medium text-white">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-white/90 font-medium">
                We handle the entire promotional ecosystem — not just booking a celebrity, but executing a successful campaign.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
