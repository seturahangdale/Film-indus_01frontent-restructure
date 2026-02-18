'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { Save, Plus, X, Type, List, Info, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function AboutManager() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await apiClient.getAboutData()
            setData(res)
        } catch (error) {
            console.error('Failed to load about data:', error)
            toast.error('Failed to load about data')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!data) return
        setSaving(true)
        try {
            await apiClient.updateAboutData(data)
            toast.success('About content updated successfully!')
        } catch (error) {
            toast.error('Failed to update content')
        } finally {
            setSaving(false)
        }
    }

    const updateWhoParagraph = (index: number, value: string) => {
        const newParagraphs = [...data.whoWeAre.paragraphs]
        newParagraphs[index] = value
        setData({ ...data, whoWeAre: { ...data.whoWeAre, paragraphs: newParagraphs } })
    }

    const addWhoParagraph = () => {
        setData({
            ...data,
            whoWeAre: {
                ...data.whoWeAre,
                paragraphs: [...data.whoWeAre.paragraphs, '']
            }
        })
    }

    const removeWhoParagraph = (index: number) => {
        const newParagraphs = data.whoWeAre.paragraphs.filter((_: any, i: number) => i !== index)
        setData({ ...data, whoWeAre: { ...data.whoWeAre, paragraphs: newParagraphs } })
    }

    const updateWhatItem = (index: number, value: string) => {
        const newItems = [...data.whatWeDo.items]
        newItems[index] = value
        setData({ ...data, whatWeDo: { ...data.whatWeDo, items: newItems } })
    }

    const addWhatItem = () => {
        setData({
            ...data,
            whatWeDo: {
                ...data.whatWeDo,
                items: [...data.whatWeDo.items, '']
            }
        })
    }

    const removeWhatItem = (index: number) => {
        const newItems = data.whatWeDo.items.filter((_: any, i: number) => i !== index)
        setData({ ...data, whatWeDo: { ...data.whatWeDo, items: newItems } })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center p-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-500">Could not load about data.</h3>
                <p className="text-slate-400 mt-2">Please check if data/about.json exists and the API is running.</p>
                <button onClick={fetchData} className="mt-4 px-4 py-2 bg-accent text-white rounded-lg">Retry</button>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50">
                <div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground tracking-tight">Identity <span className="text-slate-400 dark:text-muted-foreground font-light text-2xl ml-1">Manager</span></h2>
                    <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1 font-medium italic">Define and articulate the core mission and operational highlights.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-10 py-7 h-auto shadow-xl shadow-purple-900/20 gap-3 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 border-2 border-white/20 rounded-md p-0.5" />}
                    {saving ? 'Syncing...' : 'Publish Content'}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Who We Are Section */}
                <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-inner">
                            <Type size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-muted-foreground tracking-tight uppercase tracking-widest text-xs opacity-50 mb-1">Editorial Core</h3>
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground">Who We Are</h4>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2">Section Headline</label>
                            <input
                                type="text"
                                value={data.whoWeAre.title}
                                onChange={(e) => setData({ ...data, whoWeAre: { ...data.whoWeAre, title: e.target.value } })}
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Narrative Blocks</label>
                            <div className="space-y-6">
                                <AnimatePresence initial={false}>
                                    {data.whoWeAre.paragraphs.map((para: string, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex gap-4 group/para"
                                        >
                                            <textarea
                                                value={para}
                                                onChange={(e) => updateWhoParagraph(idx, e.target.value)}
                                                className="flex-1 px-6 py-5 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 text-slate-700 dark:text-foreground font-medium placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border min-h-[120px] resize-none"
                                                placeholder={`Paragraph ${idx + 1}`}
                                            />
                                            <button
                                                onClick={() => removeWhoParagraph(idx)}
                                                className="p-3 h-fit text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border-none mt-2 opacity-0 group-hover/para:opacity-100"
                                            >
                                                <X size={20} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <button
                                    onClick={addWhoParagraph}
                                    className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 px-6 py-3 rounded-xl transition-all border border-dashed border-indigo-200"
                                >
                                    <Plus size={14} className="border-2 border-indigo-600/20 rounded-full p-0.5" /> Append Paragraph
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Do Section */}
                <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner">
                            <List size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-muted-foreground tracking-tight uppercase tracking-widest text-xs opacity-50 mb-1">Operational Capabilities</h3>
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground">What We Do</h4>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2">Section Headline</label>
                            <input
                                type="text"
                                value={data.whatWeDo.title}
                                onChange={(e) => setData({ ...data, whatWeDo: { ...data.whatWeDo, title: e.target.value } })}
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Capabilities Registry</label>
                            <div className="space-y-4">
                                <AnimatePresence initial={false}>
                                    {data.whatWeDo.items.map((item: string, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex gap-4 group/item"
                                        >
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => updateWhatItem(idx, e.target.value)}
                                                className="flex-1 px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border"
                                                placeholder={`Capability ${idx + 1}`}
                                            />
                                            <button
                                                onClick={() => removeWhatItem(idx)}
                                                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border-none opacity-0 group-hover/item:opacity-100"
                                            >
                                                <X size={20} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <button
                                    onClick={addWhatItem}
                                    className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 px-6 py-3 rounded-xl transition-all border border-dashed border-emerald-200"
                                >
                                    <Plus size={14} className="border-2 border-emerald-600/20 rounded-full p-0.5" /> Register Capability
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="bg-slate-900 text-slate-300 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000" />
                <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/10">
                    <Info size={32} />
                </div>
                <div className="space-y-3 relative z-10">
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-[0.3em]">System Manifest</p>
                    <p className="text-lg font-medium leading-relaxed">
                        Data modifications synchronized here impact the <span className="text-white font-bold">Identity Backbone</span> of the platform. Changes propagate to primary visual components on Home and Secondary pages.
                    </p>
                    <div className="pt-4 flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Real-time Propagation</span>
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> High Priority Logic</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
