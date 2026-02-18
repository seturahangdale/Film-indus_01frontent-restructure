'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { apiClient } from '@/lib/api-client'
import { Sparkles, CreditCard, Download } from 'lucide-react'
import Image from 'next/image'

interface Document {
    id: number
    title: string
    buttonLabel: string
    filepath: string
    filesize: number
}

export default function VisitingCardsPage() {
    const [cards, setCards] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const { documents } = await apiClient.getAllDocuments('visiting_card')
                setCards(documents)
            } catch (error) {
                console.error('Failed to fetch visiting cards:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCards()
    }, [])

    return (
        <main className="min-h-screen pt-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#1a2f1a] via-[#2F5D2F] to-[#1a2f1a] text-white overflow-hidden">
                {/* Animated background icons */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.1, 0.3, 0.1],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 6 + i * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.3,
                            }}
                        >
                            <CreditCard className="w-12 h-12 text-white/10" />
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center">
                            <motion.div
                                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-5 h-5 text-[#B8860B]" />
                                <span className="text-sm font-semibold">Official Contact Cards</span>
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                                Visiting Cards
                            </h1>
                            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                                Connect with us using our official digital visiting cards
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1200 120" className="w-full h-16 fill-background">
                        <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" />
                    </svg>
                </div>
            </section>

            {/* Cards Display */}
            <section className="py-20 md:py-32 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-12 h-12 border-4 border-[#2F5D2F] border-t-transparent rounded-full animate-spin" />
                            <p className="mt-4 text-gray-600">Loading visiting cards...</p>
                        </div>
                    ) : cards.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-xl text-gray-500 font-medium">No visiting cards available yet</p>
                            <p className="text-gray-400 mt-2">Check back soon for updates</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                            {cards.map((card, index) => (
                                <ScrollReveal key={card.id} delay={index * 0.2}>
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            whileHover={{ scale: 1.02, rotate: -1 }}
                                            className="relative w-full aspect-[1.75/1] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 group"
                                        >
                                            <Image
                                                src={card.filepath}
                                                alt={card.title}
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </motion.div>

                                        <div className="mt-8 text-center space-y-4 w-full max-w-md">
                                            <h3 className="text-2xl font-bold text-[#1a2f1a]">{card.title}</h3>
                                            <a
                                                href={card.filepath}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-[#2F5D2F] to-[#1a2f1a] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <Download className="w-5 h-5" />
                                                {card.buttonLabel}
                                            </a>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
