'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'

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

export function SubsidyEditor() {
    const [content, setContent] = useState<SubsidyContentData | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await apiClient.getSubsidyContent()
                setContent(data)
            } catch (error) {
                console.error('Failed to fetch content:', error)
                toast.error('Failed to load subsidy content')
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [])

    const handleSave = async () => {
        if (!content) return
        setSaving(true)
        try {
            await apiClient.updateSubsidyContent(content)
            toast.success('Subsidy page content updated!')
        } catch (error) {
            console.error('Save failed:', error)
            toast.error('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    const updateSection = (section: keyof SubsidyContentData, field: string, value: any) => {
        if (!content) return
        setContent((prev) => {
            if (!prev) return null
            return {
                ...prev,
                [section]: {
                    ...(prev[section] as any),
                    [field]: value,
                },
            }
        })
    }

    const addListItem = (section: 'whyChooseMP' | 'incentives', field: 'points' | 'eligibleProjects') => {
        if (!content) return
        setContent((prev) => {
            if (!prev) return null
            const updated = { ...prev }
            if (section === 'whyChooseMP') {
                updated.whyChooseMP = {
                    ...prev.whyChooseMP,
                    points: [...prev.whyChooseMP.points, ''],
                }
            } else {
                updated.incentives = {
                    ...prev.incentives,
                    eligibleProjects: {
                        ...prev.incentives.eligibleProjects,
                        items: [...prev.incentives.eligibleProjects.items, ''],
                    },
                }
            }
            return updated
        })
    }

    const updateListItem = (
        section: 'whyChooseMP' | 'incentives',
        field: 'points' | 'eligibleProjects',
        index: number,
        value: string
    ) => {
        if (!content) return
        setContent((prev) => {
            if (!prev) return null
            const updated = { ...prev }
            if (section === 'whyChooseMP') {
                const newPoints = [...prev.whyChooseMP.points]
                newPoints[index] = value
                updated.whyChooseMP = { ...prev.whyChooseMP, points: newPoints }
            } else {
                const newItems = [...prev.incentives.eligibleProjects.items]
                newItems[index] = value
                updated.incentives = {
                    ...prev.incentives,
                    eligibleProjects: { ...prev.incentives.eligibleProjects, items: newItems },
                }
            }
            return updated
        })
    }

    const removeListItem = (
        section: 'whyChooseMP' | 'incentives',
        field: 'points' | 'eligibleProjects',
        index: number
    ) => {
        if (!content) return
        setContent((prev) => {
            if (!prev) return null
            const updated = { ...prev }
            if (section === 'whyChooseMP') {
                updated.whyChooseMP = {
                    ...prev.whyChooseMP,
                    points: prev.whyChooseMP.points.filter((_, i) => i !== index),
                }
            } else {
                updated.incentives = {
                    ...prev.incentives,
                    eligibleProjects: {
                        ...prev.incentives.eligibleProjects,
                        items: prev.incentives.eligibleProjects.items.filter((_, i) => i !== index),
                    },
                }
            }
            return updated
        })
    }

    if (loading) return <div className="py-10 text-center">Loading content editor...</div>
    if (!content) return <div className="py-10 text-center text-red-500">Error loading content</div>

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50">
                <div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground tracking-tight">Subsidy <span className="text-slate-400 dark:text-muted-foreground font-light text-2xl ml-1">Architect</span></h2>
                    <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1 font-medium italic">Configure financial frameworks and incentive narratives.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-10 py-7 h-auto shadow-xl shadow-purple-900/20 gap-3 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 border-2 border-white/20 rounded-md p-0.5" />}
                    {saving ? 'Synchronizing...' : 'Deploy Content'}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Hero Section */}
                <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center shadow-inner">
                            <span className="text-xl">✨</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-muted-foreground tracking-tight uppercase tracking-widest text-[10px] opacity-50 mb-1 font-black">Initial Impact</h3>
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground">Hero Experience</h4>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2">Primary Headline</label>
                            <input
                                type="text"
                                value={content.hero.title}
                                onChange={(e) => updateSection('hero', 'title', e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-600/20 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2">Narrative Body</label>
                            <textarea
                                rows={4}
                                value={content.hero.description}
                                onChange={(e) => updateSection('hero', 'description', e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-600/20 text-slate-900 dark:text-foreground font-medium placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border leading-relaxed"
                            />
                        </div>
                    </div>
                </section>

                {/* Why Choose MP */}
                <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner">
                            <span className="text-xl">🌳</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-muted-foreground tracking-tight uppercase tracking-widest text-[10px] opacity-50 mb-1 font-black">Strategic Value</h3>
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground">Region Advantages</h4>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2">Section Heading</label>
                            <input
                                type="text"
                                value={content.whyChooseMP.title}
                                onChange={(e) => updateSection('whyChooseMP', 'title', e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-900 dark:text-foreground font-bold transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-2 px-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Core Differentiators</label>
                                <button
                                    onClick={() => addListItem('whyChooseMP', 'points')}
                                    className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full transition-all"
                                >
                                    + Add Point
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {content.whyChooseMP.points.map((point, index) => (
                                    <div key={index} className="group/item relative">
                                        <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => updateListItem('whyChooseMP', 'points', index, e.target.value)}
                                            className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-700 dark:text-foreground font-medium transition-all shadow-inner ring-1 ring-slate-100 dark:ring-border"
                                        />
                                        <button
                                            onClick={() => removeListItem('whyChooseMP', 'points', index)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Incentives */}
                <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center shadow-inner">
                            <span className="text-xl">💰</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-muted-foreground tracking-tight uppercase tracking-widest text-[10px] opacity-50 mb-1 font-black">Financial Architecture</h3>
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground">Subsidies & Support</h4>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2">Section Headline</label>
                            <input
                                type="text"
                                value={content.incentives.title}
                                onChange={(e) => updateSection('incentives', 'title', e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-purple-600/20 text-slate-900 dark:text-foreground font-bold transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2">Support Narrative</label>
                            <textarea
                                rows={3}
                                value={content.incentives.description}
                                onChange={(e) => updateSection('incentives', 'description', e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-purple-600/20 text-slate-700 dark:text-foreground font-medium transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border leading-relaxed"
                            />
                        </div>

                        <div className="pt-8 border-t border-slate-50">
                            <div className="flex justify-between items-center mb-6 px-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Eligible Project Frameworks</label>
                                <button
                                    onClick={() => addListItem('incentives', 'eligibleProjects')}
                                    className="text-[10px] font-black uppercase tracking-widest text-purple-600 hover:text-purple-700 bg-purple-50 px-4 py-2 rounded-full transition-all"
                                >
                                    + Define Type
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {content.incentives.eligibleProjects.items.map((item, index) => (
                                    <div key={index} className="group/item relative">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => updateListItem('incentives', 'eligibleProjects', index, e.target.value)}
                                            className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-xl outline-none focus:ring-2 focus:ring-purple-600/20 text-slate-700 dark:text-foreground font-medium transition-all shadow-inner ring-1 ring-slate-100 dark:ring-border"
                                        />
                                        <button
                                            onClick={() => removeListItem('incentives', 'eligibleProjects', index)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
