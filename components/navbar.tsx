'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Social Media', href: '/social-media' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Promotion', href: '/projects' },
  { label: 'Subsidy', href: '/subsidy' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent dark:bg-transparent border-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center h-full">
            <img
              src="/logo.png"
              alt="Film Industry MP Logo"
              className="h-16 sm:h-20 w-auto object-contain transition-all hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className="text-white dark:text-white font-bold hover:text-white dark:hover:text-gold transition-colors relative group text-sm xl:text-base"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-gold origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}

            <div className="ml-4 pl-4 border-l border-border">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-muted active:bg-gray-200 dark:active:bg-zinc-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="pb-4 pt-2 space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block px-4 py-3 rounded-md hover:bg-primary/10 dark:hover:bg-muted text-foreground dark:text-slate-300 font-medium text-base active:bg-primary/20 dark:active:bg-zinc-800 transition-colors"
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
