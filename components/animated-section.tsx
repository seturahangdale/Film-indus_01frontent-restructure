'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
    children: ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    stagger?: boolean
    staggerDelay?: number
}

export function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    stagger = false,
    staggerDelay = 0.1
}: AnimatedSectionProps) {

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 }
    }

    const offset = directionOffset[direction]

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
        >
            {children}
        </motion.div>
    )
}

export function AnimatedCard({
    children,
    className = '',
    index = 0,
    staggerDelay = 0.1
}: {
    children: ReactNode
    className?: string
    index?: number
    staggerDelay?: number
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: index * staggerDelay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
        >
            {children}
        </motion.div>
    )
}

export function AnimatedButton({
    children,
    className = '',
    ...props
}: {
    children: ReactNode
    className?: string
    [key: string]: any
}) {
    return (
        <motion.button
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            {...props}
        >
            {children}
        </motion.button>
    )
}
