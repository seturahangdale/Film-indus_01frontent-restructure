'use client'

import { LayoutWrapper } from './layout-wrapper'

interface CategoryPageProps {
  title: string
  description?: string
}

export function CategoryPage({ title, description }: CategoryPageProps) {
  return (
    <LayoutWrapper>
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-foreground/70">
                {description}
              </p>
            )}
          </div>

          {/* Image Section */}
          <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden bg-foreground/5 border border-foreground/10">
            <img
              src="/section-image.jpg"
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}
