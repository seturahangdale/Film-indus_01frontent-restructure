import { apiClient } from '@/lib/api-client'
import Link from 'next/link'
import { ArrowLeft, Loader2, MapPin } from 'lucide-react'

type Props = {
  params: Promise<{
    category: string
  }>
}

export default async function LocationCategoryPage({ params }: Props) {
  const { category: slug } = await params

  let data: any = null
  try {
    data = await apiClient.getGalleryData()
  } catch (error) {
    console.error('Failed to fetch gallery data', error)
  }

  const category = data?.categories.find((c: any) => c.id === slug.toLowerCase())

  if (!category) {
    return (
      <section className="min-h-screen p-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Category Not Found</h1>
        <p className="text-slate-500 mb-8">The location category you are looking for does not exist.</p>
        <Link href="/gallery" className="text-accent font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>
      </section>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/gallery" className="inline-flex items-center gap-2 text-slate-500 hover:text-accent transition mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 capitalize">
              {category.name} Locations
            </h1>
          </div>

          {category.description && (
            <p className="text-xl text-slate-600 max-w-4xl mb-12 leading-relaxed">
              {category.description}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.places && category.places.length > 0 ? (
              category.places.map((place: string, i: number) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-accent hover:bg-white transition-all shadow-sm hover:shadow-md">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium text-slate-700">{place}</span>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400">
                No notable places added yet for this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}


