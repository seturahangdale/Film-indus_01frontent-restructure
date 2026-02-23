'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DocumentUpload } from './document-upload'
import { DocumentList } from './document-list'
import { motion, AnimatePresence } from 'framer-motion'

interface DocumentSectionProps {
    title: string
    icon: React.ReactNode
    type: 'form' | 'pamphlet' | 'visiting_card'
    documents: any[]
    onUpdate: () => void
    description?: string
    colorClass?: string
}

export function DocumentSection({
    title,
    icon,
    type,
    documents,
    onUpdate,
    description,
    colorClass = "text-purple-600 bg-purple-100"
}: DocumentSectionProps) {
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    return (
        <Card className="border-none shadow-sm ring-1 ring-slate-200 rounded-3xl overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-5 flex flex-row items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                        {icon}
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
                        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
                    </div>
                </div>
                <Button
                    variant={isUploadOpen ? "secondary" : "default"}
                    size="sm"
                    onClick={() => setIsUploadOpen(!isUploadOpen)}
                    className={`gap-2 transition-all ${!isUploadOpen ? 'bg-slate-900 hover:bg-slate-800' : ''}`}
                >
                    {isUploadOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {isUploadOpen ? 'Cancel' : 'Add New'}
                </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1 bg-slate-50/30">
                <AnimatePresence>
                    {isUploadOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-b border-slate-100 bg-white overflow-hidden"
                        >
                            <div className="p-6">
                                <DocumentUpload
                                    type={type}
                                    onUploadSuccess={() => {
                                        onUpdate()
                                        setIsUploadOpen(false)
                                    }}
                                    isExpanded={true}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="p-6">
                    <DocumentList documents={documents} onUpdate={onUpdate} />
                </div>
            </CardContent>
        </Card>
    )
}
