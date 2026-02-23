'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, Eye, Download, Loader2, X, Check, FileText } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { getFileUrl } from '@/lib/utils'
import Image from 'next/image'

interface Document {
    id: number
    title: string
    buttonLabel: string
    type: string
    filename: string
    filepath: string
    filesize: number
    uploadedAt: string
}

interface DocumentListProps {
    documents: Document[]
    onUpdate: () => void
}

import { toast } from 'sonner'

export function DocumentList({ documents, onUpdate }: DocumentListProps) {
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editTitle, setEditTitle] = useState('')
    const [editButtonLabel, setEditButtonLabel] = useState('')
    const [deleting, setDeleting] = useState<number | null>(null)
    const [preview, setPreview] = useState<Document | null>(null)

    const handleEdit = (doc: Document) => {
        setEditingId(doc.id)
        setEditTitle(doc.title)
        setEditButtonLabel(doc.buttonLabel)
    }

    const handleSaveEdit = async (id: number) => {
        const promise = apiClient.updateDocument(id, {
            title: editTitle,
            buttonLabel: editButtonLabel,
        })

        toast.promise(promise, {
            loading: 'Updating document...',
            success: () => {
                setEditingId(null)
                onUpdate()
                return 'Document updated successfully'
            },
            error: (err) => `Update failed: ${err.message}`,
        })
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this document?')) return

        setDeleting(id)
        const promise = apiClient.deleteDocument(id)

        toast.promise(promise, {
            loading: 'Deleting document...',
            success: () => {
                onUpdate()
                return 'Document deleted successfully'
            },
            error: (err) => `Delete failed: ${err.message}`,
        })

        try {
            await promise
        } catch (error) {
            console.error('Delete failed:', error)
        } finally {
            setDeleting(null)
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    if (documents.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No documents uploaded yet</p>
                <p className="text-sm">Upload your first document using the form above</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {documents.map((doc) => (
                    <motion.div
                        key={doc.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
                    >
                        {/* Preview Section */}
                        <div className="relative aspect-[3/2] bg-slate-100 overflow-hidden">
                            {doc.type === 'form' ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                    <FileText className="w-10 h-10 mb-2 opacity-50" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">PDF Document</span>
                                </div>
                            ) : (
                                <Image
                                    src={getFileUrl(doc.filepath)}
                                    alt={doc.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                <button
                                    onClick={() => setPreview(doc)}
                                    className="p-2 bg-white/90 rounded-full hover:bg-white text-slate-900 transition-transform hover:scale-110"
                                    title="Preview"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleEdit(doc)}
                                    className="p-2 bg-white/90 rounded-full hover:bg-white text-blue-600 transition-transform hover:scale-110"
                                    title="Edit"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    className="p-2 bg-white/90 rounded-full hover:bg-white text-red-600 transition-transform hover:scale-110"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-3 flex-1 flex flex-col">
                            {editingId === doc.id ? (
                                <div className="space-y-2">
                                    <input
                                        autoFocus
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full text-xs font-bold px-2 py-1 bg-slate-50 border border-purple-200 rounded"
                                    />
                                    <input
                                        value={editButtonLabel}
                                        onChange={(e) => setEditButtonLabel(e.target.value)}
                                        className="w-full text-xs px-2 py-1 bg-slate-50 border border-purple-200 rounded"
                                    />
                                    <div className="flex gap-1 pt-1">
                                        <button onClick={() => handleSaveEdit(doc.id)} className="flex-1 bg-green-500 text-white text-[10px] font-bold py-1 rounded hover:bg-green-600">SAVE</button>
                                        <button onClick={() => setEditingId(null)} className="flex-1 bg-slate-200 text-slate-600 text-[10px] font-bold py-1 rounded hover:bg-slate-300">CANCEL</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-semibold text-sm text-slate-800 line-clamp-1" title={doc.title}>{doc.title}</h3>
                                    <p className="text-xs text-slate-500 mb-2 truncate">Label: {doc.buttonLabel}</p>

                                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-50">
                                        <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded uppercase tracking-wide">
                                            {doc.filename.split('.').pop()}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-mono">
                                            {formatFileSize(doc.filesize)}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {preview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreview(null)}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold">{preview.title}</h2>
                                    <button
                                        onClick={() => setPreview(null)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {preview.type === 'form' ? (
                                    <div className="text-center py-12">
                                        <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
                                            <span className="text-4xl font-bold text-red-600">PDF</span>
                                        </div>
                                        <p className="text-lg mb-4">{preview.filename}</p>
                                        <a
                                            href={getFileUrl(preview.filepath)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            <Download className="w-5 h-5" />
                                            Download PDF
                                        </a>
                                    </div>
                                ) : (
                                    <div className="relative w-full" style={{ minHeight: '400px' }}>
                                        <Image
                                            src={getFileUrl(preview.filepath)}
                                            alt={preview.title}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
