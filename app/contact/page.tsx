import { Metadata } from 'next'
import { ContactContent } from '@/components/contact-content'

export const metadata: Metadata = {
  title: 'Contact Film Industry MP - Get in Touch',
  description: 'Contact Film Industry MP to discuss your film production project in Madhya Pradesh. Phone, email, and contact form available.',
}

export default function Contact() {
  return <ContactContent />
}
