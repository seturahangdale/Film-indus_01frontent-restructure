'use client'

import {
    LayoutDashboard,
    MessageSquare,
    FileText,
    Files,
    Edit,
    Image as ImageIcon,
    Info,
    Share2,
    Megaphone,
    LogOut,
    ChevronLeft,
    ChevronRight,
    User,
    Settings,
    X
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SidebarProps {
    activeSection: string
    onSectionChange: (section: string) => void
    mobileOpen?: boolean
    setMobileOpen?: (open: boolean) => void
    isCollapsed: boolean
    onToggleCollapse: (collapsed: boolean) => void
}

export function AdminSidebar({
    activeSection,
    onSectionChange,
    mobileOpen,
    setMobileOpen,
    isCollapsed,
    onToggleCollapse
}: SidebarProps) {

    // Close mobile menu on section change
    useEffect(() => {
        if (mobileOpen && setMobileOpen) {
            setMobileOpen(false)
        }
    }, [activeSection])

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
        { id: 'applications', label: 'Applications', icon: FileText },
        { id: 'documents', label: 'Documents', icon: Files },
        { id: 'content', label: 'Subsidy Content', icon: Edit },
        { id: 'gallery', label: 'Gallery Manager', icon: ImageIcon },
        { id: 'about', label: 'About Us', icon: Info },
        { id: 'social', label: 'Social Media', icon: Share2 },
        { id: 'promotion', label: 'Promotion', icon: Megaphone },
        { id: 'settings', label: 'Account Settings', icon: Settings },
    ]

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setMobileOpen?.(false)}
                />
            )}

            <aside
                className={cn(
                    "fixed left-0 top-0 h-full bg-slate-900 dark:bg-sidebar text-slate-300 transition-all duration-500 ease-in-out z-[50] flex flex-col shadow-2xl border-r border-slate-800/50 dark:border-sidebar-border",
                    isCollapsed ? "lg:w-20" : "lg:w-72",
                    mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-xl text-white tracking-tight">Admin<span className="text-purple-500">Panel</span></span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Management System</span>
                        </div>
                    )}
                    {isCollapsed && <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white">A</div>}

                    <button
                        onClick={() => onToggleCollapse(!isCollapsed)}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative",
                                activeSection === item.id
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                                    : "hover:bg-slate-800 dark:hover:bg-sidebar-accent hover:text-white"
                            )}
                        >
                            <item.icon size={22} className={cn(
                                "shrink-0",
                                activeSection === item.id ? "text-white" : "text-slate-400 group-hover:text-purple-400 transition-colors"
                            )} />
                            {!isCollapsed && (
                                <span className="font-medium text-[15px] whitespace-nowrap">{item.label}</span>
                            )}

                            {/* Active Indicator Tooltip (Hidden when not collapsed) */}
                            {isCollapsed && (
                                <div className="absolute left-16 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer / User */}
                <div className="p-4 mt-auto border-t border-slate-800/50 dark:border-sidebar-border">
                    <div className={cn(
                        "flex items-center bg-slate-800/50 dark:bg-sidebar-accent/50 rounded-2xl p-3 border border-slate-700/30 dark:border-sidebar-border/50",
                        isCollapsed ? "justify-center" : "gap-3"
                    )}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                            <User size={20} className="text-white" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-white truncate">Administrator</span>
                                <span className="text-[11px] text-slate-500 font-medium">MP Film Industry</span>
                            </div>
                        )}
                    </div>

                    <button
                        className={cn(
                            "w-full mt-4 flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200",
                            isCollapsed ? "justify-center" : ""
                        )}
                        onClick={async () => {
                            try {
                                const response = await fetch('/api/auth/logout', { method: 'POST' })
                                if (response.ok) {
                                    window.location.href = '/'
                                }
                            } catch (error) {
                                console.error('Logout failed:', error)
                                window.location.href = '/'
                            }
                        }}
                    >
                        <LogOut size={20} />
                        {!isCollapsed && <span className="font-bold text-[15px]">Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    )
}
