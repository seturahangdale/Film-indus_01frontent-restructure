'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'

export function MPProjectSection() {
  return (
    <section className="w-full bg-background">

      {/* Spacing after text banner */}
      <div className="mt-8 sm:mt-12 md:mt-16" />

      {/* Heading */}
      <div className="text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
        >
          MADHYA PRADESH JOURNEY
        </motion.h2>
      </div>

      {/* Spacing between text & image */}
      <div className="mt-6 sm:mt-8 md:mt-10" />

      {/* Image - Responsive with object-contain */}
      <motion.div
        className="flex justify-center px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <img
          src="/mpprojects.jpg"
          alt="Madhya Pradesh Journey"
          className="w-full max-w-full h-auto object-contain rounded-lg sm:rounded-xl"
        />
      </motion.div>

      {/* Content Section */}
      <div className="pt-12 sm:pt-16 md:pt-20 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 sm:mb-6 md:mb-8">

            </h3>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8 sm:mb-10 md:mb-12">

            </p>
            <p className="text-sm sm:text-base md:text-lg font-semibold text-primary">

            </p>
          </ScrollReveal>
        </div>
      </div>

    </section>
  )
}


