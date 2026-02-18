'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, Eye, Download, Loader2, X, Check } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <motion.div
                        key={doc.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {/* Preview */}
                        <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                            {doc.type === 'form' ? (
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-2 bg-red-100 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl font-bold text-red-600">PDF</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{doc.filename}</p>
                                </div>
                            ) : (
                                <Image
                                    src={doc.filepath}
                                    alt={doc.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                            <button
                                onClick={() => setPreview(doc)}
                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                            {editingId === doc.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        placeholder="Title"
                                    />
                                    <input
                                        type="text"
                                        value={editButtonLabel}
                                        onChange={(e) => setEditButtonLabel(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        placeholder="Button Label"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSaveEdit(doc.id)}
                                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center justify-center gap-1"
                                        >
                                            <Check className="w-4 h-4" />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-center gap-1"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h3 className="font-semibold text-lg truncate">{doc.title}</h3>
                                        <p className="text-sm text-gray-600 truncate">
                                            Button: "{doc.buttonLabel}"
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {formatFileSize(doc.filesize)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(doc)}
                                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doc.id)}
                                            disabled={deleting === doc.id}
                                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-1"
                                        >
                                            {deleting === doc.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                            Delete
                                        </button>
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
                                            href={preview.filepath}
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
                                            src={preview.filepath}
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
