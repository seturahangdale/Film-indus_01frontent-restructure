'use client'

import {
    MessageSquare,
    FileText,
    Files,
    Image as ImageIcon,
    ArrowUpRight,
    TrendingUp,
    Users,
    Clock
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface DashboardOverviewProps {
    stats: {
        totalContacts: number
        totalApplications: number
        totalDocuments: number
        totalGalleryItems: number
    }
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
    const statCards = [
        {
            label: 'Contact Messages',
            count: stats.totalContacts,
            icon: MessageSquare,
            color: 'bg-blue-500',
            trend: '+12%',
            desc: 'Total inquiries received'
        },
        {
            label: 'Project Applications',
            count: stats.totalApplications,
            icon: FileText,
            color: 'bg-purple-500',
            trend: '+5%',
            desc: 'New film project requests'
        },
        {
            label: 'Active Documents',
            count: stats.totalDocuments,
            icon: Files,
            color: 'bg-emerald-500',
            trend: 'Stable',
            desc: 'Forms and pamphlets'
        },
        {
            label: 'Gallery Showcases',
            count: stats.totalGalleryItems,
            icon: ImageIcon,
            color: 'bg-amber-500',
            trend: '+8',
            desc: 'Location photos live'
        },
    ]

    return (
        <div className="space-y-8 p-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight leading-none">
                        Dashboard <span className="text-muted-foreground font-light">Overview</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 font-medium text-sm lg:text-base">Welcome back, Administrator. Here's your system heart-beat.</p>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-card rounded-2xl shadow-sm border border-border text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-purple-500" />
                        Last Sync: Just now
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-none shadow-sm ring-1 ring-border bg-card">
                            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-[0.03] dark:opacity-[0.07] -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-1000`} />
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3.5 rounded-2xl ${stat.color} text-white shadow-lg ring-4 ring-white transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                                        <stat.icon size={22} />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-800/30">
                                        <TrendingUp size={10} />
                                        {stat.trend}
                                    </div>
                                </div>
                                <CardTitle className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mt-6">
                                    {stat.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl lg:text-5xl font-display font-bold text-foreground tabular-nums leading-none">
                                    {stat.count}
                                </div>
                                <p className="text-xs text-muted-foreground mt-3 font-medium tracking-tight">{stat.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-border rounded-[2rem] overflow-hidden bg-card">
                    <CardHeader className="bg-muted/30 dark:bg-muted/10 border-b border-border px-8 py-7">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-bold flex items-center gap-3 text-foreground">
                                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <ArrowUpRight size={16} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                Live Activity Feed
                            </CardTitle>
                            <button className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 hover:text-purple-700 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full transition-all">View Analytics</button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-center gap-5 px-8 py-6 hover:bg-muted/20 transition-colors group cursor-default">
                                    <div className="w-14 h-14 rounded-2xl bg-background shadow-sm border border-border flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                        👤
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">New Contact Inquiry</p>
                                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">2h ago</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate mt-1 font-medium">Application for "Heritage Promo" received from Rahul Sharma.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* System Health */}
                <Card className="border-none shadow-sm ring-1 ring-border rounded-3xl overflow-hidden bg-card">
                    <CardHeader className="bg-muted/30 dark:bg-muted/10 border-b border-border px-8 py-6">
                        <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                            <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
                            System Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-bold">API Status</span>
                                <span className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full text-[10px] uppercase">Online</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="w-[100%] h-full bg-emerald-500 rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-bold">Storage Usage</span>
                                <span className="text-foreground font-bold">45%</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="w-[45%] h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-4">
                            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30">
                                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium leading-relaxed">
                                    "System performance index is optimal reaching 98.4ms average response time."
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
