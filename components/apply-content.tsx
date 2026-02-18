'use client'

import React from "react"

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { Button } from './ui/button'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { apiClient } from "@/lib/api-client"

export function ApplyContent() {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    phone: '',
    company: '',
    // Step 2
    projectTitle: '',
    projectType: '',
    shootLocation: '',
    shootDate: '',
    // Step 3
    budget: '',
    crewSize: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      productionCompany: formData.company,
      projectTitle: formData.projectTitle,
      projectType: formData.projectType,
      preferredLocation: formData.shootLocation,
      estimatedBudget: formData.budget,
      additionalNotes: `Message: ${formData.message}\n\nShoot Date: ${formData.shootDate}\nCrew Size: ${formData.crewSize}`
    }

    try {
      await apiClient.submitApplication(payload)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormStep(1)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectTitle: '',
          projectType: '',
          shootLocation: '',
          shootDate: '',
          budget: '',
          crewSize: '',
          message: '',
        })
      }, 3000)
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-balance">
              Apply for Filming
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Get started with your project in Madhya Pradesh
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <motion.div
                    key={step}
                    className={`flex items-center gap-2 ${step <= formStep
                        ? 'text-primary'
                        : 'text-foreground/30'
                      }`}
                  >
                    <motion.div
                      animate={{
                        scale: step === formStep ? 1.2 : 1,
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${step <= formStep ? 'bg-primary' : 'bg-border'
                        }`}
                    >
                      {step < formStep ? '✓' : step}
                    </motion.div>
                    <span className="hidden md:inline font-semibold">
                      {step === 1 && 'Your Info'}
                      {step === 2 && 'Project Details'}
                      {step === 3 && 'Project Overview'}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(formStep / 3) * 100}%` }}
                  className="h-full bg-primary rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal Info */}
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-display font-bold">
                    Tell us about yourself
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Your full name"
                      />
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="your@email.com"
                      />
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Production Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Your company name"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-display font-bold">
                    Tell us about your project
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }} className="relative md:col-span-2">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="projectTitle"
                        value={formData.projectTitle}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Working title of your project"
                      />
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                      >
                        <option value="">Select project type</option>
                        <option value="Hindi Film">Hindi Film</option>
                        <option value="International Film">International Film</option>
                        <option value="Web Series">Web Series</option>
                        <option value="Documentary">Documentary</option>
                        <option value="TV Commercial">TV Commercial</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Other">Other</option>
                      </select>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Preferred Shoot Location *
                      </label>
                      <select
                        name="shootLocation"
                        value={formData.shootLocation}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                      >
                        <option value="">Select location</option>
                        <option value="Khajuraho">Khajuraho</option>
                        <option value="Orchha">Orchha</option>
                        <option value="Pachmarhi">Pachmarhi</option>
                        <option value="Gwalior Fort">Gwalior Fort</option>
                        <option value="Sanchi">Sanchi</option>
                        <option value="Mandu">Mandu</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Other">Other</option>
                      </select>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Intended Shoot Date *
                      </label>
                      <input
                        type="month"
                        name="shootDate"
                        value={formData.shootDate}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Project Overview */}
              {formStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-display font-bold">
                    Project overview
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Estimated Budget *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                      >
                        <option value="">Select budget range</option>
                        <option value="Below ₹1 Crore">Below ₹1 Crore</option>
                        <option value="₹1-5 Crore">₹1-5 Crore</option>
                        <option value="₹5-10 Crore">₹5-10 Crore</option>
                        <option value="₹10-25 Crore">₹10-25 Crore</option>
                        <option value="₹25-50 Crore">₹25-50 Crore</option>
                        <option value="Above ₹50 Crore">Above ₹50 Crore</option>
                      </select>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Estimated Crew Size *
                      </label>
                      <select
                        name="crewSize"
                        value={formData.crewSize}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                      >
                        <option value="">Select crew size</option>
                        <option value="10-30 people">10-30 people</option>
                        <option value="30-50 people">30-50 people</option>
                        <option value="50-100 people">50-100 people</option>
                        <option value="100-200 people">100-200 people</option>
                        <option value="200+ people">200+ people</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ y: -2 }} className="relative">
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                      Additional Notes
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                      rows={6}
                      placeholder="Tell us more about your project, requirements, or any special requests..."
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-between pt-8 border-t border-border">
                {formStep > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handlePrevStep}
                    className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                  >
                    Previous
                  </motion.button>
                )}
                <div className="flex-1" />
                {formStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={submitted || isSubmitting}
                    className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </motion.button>
                )}
              </div>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-accent/20 border-2 border-accent rounded-lg space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-semibold text-accent">
                      Application Submitted Successfully!
                    </h3>
                  </div>
                  <p className="text-foreground/70">
                    Thank you for your interest. Our team will review your application and get in touch within 24-48 hours.
                  </p>
                </motion.div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
              Need Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-secondary-foreground/10 rounded-lg p-8">
                <h3 className="text-2xl font-display font-bold mb-4">
                  Contact Us
                </h3>
                <p className="opacity-90 mb-4">
                  Have questions about your application?
                </p>
                <a
                  href="mailto:info@filmindustrymp.com"
                  className="text-accent hover:text-accent/80 font-semibold"
                >
                  info@filmindustrymp.com
                </a>
              </div>
              <div className="bg-secondary-foreground/10 rounded-lg p-8">
                <h3 className="text-2xl font-display font-bold mb-4">
                  Call Us
                </h3>
                <p className="opacity-90 mb-4">
                  Speak with our team directly
                </p>
                <a
                  href="tel:+919977110001"
                  className="text-accent hover:text-accent/80 font-semibold"
                >
                  +91 99771 10001
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
