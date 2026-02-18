'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
} from 'lucide-react'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Promotion', href: '/projects' },
  { label: 'Subsidy', href: '/subsidy' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
]

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99771 10001',
    href: 'tel:+919977110001',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@filmindustrymp.com',
    href: 'mailto:info@filmindustrymp.com',
  },
  {
    icon: Mail,
    label: 'Email 2',
    value: 'madhyapradeshfilmindustry@gmail.com',
    href: 'mailto:madhyapradeshfilmindustry@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Madhya Pradesh, India',
    href: '#',
  },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/footerlogo.png"
              alt="Film Industry MP"
              className="h-32 sm:h-38 mb-6"
            />

            <p className="text-sm sm:text-base opacity-90 max-w-xs mb-4">
              Your single-window partner for premium film production in Madhya Pradesh.
            </p>

            <a
              href="mailto:info@filmindustrymp.com"
              className="text-sm hover:text-accent transition-colors block"
            >
              info@filmindustrymp.com
            </a>
            <a
              href="mailto:madhyapradeshfilmindustry@gmail.com"
              className="text-sm hover:text-accent transition-colors mb-6 block"
            >
              madhyapradeshfilmindustry@gmail.com
            </a>

            {/* SOCIAL MEDIA */}
            <div className="flex gap-3">
              {[
                {
                  href: 'https://www.instagram.com/filmindustrymp?igsh=YnJyM2U4NHNrOTB3',
                  Icon: Instagram,
                },
                {
                  href: 'https://www.facebook.com/share/1CHzuqUf36/',
                  Icon: Facebook,
                },
                {
                  href: 'https://youtube.com/@filmindustrymp?si=lNSyA34X9dHteR1N',
                  Icon: Youtube,
                },
                {
                  href: 'https://www.linkedin.com/in/filmindustry-mp-05506966',
                  Icon: Linkedin,
                },
                {
                  href: 'https://x.com/FilmIndustryMP',
                  Icon: Twitter,
                },
              ].map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social media link"
                  className="p-2 rounded-full bg-white/10 hover:bg-accent hover:text-white transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-semibold mb-4 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-semibold mb-4 text-lg">
              Contact Us
            </h4>
            <ul className="space-y-2">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <a
                    href={info.href}
                    className="text-sm sm:text-base hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <info.icon className="w-4 h-4" />
                    <span>{info.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-secondary-foreground/20 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
            <p>© 2026 Film Industry MP. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/admin" className="hover:text-accent transition-colors font-semibold border-l border-secondary-foreground/20 pl-6">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

