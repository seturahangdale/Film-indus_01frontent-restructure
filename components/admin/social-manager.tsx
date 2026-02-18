'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Youtube,
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    Save,
    Loader2,
    Link as LinkIcon,
    Video,
    Info
} from 'lucide-react'
import { Button } from '../ui/button'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'

export function SocialManager() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchSocial()
    }, [])

    const fetchSocial = async () => {
        try {
            const res = await apiClient.getSocialData()
            setData(res)
        } catch (error) {
            console.error('Failed to fetch social:', error)
            toast.error('Failed to load social data')
        } finally {
            setLoading(false)
        }
    }

    const normalizeYoutubeUrl = (url: string) => {
        if (!url) return ''

        // Check if it's a full iframe tag
        if (url.includes('<iframe')) {
            const srcMatch = url.match(/src=["']([^"']+)["']/);
            if (srcMatch && srcMatch[1]) {
                return srcMatch[1];
            }
        }

        if (url.includes('/embed/')) return url

        let videoId = ''
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split(/[?#]/)[0]
        } else if (url.includes('v=')) {
            videoId = url.split('v=')[1].split(/[&#?]/)[0]
        } else if (url.includes('/v/')) {
            videoId = url.split('/v/')[1].split(/[?#]/)[0]
        } else if (url.includes('/shorts/')) {
            videoId = url.split('/shorts/')[1].split(/[?#]/)[0]
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`
        }
        return url
    }

    const handleYoutubeUpdate = (url: string) => {
        setData({ ...data, youtubeUrl: normalizeYoutubeUrl(url) })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await apiClient.updateSocialData(data)
            toast.success('Social data saved successfully!')
        } catch (error) {
            console.error('Save error:', error)
            toast.error('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    const updateLink = (index: number, newUrl: string) => {
        const updatedLinks = [...data.socialLinks]
        updatedLinks[index].url = newUrl
        setData({ ...data, socialLinks: updatedLinks })
    }

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />
            case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />
            case 'youtube': return <Youtube className="w-5 h-5 text-red-600" />
            case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-700" />
            case 'twitter': return <Twitter className="w-5 h-5 text-slate-900" />
            default: return <LinkIcon className="w-5 h-5" />
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
                <p>Loading Social Manager...</p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50">
                <div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground tracking-tight leading-none">Social <span className="text-slate-300 dark:text-muted-foreground font-light text-2xl ml-1">& Media</span></h2>
                    <p className="text-sm text-slate-500 dark:text-muted-foreground mt-2 font-medium italic">Synchronize digital touchpoints and video narratives.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-10 py-7 h-auto shadow-xl shadow-purple-900/20 gap-3 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 border-2 border-white/20 rounded-md p-0.5" />}
                    {saving ? 'Synchronizing...' : 'Live Sync Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* YouTube Section */}
                <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50 overflow-hidden relative group hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-0 group-hover:opacity-[0.03] -mr-12 -mt-12 rounded-full transition-all duration-1000" />
                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-14 h-14 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center shadow-inner border border-red-100/50 dark:border-red-900/30 group-hover:scale-110 transition-transform duration-500">
                            <Youtube size={26} />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] mb-1">Cinematic Narrative</h3>
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground tracking-tight">Primary Video Highlight</h4>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                Embed Endpoint URL
                            </label>
                            <input
                                type="text"
                                value={data.youtubeUrl}
                                onChange={(e) => handleYoutubeUpdate(e.target.value)}
                                placeholder="https://www.youtube.com/embed/..."
                                className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-red-600/20 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-100 dark:ring-border"
                            />
                            <div className="flex gap-2 items-start mt-3 ml-2">
                                <Info size={14} className="text-slate-300 mt-1 shrink-0" />
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                                    Integration requires high-fidelity sequences. Standard watch directives will be auto-normalized to iframe production standards.
                                </p>
                            </div>
                        </div>

                        <div className="aspect-video bg-slate-900 dark:bg-background rounded-[2rem] overflow-hidden border border-slate-800 dark:border-border shadow-2xl relative flex items-center justify-center ring-8 ring-slate-50 dark:ring-muted/50 transition-all duration-500 group-hover:ring-slate-100/50 dark:group-hover:ring-border/50">
                            {data.youtubeUrl ? (
                                <iframe
                                    src={data.youtubeUrl}
                                    className="w-full h-full"
                                    title="Preview"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="text-center group/empty">
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                                        <Video className="w-8 h-8 text-slate-700" />
                                    </div>
                                    <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">No Signal Detected</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Social Links Section */}
                <section className="bg-white dark:bg-card p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50 overflow-hidden relative group hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-0 group-hover:opacity-[0.03] -mr-12 -mt-12 rounded-full transition-all duration-1000" />
                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner border border-blue-100/50 dark:border-blue-900/30 group-hover:scale-110 transition-transform duration-500">
                            <LinkIcon size={26} />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] mb-1">Global Connectivity</h3>
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-foreground tracking-tight">Platform Synergy</h4>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {data.socialLinks.map((link: any, index: number) => (
                            <div key={link.platform} className="p-5 bg-slate-50/30 dark:bg-muted/30 rounded-2xl border border-slate-100/50 dark:border-border/50 hover:bg-white dark:hover:bg-muted/50 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500 ring-1 ring-slate-100 dark:ring-border/30 group/social">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-50 group-hover/social:scale-110 transition-transform">
                                            {getIcon(link.platform)}
                                        </div>
                                        <span className="font-display font-black text-slate-900 uppercase tracking-[0.15em] text-[10px]">{link.name}</span>
                                    </div>
                                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${link.url ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-800/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200/50 dark:border-slate-700'}`}>
                                        {link.url ? 'Active Path' : 'Disconnected'}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => updateLink(index, e.target.value)}
                                    placeholder={`Registry URL for ${link.name}`}
                                    className="w-full px-5 py-3.5 bg-white dark:bg-background border-none rounded-xl outline-none focus:ring-2 focus:ring-purple-600/20 text-slate-700 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-inner ring-1 ring-slate-100 dark:ring-border"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
