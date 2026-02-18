import { Metadata } from 'next'
import { GalleryContent } from '@/components/gallery-content'

export const metadata: Metadata = {
  title: 'Gallery - Madhya Pradesh Film Locations | Film Industry MP',
  description: 'Explore stunning locations across Madhya Pradesh including Khajuraho, Orchha, Pachmarhi, and Gwalior Fort - premium filming destinations.',
}

export default function Gallery() {
  return <GalleryContent />
}
