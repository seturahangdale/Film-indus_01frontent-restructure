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
                <div className={cn(
                    "flex items-center border-b border-slate-800/50 shrink-0",
                    isCollapsed ? "flex-col py-6 space-y-4" : "p-6 justify-between"
                )}>
                    <div className={cn(
                        "flex items-center",
                        isCollapsed ? "justify-center" : "gap-3"
                    )}>
                        <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-900/20 shrink-0">
                            A
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-lg text-white tracking-tight leading-none">Admin<span className="text-purple-500">Panel</span></span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Management System</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => onToggleCollapse(!isCollapsed)}
                        className={cn(
                            "p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white bg-slate-800/30",
                            isCollapsed ? "" : ""
                        )}
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={cn(
                                "w-full flex items-center rounded-2xl transition-all duration-300 group relative",
                                isCollapsed ? "justify-center p-3" : "px-4 py-3.5 gap-4",
                                activeSection === item.id
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                                    : "hover:bg-slate-800 dark:hover:bg-sidebar-accent hover:text-white text-slate-400"
                            )}
                        >
                            <item.icon size={22} className={cn(
                                "shrink-0 transition-transform duration-300 group-hover:scale-110",
                                activeSection === item.id ? "text-white" : "group-hover:text-purple-400"
                            )} />
                            {!isCollapsed && (
                                <span className="font-bold text-[14px] whitespace-nowrap tracking-wide">{item.label}</span>
                            )}

                            {/* Active Indicator Tooltip (Show when collapsed) */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-xl border border-slate-700 z-[100] whitespace-nowrap">
                                    {item.label}
                                </div>
                            )}

                            {/* Active Dot */}
                            {activeSection === item.id && isCollapsed && (
                                <div className="absolute -left-1 w-1 h-6 bg-white rounded-r-full" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer / User */}
                <div className="p-4 mt-auto border-t border-slate-800/50 shrink-0 bg-slate-900/50">
                    <div className={cn(
                        "flex items-center bg-slate-800/30 rounded-2xl p-2 border border-slate-700/30",
                        isCollapsed ? "justify-center" : "gap-3 px-3"
                    )}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg ring-2 ring-purple-500/20">
                            <User size={20} className="text-white" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-[13px] font-bold text-white truncate leading-tight">Administrator</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">MP Film Industry</span>
                            </div>
                        )}
                    </div>

                    <button
                        className={cn(
                            "w-full mt-4 flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 font-bold text-[13px] group",
                            isCollapsed ? "justify-center px-0" : ""
                        )}
                        onClick={() => {
                            localStorage.removeItem('admin_token')
                            window.location.href = '/login'
                        }}
                    >
                        <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                        {!isCollapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    )
}
