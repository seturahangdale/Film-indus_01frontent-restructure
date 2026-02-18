'use client'

import { motion } from 'framer-motion'

export function TextBanner() {
  const textLines = [
    'Plan. Shoot. Wrap.',
    'Madhya Pradesh – The Heart of India.',
    'Feel the Heartbeat of India.',
    'Madhya Pradesh – Where History Lives.',
    'Nature, Culture, Tradition – Madhya Pradesh.',
    'Discover the Soul of India.',
    'Madhya Pradesh – Land of Heritage and Harmony.',
    'From Forests to Forts – Madhya Pradesh.',
    'The Heart That Makes India Beat.',
    'Script to Shoot',
    'Pure. Proud. Madhya Pradesh.',
    'In the Heart, Forever.',
  ]

  // Double the array for seamless loop
  const displayLines = [...textLines, ...textLines]

  return (
    <section className="relative w-full bg-gradient-to-r from-[#8B6B3E] via-[#2F5D2F] to-[#8B6B3E] text-white py-6 sm:py-8 md:py-10 overflow-hidden">

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`
          }}
          animate={{ x: [0, 40] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Glowing top border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        animate={{
          opacity: [0.5, 1, 0.5],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glowing bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
        animate={{
          opacity: [0.5, 1, 0.5],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Scrolling text */}
      <motion.div
        className="flex whitespace-nowrap gap-6 sm:gap-8 md:gap-10 relative z-10"
        animate={{ x: [0, -50 + '%'] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {displayLines.map((line, index) => (
          <motion.span
            key={index}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide flex-shrink-0 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Text with gradient effect */}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                {line}
              </span>

              {/* Subtle glow effect */}
              <motion.span
                className="absolute inset-0 blur-sm opacity-50"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
              >
                {line}
              </motion.span>
            </span>

            {/* Separator dot */}
            <motion.span
              className="inline-block mx-4 sm:mx-6 md:mx-8 w-2 h-2 rounded-full bg-amber-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.15,
              }}
            />
          </motion.span>
        ))}
      </motion.div>

      {/* Floating sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${30 + Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}
    </section>
  )
}
