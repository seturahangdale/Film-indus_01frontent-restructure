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
import { SubsidyEditor } from '@/components/admin/subsidy-editor'
import { GalleryManager } from '@/components/admin/gallery-manager'
import AboutManager from '@/components/admin/about-manager'
import PromotionManager from '@/components/admin/promotion-manager'
import { SocialManager } from '@/components/admin/social-manager'
import { AccountManager } from '@/components/admin/account-manager'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { DashboardOverview } from '@/components/admin/dashboard-overview'
import { Menu, X, Ghost } from 'lucide-react'
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
                    <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                            <CardTitle className="text-2xl font-bold text-slate-900">Contact Messages</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto -mx-0 sm:mx-0">
                                <Table className="min-w-[800px] lg:min-w-full">
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="hover:bg-transparent border-slate-100">
                                            <TableHead className="font-bold text-slate-800 px-8 py-4">ID</TableHead>
                                            <TableHead className="font-bold text-slate-800">Name</TableHead>
                                            <TableHead className="font-bold text-slate-800">Email</TableHead>
                                            <TableHead className="font-bold text-slate-800">Phone</TableHead>
                                            <TableHead className="font-bold text-slate-800">Subject</TableHead>
                                            <TableHead className="font-bold text-slate-800 pr-8">Message</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {contacts.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-20 text-slate-400">No messages found</TableCell>
                                            </TableRow>
                                        ) : (
                                            contacts.map((contact) => (
                                                <TableRow key={contact.id} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                                                    <TableCell className="px-8 font-medium text-slate-500">#{contact.id}</TableCell>
                                                    <TableCell className="font-bold text-slate-900">{contact.name}</TableCell>
                                                    <TableCell className="text-slate-600">{contact.email}</TableCell>
                                                    <TableCell className="text-slate-600 font-mono text-xs">{contact.phone}</TableCell>
                                                    <TableCell className="text-slate-900 font-medium">{contact.subject}</TableCell>
                                                    <TableCell className="pr-8 text-slate-500 max-w-xs truncate" title={contact.message}>
                                                        {contact.message}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )
            case 'applications':
                return (
                    <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                            <CardTitle className="text-2xl font-bold text-slate-900">Project Applications</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto -mx-0 sm:mx-0">
                                <Table className="min-w-[1000px] lg:min-w-full">
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="hover:bg-transparent border-slate-100">
                                            <TableHead className="font-bold text-slate-800 px-8">ID</TableHead>
                                            <TableHead className="font-bold text-slate-800">Full Name</TableHead>
                                            <TableHead className="font-bold text-slate-800">Email</TableHead>
                                            <TableHead className="font-bold text-slate-800">Phone</TableHead>
                                            <TableHead className="font-bold text-slate-800">Company</TableHead>
                                            <TableHead className="font-bold text-slate-800">Title</TableHead>
                                            <TableHead className="font-bold text-slate-800">Type</TableHead>
                                            <TableHead className="font-bold text-slate-800">Location</TableHead>
                                            <TableHead className="font-bold text-slate-800">Budget</TableHead>
                                            <TableHead className="font-bold text-slate-800 pr-8">Notes</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {applications.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={10} className="text-center py-20 text-slate-400">No applications found</TableCell>
                                            </TableRow>
                                        ) : (
                                            applications.map((app) => (
                                                <TableRow key={app.id} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                                                    <TableCell className="px-8 font-medium text-slate-500">#{app.id}</TableCell>
                                                    <TableCell className="font-bold text-slate-900">{app.fullName}</TableCell>
                                                    <TableCell className="text-slate-600">{app.email}</TableCell>
                                                    <TableCell className="text-slate-600 font-mono text-xs">{app.phone}</TableCell>
                                                    <TableCell className="font-medium text-slate-700">{app.productionCompany}</TableCell>
                                                    <TableCell className="font-bold text-purple-600">{app.projectTitle}</TableCell>
                                                    <TableCell><span className="bg-slate-100 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">{app.projectType}</span></TableCell>
                                                    <TableCell className="text-indigo-600 font-medium">{app.preferredLocation}</TableCell>
                                                    <TableCell className="font-bold text-slate-900">{app.estimatedBudget}</TableCell>
                                                    <TableCell className="pr-8 max-w-xs truncate text-slate-500" title={app.additionalNotes}>
                                                        {app.additionalNotes}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )
            case 'documents':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Forms Section */}
                        <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">📄</div>
                                    Forms Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                    <h4 className="text-sm font-bold text-purple-900 mb-4 uppercase tracking-wider">Upload New Form</h4>
                                    <DocumentUpload type="form" onUploadSuccess={fetchDocuments} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-slate-800 px-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        Current Documents
                                    </h3>
                                    <div className="overflow-x-auto pb-4">
                                        <DocumentList documents={forms} onUpdate={fetchDocuments} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Pamphlets Section */}
                            <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">🖼️</div>
                                        Pamphlets Management
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <DocumentUpload type="pamphlet" onUploadSuccess={fetchDocuments} />
                                    <div className="border-t border-slate-100 pt-6 overflow-x-auto">
                                        <DocumentList documents={pamphlets} onUpdate={fetchDocuments} />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Visiting Cards Section */}
                            <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">🎴</div>
                                        Visiting Cards
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <DocumentUpload type="visiting_card" onUploadSuccess={fetchDocuments} />
                                    <div className="border-t border-slate-100 pt-6 overflow-x-auto">
                                        <DocumentList documents={visitingCards} onUpdate={fetchDocuments} />
                                    </div>
                                </CardContent>
                            </Card>
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
