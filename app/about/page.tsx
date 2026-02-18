import { Metadata } from 'next'
import { AboutContent } from '@/components/about-content'

export const metadata: Metadata = {
  title: 'About Film Industry MP - Our Story & Mission',
  description: 'Learn about Film Industry MP, our mission to transform Madhya Pradesh into a premier filming destination, and how we support film productions.',
}

export default function About() {
  return <AboutContent />
}
