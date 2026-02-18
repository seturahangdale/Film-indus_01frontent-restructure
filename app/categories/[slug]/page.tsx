import { LayoutWrapper } from '@/components/layout-wrapper'
import { notFound } from 'next/navigation'

const categories: Record<string, { title: string }> = {
  'period-drama': { title: 'Period Drama' },
  'bollywood-movie': { title: 'Bollywood Movie' },
  'tollywood-movie': { title: 'Tollywood Movie' },
  'web-series': { title: 'Web Series' },
  'tv-serials': { title: 'TV Serials' },
  'tv-ads': { title: 'TV Ads' },
  'movie-promotion': { title: 'Movie Promotion' },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories[params.slug]
  if (!category) return { title: 'Not Found' }

  return {
    title: `${category.title} | Film Industry MP`,
    description: `Explore ${category.title} productions filmed in Madhya Pradesh`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories[params.slug]

  if (!category) {
    notFound()
  }

  return (
    <LayoutWrapper>
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {category.title}
            </h1>
            <p className="text-lg text-foreground/70">
              Explore {category.title.toLowerCase()} productions filmed in Madhya Pradesh
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden bg-foreground/5 border border-foreground/10">
            <img
              src="/section-image.jpg"
              alt={category.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}
