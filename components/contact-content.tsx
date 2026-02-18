'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { Phone, Mail, MapPin, Send, Download, X } from 'lucide-react'
import { Button } from './ui/button'

import { apiClient, ContactData } from "@/lib/api-client"

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    phone: '',
    subject: 'Select Subject',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await apiClient.submitContact(formData)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Select Subject',
        message: ''
      })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen pt-20">

      {/* HERO */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Let's discuss your film production project
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* PHONE */}
            <ScrollReveal>
              <motion.a
                href="tel:+919977110001"
                whileHover={{ y: -6 }}
                className="film-card p-6 flex flex-col items-center text-center transition-all hover:border-accent"
              >
                <Phone className="w-10 h-10 text-accent mb-3" />
                <h3 className="text-lg font-semibold mb-1">Phone</h3>
                <p className="text-sm text-foreground/70">+91 99771 10001</p>
              </motion.a>
            </ScrollReveal>

            {/* EMAIL */}
            <ScrollReveal delay={0.1}>
              <motion.a
                href="mailto:info@filmindustrymp.com"

                whileHover={{ y: -6 }}
                className="film-card p-6 flex flex-col items-center text-center transition-all hover:border-accent"
              >
                <Mail className="w-10 h-5 text-accent mb-3" />
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <p className="text-sm text-foreground/70">
                  info@filmindustrymp.com
                  filmindustrymadhyapradesh@gmail.com
                </p>
              </motion.a>
            </ScrollReveal>

            {/* OFFICE ADDRESS */}
            <ScrollReveal delay={0.2}>
              <motion.a
                href="https://maps.app.goo.gl/MuPqtqD2FqUGdKcm9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                className="film-card p-1 flex flex-col items-center text-center transition-all hover:border-accent"
              >
                <MapPin className="w-10 h-10 text-accent mb-3" />
                <h3 className="text-lg font-semibold mb-2">Office Address</h3>

                <div className="text-sm text-foreground/70 leading-relaxed space-y-1 max-w-[220px]">
                  <p >Samarth City, Nainod,Indore</p>

                </div>
              </motion.a>
            </ScrollReveal>

            {/* VISITING CARD */}
            <ScrollReveal delay={0.3}>
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => setShowCard(true)}
                className="film-card p-6 flex flex-col items-center text-center transition-all hover:border-accent cursor-pointer"
              >
                <div className="w-10 h-10 mb-3 flex items-center justify-center rounded-full bg-accent/10 text-accent text-xl">
                  📇
                </div>
                <h3 className="text-lg font-semibold mb-1">Visiting Card</h3>
                <p className="text-sm text-foreground/70">Click to View</p>
              </motion.div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* VISITING CARD MODAL */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl max-w-md w-full p-6 relative border border-border shadow-2xl"
            >
              <button
                onClick={() => setShowCard(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <X />
              </button>

              <img
                src="/visitingcard/print Visiting Card.jpg"
                alt="Visiting Card"
                className="w-full rounded-md mb-4"
              />

              <a
                href="/visitingcard/print Visiting Card.jpg"
                download
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition"
              >
                <Download className="w-5 h-5" />
                Download Visiting Card
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT FORM */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
              Send us a Message
            </h2>
            <p className="text-center text-lg opacity-90 mb-12">
              Fill out the form below and our team will get back to you shortly
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Your Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Email Address"
                  required
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Phone Number"
                  required
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-style"
                  required
                >
                  <option value="Select Subject" disabled>Select Subject</option>
                  <option value="Film Production">Film Production</option>
                  <option value="Web Series">Web Series</option>
                  <option value="OTT Content">OTT Content</option>
                  <option value="Subsidy Inquiry">Subsidy Inquiry</option>
                </select>
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us about your project..."
                required
                className="input-style resize-none"
              />

              <Button className="w-full bg-accent" disabled={isSubmitting}>
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {submitted && (
                <div className="text-center text-accent font-semibold">
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>

    </main>
  )
}

