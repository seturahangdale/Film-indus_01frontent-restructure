'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { apiClient } from '@/lib/api-client'
import { Download, FileText, CheckCircle2 } from 'lucide-react'

interface Document {
  id: number
  title: string
  buttonLabel: string
  filepath: string
  filesize: number
}

interface Document {
  id: number
  title: string
  buttonLabel: string
  filepath: string
  filesize: number
}

interface SubsidyContentData {
  hero: {
    title: string
    description: string
  }
  whyChooseMP: {
    title: string
    points: string[]
  }
  incentives: {
    title: string
    description: string
    eligibleProjects: {
      title: string
      items: string[]
    }
  }
}

export function SubsidyContent() {
  const [forms, setForms] = useState<Document[]>([])
  const [pageContent, setPageContent] = useState<SubsidyContentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, contentRes] = await Promise.all([
          apiClient.getAllDocuments('form'),
          apiClient.getSubsidyContent()
        ])
        setForms(docsRes.documents)
        setPageContent(contentRes)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Fallback while loading or if content fails to load
  const content = pageContent || {
    hero: {
      title: 'Madhya Pradesh Film Shoot Subsidy',
      description: 'Madhya Pradesh has emerged as one of India\'s most film-friendly states, offering attractive film shooting subsidies and incentives to encourage national and international productions.'
    },
    whyChooseMP: {
      title: 'Why Choose Madhya Pradesh for Film Shooting?',
      points: [
        'Heritage monuments, forests, rivers & landscapes',
        'Single-window facilitation',
        'Support for films, OTT, TV & ads',
        'Cost-effective production',
        'Trained local crew & artists'
      ]
    },
    incentives: {
      title: 'Film Shooting Subsidy & Incentives',
      description: 'Subsidy on eligible production expenses, incentives for promoting MP\'s culture, benefits for local employment and OTT projects.',
      eligibleProjects: {
        title: 'Eligible Projects',
        items: [
          'Feature Films',
          'Web Series & OTT Content',
          'TV Serials & Reality Shows',
          'Documentaries & Short Films',
          'Advertisement & Corporate Films'
        ]
      }
    }
  }

  return (
    <main className="pt-24 pb-32 bg-background">
      <section className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl font-display font-bold mb-6">
          {content.hero.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-10">
          {content.hero.description}
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-accent">
          {content.whyChooseMP.title}
        </h3>

        <ul className="list-disc pl-6 space-y-2 mb-10">
          {content.whyChooseMP.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mb-4 text-accent">
          {content.incentives.title}
        </h3>

        <p className="mb-6">
          {content.incentives.description}
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-accent">
          {content.incentives.eligibleProjects.title}
        </h3>

        <ul className="list-disc pl-6 space-y-2 mb-12">
          {content.incentives.eligibleProjects.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* Dynamic Forms Section */}
        <div className="border-t pt-16">
          <h3 className="text-4xl font-display font-bold mb-10">
            Application Forms & Documents
          </h3>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-slate-500 italic">No forms are currently available for download.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {forms.map((form) => (
                <div
                  key={form.id}
                  className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="mb-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-5">
                      <FileText className="text-accent w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800">{form.title}</h4>
                  </div>

                  <a
                    href={form.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 transition shadow-lg"
                  >
                    <Download className="w-6 h-6" />
                    {form.buttonLabel}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
