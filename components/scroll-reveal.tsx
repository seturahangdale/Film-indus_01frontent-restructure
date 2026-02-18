'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  variant?: 'fade' | 'slide-up' | 'scale'
}

export function ScrollReveal({
  children,
  delay = 0,
  variant = 'slide-up',
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    'slide-up': {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial={variants[variant].initial}
      animate={inView ? variants[variant].animate : variants[variant].initial}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
