import { Metadata } from 'next'
import { ProjectsContent } from '@/components/projects-content'

export const metadata: Metadata = {
  title: 'Movie Promotion & Celebrity Management | Film Industry MP',
  description: 'Structured, result-driven movie promotion and celebrity management services across Madhya Pradesh, including Indore, Bhopal, and Jabalpur.',
}

export default function Projects() {
  return <ProjectsContent />
}
