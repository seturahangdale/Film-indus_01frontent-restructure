'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileText, Image as ImageIcon, CreditCard, Loader2, Pencil, Trash2, Eye } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

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

interface DocumentUploadProps {
    type: 'form' | 'pamphlet' | 'visiting_card'
    onUploadSuccess: () => void
}

export function DocumentUpload({ type, onUploadSuccess }: DocumentUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState('')
    const [buttonLabel, setButtonLabel] = useState(getDefaultButtonLabel(type))
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0])
        }
    }

    const handleFileSelect = (selectedFile: File) => {
        // Validate file type
        const allowedTypes: Record<string, string[]> = {
            form: ['application/pdf'],
            pamphlet: ['image/png', 'image/jpeg'],
            visiting_card: ['image/png', 'image/jpeg'],
        }

        if (!allowedTypes[type].includes(selectedFile.type)) {
            setError(`Invalid file type. Please upload ${type === 'form' ? 'PDF' : 'PNG/JPEG'} only.`)
            return
        }

        // Validate file size (10MB)
        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('File size exceeds 10MB limit')
            return
        }

        setFile(selectedFile)
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''))
        setError('')
    }

    const handleUpload = async () => {
        if (!file || !title || !buttonLabel) {
            setError('Please fill all fields')
            return
        }

        setUploading(true)
        setError('')

        try {
            await apiClient.uploadDocument(file, type, title, buttonLabel)
            setFile(null)
            setTitle('')
            setButtonLabel(getDefaultButtonLabel(type))
            onUploadSuccess()
        } catch (err: any) {
            setError(err.message || 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            {/* Drag & Drop Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragActive
                        ? 'border-[#8B6B3E] bg-[#8B6B3E]/5'
                        : 'border-gray-300 hover:border-[#8B6B3E] hover:bg-gray-50'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={type === 'form' ? '.pdf' : '.png,.jpg,.jpeg'}
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                />

                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold mb-2">
                    {file ? file.name : 'Click or drag file to upload'}
                </p>
                <p className="text-sm text-gray-500">
                    {type === 'form' ? 'PDF files only' : 'PNG or JPEG images'} • Max 10MB
                </p>
            </div>

            {/* Form Fields */}
            {file && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-2">Document Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B3E] focus:border-transparent"
                            placeholder="Enter document title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Button Label</label>
                        <input
                            type="text"
                            value={buttonLabel}
                            onChange={(e) => setButtonLabel(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B3E] focus:border-transparent"
                            placeholder="e.g., Download Form, View Certificate"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#8B6B3E] to-[#B8860B] text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Upload Document'
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setFile(null)
                                setTitle('')
                                setButtonLabel(getDefaultButtonLabel(type))
                                setError('')
                            }}
                            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

function getDefaultButtonLabel(type: string): string {
    const defaults: Record<string, string> = {
        form: 'Download Form',
        pamphlet: 'View Pamphlet',
        visiting_card: 'Download Card',
    }
    return defaults[type] || 'Download'
}
