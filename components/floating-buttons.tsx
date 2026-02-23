'use client'
import { FaWhatsapp } from "react-icons/fa"

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function FloatingButtons() {
  const pathname = usePathname()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/919977110001")

  const isAuthPage = pathname?.startsWith('/admin') || pathname === '/login' || pathname === '/reset-password'

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    const fetchWhatsapp = async () => {
      try {
        const res = await fetch('/api/social')
        if (res.ok) {
          const data = await res.json()
          const whatsapp = data.socialLinks?.find((l: any) => l.platform === 'whatsapp')
          if (whatsapp?.url) {
            setWhatsappUrl(whatsapp.url)
          }
        }
      } catch (error) {
        console.error('Failed to fetch whatsapp link:', error)
      }
    }

    fetchWhatsapp()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Removed the restriction to show it on Admin Panel as well per user request
  // if (isAuthPage) return null

  return (
    <>
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] hover:bg-[#1ebe5d] text-white p-4 rounded-full shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] transition-all cursor-pointer flex items-center justify-center border-2 border-white/20"
        aria-label="Contact via WhatsApp"
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <FaWhatsapp className="w-8 h-8 relative z-10 drop-shadow-md" />
      </motion.a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 md:bottom-24 md:right-8 z-40 bg-primary text-white p-3 sm:p-3.5 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow touch-manipulation"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
