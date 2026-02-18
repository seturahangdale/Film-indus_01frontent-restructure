import { Metadata } from 'next'
import { ApplyContent } from '@/components/apply-content'

export const metadata: Metadata = {
  title: 'Apply for Filming - Film Industry MP',
  description: 'Submit your film project application to Film Industry MP and get access to premium locations, subsidies, and production support in Madhya Pradesh.',
}

export default function Apply() {
  return <ApplyContent />
}
