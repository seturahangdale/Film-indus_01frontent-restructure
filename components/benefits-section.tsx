'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { CheckCircle, Film, Camera, Clapperboard, Star } from 'lucide-react'

const benefits = [
  {
    title: 'Obtain Ease of Permissions',
    description:
      'Rapid clearances for locations, incentives, subsidies, and government support',
    icon: '✓',
  },
  {
    title: 'Hire Verified Line Producers',
    description:
      'Experienced, trustworthy local crew for seamless filming execution',
    icon: '✓',
  },
  {
    title: 'Access Ideal Locations',
    description:
      'Scenic sites aligned to your script with cost-effective logistics',
    icon: '✓',
  },
  {
    title: 'Local Crew, Artists & Resources',
    description:
      'Well-trained local technicians, artists, junior artists, and production staff — reducing cost and increasing subsidy benefits',

    icon: '✓',
  },
  {
    title: 'Cost-Effective Production Planning',
    description:
      'Smart budgeting, local vendor tie-ups, and subsidy-aligned planning to maximize savings without compromising quality',
    icon: '✓',
  },
  {
    title: 'Experience with Films, OTT & Ad Shoots',
    description:
      'Proven support for feature films, web series, OTT content, TV shows, documentaries, and advertisement films.',
    icon: '✓',
  },
  {
    title: 'Fast Turnaround & Transparent Process',
    description:
      'Clear communication, realistic timelines, and transparent costing — no hidden surprises.',
    icon: '✓',
  },
  {
    title: 'Strong Local Presence in Madhya Pradesh',
    description:
      'Deep understanding of regional culture, locations, and administration ensures smooth on-ground execution.',
    icon: '✓',
  },
  {
    title: 'Creative & Production-Friendly Approach',
    description:
      'We respect the creative vision of filmmakers while managing practical production challenges efficiently.',
    icon: '✓',
  },
]

export function BenefitsSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 bg-gradient-to-b from-background via-orange-50/5 dark:via-orange-950/20 to-background overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #d97706 1px, transparent 1px), linear-gradient(to bottom, #d97706 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating film elements - top left */}
        <motion.div
          className="absolute top-20 left-10 opacity-[0.15]"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Film className="w-32 h-32 text-amber-700" />
        </motion.div>

        {/* Camera - top right */}
        <motion.div
          className="absolute top-32 right-16 opacity-[0.15]"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Camera className="w-28 h-28 text-blue-700" />
        </motion.div>

        {/* Clapperboard - bottom left */}
        <motion.div
          className="absolute bottom-32 left-20 opacity-[0.15]"
          animate={{
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Clapperboard className="w-30 h-30 text-purple-700" />
        </motion.div>

        {/* Star - bottom right */}
        <motion.div
          className="absolute bottom-20 right-24 opacity-[0.18]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-24 h-24 text-yellow-600 fill-yellow-600" />
        </motion.div>

        {/* Additional small floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-amber-600/25"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-transparent rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-tl-full" />

        {/* Additional decorative lines */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/15 to-transparent"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-600/15 to-transparent"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-5 md:mb-6 text-foreground px-4">
              Why Choose Film Industry MP?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
              We provide comprehensive solutions for seamless film production in
              Madhya Pradesh
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="film-card p-6 sm:p-7 md:p-8 lg:p-10 h-full"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6"
                >
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground mb-3 sm:mb-4">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
