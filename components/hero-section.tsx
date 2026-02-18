'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative w-full h-auto aspect-video sm:aspect-auto sm:h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-black">

      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover sm:object-center"
      >
        <source src="/newhero.mp4" type="video/mp4" />
      </video>

      {/* GRADIENT OVER VIDEO */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* BUTTONS */}
      <motion.div
        className="absolute bottom-4 sm:bottom-12 left-0 sm:left-1/2 sm:-translate-x-1/2 z-10 flex flex-row justify-center items-center gap-1.5 sm:gap-6 w-full px-2 sm:px-0 sm:w-auto overflow-x-auto no-scrollbar"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      >

        {/* FILM SHOOTING GUIDE */}
        <motion.a
          href="/forms/film-shooting-guide-mp.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-auto text-center px-3 sm:px-8 py-2 sm:py-4 rounded-full bg-[#8B6F47] text-white font-semibold text-[10px] sm:text-lg shadow-lg hover:bg-[#A8895C] transition flex items-center justify-center whitespace-nowrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Film Shooting Guide
        </motion.a>

        {/* PAMPHLETS */}
        <motion.a
          href="/pamphlets"
          className="w-auto text-center px-3 sm:px-8 py-2 sm:py-4 rounded-full bg-[#3E2723] text-white font-semibold text-[10px] sm:text-lg shadow-lg hover:bg-[#4e342e] transition flex items-center justify-center whitespace-nowrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          View Pamphlets
        </motion.a>

        {/* FILM PROMOTION GUIDE */}
        <motion.a
          href="/forms/film-promotion-guide-mp.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-auto text-center px-3 sm:px-8 py-2 sm:py-4 rounded-full bg-[#2D5016] text-white font-semibold text-[10px] sm:text-lg shadow-lg hover:bg-[#3b6b1f] transition flex items-center justify-center whitespace-nowrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Film Promotion Guide
        </motion.a>

      </motion.div>
    </section>
  )
}
