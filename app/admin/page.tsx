'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentUpload } from '@/components/admin/document-upload'
import { DocumentList } from '@/components/admin/document-list'
import { DocumentSection } from '@/components/admin/document-section'
import { SubsidyEditor } from '@/components/admin/subsidy-editor'
import { GalleryManager } from '@/components/admin/gallery-manager'
import AboutManager from '@/components/admin/about-manager'
import PromotionManager from '@/components/admin/promotion-manager'
import { SocialManager } from '@/components/admin/social-manager'
import { AccountManager } from '@/components/admin/account-manager'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { DashboardOverview } from '@/components/admin/dashboard-overview'
import { Menu, X, Ghost, FileText, Image as ImageIcon, CreditCard, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AdminPage() {
    const [activeSection, setActiveSection] = useState('dashboard')
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [contacts, setContacts] = useState<any[]>([])
    const [applications, setApplications] = useState<any[]>([])
    const [documents, setDocuments] = useState<any[]>([])
    const [forms, setForms] = useState<any[]>([])
    const [pamphlets, setPamphlets] = useState<any[]>([])
    const [visitingCards, setVisitingCards] = useState<any[]>([])
    const [galleryCount, setGalleryCount] = useState(0)
    const [loading, setLoading] = useState(true)

    // Pagination State
    const [contactsPage, setContactsPage] = useState(1)
    const [applicationsPage, setApplicationsPage] = useState(1)
    const itemsPerPage = 6

    const paginatedContacts = contacts.slice((contactsPage - 1) * itemsPerPage, contactsPage * itemsPerPage)
    const paginatedApplications = applications.slice((applicationsPage - 1) * itemsPerPage, applicationsPage * itemsPerPage)
    const totalContactsPages = Math.ceil(contacts.length / itemsPerPage)
    const totalApplicationsPages = Math.ceil(applications.length / itemsPerPage)

    const fetchDocuments = async () => {
        try {
            const { documents } = await apiClient.getAllDocuments()
            setDocuments(documents)
            setForms(documents.filter((d: any) => d.type === 'form'))
            setPamphlets(documents.filter((d: any) => d.type === 'pamphlet'))
            setVisitingCards(documents.filter((d: any) => d.type === 'visiting_card'))
        } catch (error) {
            console.error('Failed to fetch documents', error)
        }
    }

    const fetchGalleryCount = async () => {
        try {
            const res = await apiClient.getGalleryData()
            setGalleryCount(res.items.length)
        } catch (error) {
            console.error('Failed to fetch gallery', error)
        }
    }

    useEffect(() => {
        // Check for auth token in localStorage
        const token = localStorage.getItem('admin_token')
        if (!token) {
            window.location.href = '/login'
            return
        }

        const fetchData = async () => {
            try {
                const [contactsData, applicationsData] = await Promise.all([
                    apiClient.getAllContacts(),
                    apiClient.getAllApplications()
                ])
                setContacts(contactsData)
                setApplications(applicationsData)
                await Promise.all([fetchDocuments(), fetchGalleryCount()])
            } catch (error) {
                console.error("Failed to fetch admin data", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-background gap-4">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Initializing Admin Core</p>
            </div>
        )
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return (
                    <DashboardOverview
                        stats={{
                            totalContacts: contacts.length,
                            totalApplications: applications.length,
                            totalDocuments: documents.length,
                            totalGalleryItems: galleryCount
                        }}
                    />
                )
            case 'contacts':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-card p-8 rounded-[2.5rem] border border-slate-100 dark:border-border shadow-sm ring-1 ring-slate-200/50 dark:ring-border/50">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">Contact Messages</h1>
                                <p className="text-slate-500 dark:text-muted-foreground text-sm font-medium mt-1">Direct inquiries from the website portal</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-2xl border border-purple-100 dark:border-purple-800/50">
                                <span className="text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-widest">{contacts.length} Total Messages</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-card rounded-[2.5rem] border border-slate-100 dark:border-border shadow-xl shadow-slate-200/20 dark:shadow-none overflow-hidden ring-1 ring-slate-200/50 dark:ring-border/50">
                            <div className="overflow-x-auto custom-scrollbar">
                                <Table className="min-w-[1000px] border-collapse">
                                    <TableHeader className="bg-slate-50/50 dark:bg-muted/30 border-b border-slate-100 dark:border-border">
                                        <TableRow className="hover:bg-transparent border-none">
                                            <TableHead className="py-6 px-8 text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Sequence</TableHead>
                                            <TableHead className="py-6 px-4 text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Correspondent</TableHead>
                                            <TableHead className="py-6 px-4 text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Contact Metadata</TableHead>
                                            <TableHead className="py-6 px-4 text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Inquiry Subject</TableHead>
                                            <TableHead className="py-6 px-8 text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Message Content</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedContacts.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-32">
                                                    <div className="flex flex-col items-center justify-center space-y-4">
                                                        <div className="w-16 h-16 bg-slate-50 dark:bg-muted rounded-3xl flex items-center justify-center text-slate-300">
                                                            <MessageSquare size={32} />
                                                        </div>
                                                        <p className="text-slate-400 dark:text-muted-foreground font-display font-medium">No encrypted transmissions discovered.</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedContacts.map((contact, idx) => (
                                                <TableRow key={contact.id} className="group hover:bg-slate-50/80 dark:hover:bg-muted/30 border-b border-slate-50 dark:border-border transition-all duration-300">
                                                    <TableCell className="py-6 px-8">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-muted flex items-center justify-center text-[10px] font-black text-slate-500">
                                                                #{contacts.length - ((contactsPage - 1) * itemsPerPage + idx)}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-foreground leading-none">{contact.name}</span>
                                                            <span className="text-[11px] text-slate-400 dark:text-muted-foreground font-medium mt-1 uppercase tracking-tighter">Authorized Portal User</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-4">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[12px] text-indigo-600 dark:text-indigo-400 font-bold tracking-tight">{contact.email}</span>
                                                            <span className="text-[10px] text-slate-500 dark:text-muted-foreground font-mono font-medium">{contact.phone}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-4">
                                                        <div className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-[10px] font-bold inline-block border border-amber-100 dark:border-amber-800/30 uppercase tracking-wider">
                                                            {contact.subject}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-8">
                                                        <p className="text-sm text-slate-600 dark:text-muted-foreground leading-relaxed max-w-sm line-clamp-2" title={contact.message}>
                                                            {contact.message}
                                                        </p>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination UI */}
                            {totalContactsPages > 1 && (
                                <div className="p-6 bg-slate-50/30 dark:bg-muted/10 border-t border-slate-100 dark:border-border flex items-center justify-between">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        Page {contactsPage} of {totalContactsPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setContactsPage(p => Math.max(1, p - 1))}
                                            disabled={contactsPage === 1}
                                            className="rounded-xl border-slate-200 dark:border-border hover:bg-white transition-all h-9 px-4 font-bold text-[11px] uppercase tracking-wider"
                                        >
                                            <ChevronLeft size={14} className="mr-1" /> Prev
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setContactsPage(p => Math.min(totalContactsPages, p + 1))}
                                            disabled={contactsPage === totalContactsPages}
                                            className="rounded-xl border-slate-200 dark:border-border hover:bg-white transition-all h-9 px-4 font-bold text-[11px] uppercase tracking-wider"
                                        >
                                            Next <ChevronRight size={14} className="ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            case 'applications':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-card p-8 rounded-[2.5rem] border border-slate-100 dark:border-border shadow-sm ring-1 ring-slate-200/50 dark:ring-border/50">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">Project Pipeline</h1>
                                <p className="text-slate-500 dark:text-muted-foreground text-sm font-medium mt-1">Incoming project applications and production requests</p>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">{applications.length} Active Requests</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-card rounded-[2.5rem] border border-slate-100 dark:border-border shadow-xl shadow-slate-200/20 dark:shadow-none overflow-hidden ring-1 ring-slate-200/50 dark:ring-border/50">
                            <div className="overflow-x-auto custom-scrollbar">
                                <Table className="min-w-[1200px] border-collapse">
                                    <TableHeader className="bg-slate-50/50 dark:bg-muted/30 border-b border-slate-100 dark:border-border">
                                        <TableRow className="hover:bg-transparent border-none">
                                            <TableHead className="py-6 px-8 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Asset ID</TableHead>
                                            <TableHead className="py-6 px-4 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Contact Node</TableHead>
                                            <TableHead className="py-6 px-4 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Production Hub</TableHead>
                                            <TableHead className="py-6 px-4 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Project Specs</TableHead>
                                            <TableHead className="py-6 px-4 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Logistics</TableHead>
                                            <TableHead className="py-6 px-8 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em]">Observations</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedApplications.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-32">
                                                    <div className="flex flex-col items-center justify-center space-y-4">
                                                        <div className="w-16 h-16 bg-slate-50 dark:bg-muted rounded-3xl flex items-center justify-center text-slate-300">
                                                            <Ghost size={32} />
                                                        </div>
                                                        <p className="text-slate-400 dark:text-muted-foreground font-display font-medium">Pipeline is currently de-activated.</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedApplications.map((app, idx) => (
                                                <TableRow key={app.id} className="group hover:bg-slate-50/80 dark:hover:bg-muted/30 border-b border-slate-50 dark:border-border transition-all duration-300">
                                                    <TableCell className="py-6 px-8">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-muted flex items-center justify-center text-[10px] font-black text-slate-600">
                                                            #{applications.length - ((applicationsPage - 1) * itemsPerPage + idx)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-foreground">{app.fullName}</span>
                                                            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-tighter mt-1">{app.email}</span>
                                                            <span className="text-[10px] text-slate-400 dark:text-muted-foreground font-mono mt-0.5">{app.phone}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-none">{app.productionCompany}</span>
                                                            <span className="text-[10px] text-slate-400 dark:text-muted-foreground font-bold uppercase tracking-widest mt-1.5">Industry entity</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-4">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg text-[10px] font-black border border-purple-100 dark:border-purple-800/30 inline-block w-fit uppercase tracking-wider">
                                                                {app.projectTitle}
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{app.projectType}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-4">
                                                        <div className="flex flex-col gap-1.5">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-4 h-4 rounded-md bg-slate-100 dark:bg-muted flex items-center justify-center text-[8px] font-bold text-slate-500">LOC</div>
                                                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{app.preferredLocation}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-4 h-4 rounded-md bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-[8px] font-bold text-emerald-600">$$$</div>
                                                                <span className="text-[11px] font-black text-slate-900 dark:text-foreground">{app.estimatedBudget}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-6 px-8">
                                                        <p className="text-[13px] text-slate-500 dark:text-muted-foreground leading-relaxed italic line-clamp-2 max-w-xs" title={app.additionalNotes}>
                                                            "{app.additionalNotes}"
                                                        </p>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination UI */}
                            {totalApplicationsPages > 1 && (
                                <div className="p-6 bg-slate-50/30 dark:bg-muted/10 border-t border-slate-100 dark:border-border flex items-center justify-between">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        Page {applicationsPage} of {totalApplicationsPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setApplicationsPage(p => Math.max(1, p - 1))}
                                            disabled={applicationsPage === 1}
                                            className="rounded-xl border-slate-200 dark:border-border hover:bg-white transition-all h-9 px-4 font-bold text-[11px] uppercase tracking-wider"
                                        >
                                            <ChevronLeft size={14} className="mr-1" /> Prev
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setApplicationsPage(p => Math.min(totalApplicationsPages, p + 1))}
                                            disabled={applicationsPage === totalApplicationsPages}
                                            className="rounded-xl border-slate-200 dark:border-border hover:bg-white transition-all h-9 px-4 font-bold text-[11px] uppercase tracking-wider"
                                        >
                                            Next <ChevronRight size={14} className="ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            case 'documents':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Forms Section - Full Width */}
                        <div className="w-full">
                            <DocumentSection
                                title="Forms & Documents"
                                description="Manage downloadable PDF forms and official documents"
                                icon={<FileText className="w-5 h-5" />}
                                type="form"
                                documents={forms}
                                onUpdate={fetchDocuments}
                                colorClass="text-purple-600 bg-purple-100"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Pamphlets Section */}
                            <DocumentSection
                                title="Pamphlets"
                                description="Promotional pamphlets and flyers"
                                icon={<ImageIcon className="w-5 h-5" />}
                                type="pamphlet"
                                documents={pamphlets}
                                onUpdate={fetchDocuments}
                                colorClass="text-indigo-600 bg-indigo-100"
                            />

                            {/* Visiting Cards Section */}
                            <DocumentSection
                                title="Visiting Cards"
                                description="Official digital visiting cards"
                                icon={<CreditCard className="w-5 h-5" />}
                                type="visiting_card"
                                documents={visitingCards}
                                onUpdate={fetchDocuments}
                                colorClass="text-amber-600 bg-amber-100"
                            />
                        </div>
                    </div>
                )
            case 'content': return <SubsidyEditor />
            case 'gallery': return <GalleryManager />
            case 'about': return <AboutManager />
            case 'social': return <SocialManager />
            case 'promotion': return <PromotionManager />
            case 'settings': return <AccountManager />
            default: return null
        }
    }

    return (
        <div className="min-h-screen bg-background dark:bg-[#0f0f0f] flex flex-col lg:flex-row transition-colors duration-300">
            <AdminSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                mobileOpen={isMobileSidebarOpen}
                setMobileOpen={setIsMobileSidebarOpen}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={setIsSidebarCollapsed}
            />

            {/* Mobile Header Bar */}
            <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-border dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-[40] shadow-sm">
                <div className="flex flex-col">
                    <span className="font-display font-bold text-lg text-foreground tracking-tight">Admin<span className="text-purple-600">Panel</span></span>
                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em]">{activeSection}</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="rounded-xl hover:bg-slate-50"
                >
                    <Menu className="w-6 h-6 text-slate-600" />
                </Button>
            </div>

            <main className={cn(
                "flex-1 justify-center transition-all duration-500 ease-in-out",
                isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
            )}>
                <div className="max-w-7xl mx-auto px-6 py-10 lg:px-12">
                    <div className="mb-8 hidden lg:flex justify-end">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-card dark:bg-slate-900/50 px-4 py-2 rounded-full border border-border dark:border-slate-800 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live System Production Ready
                        </div>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    )
}
