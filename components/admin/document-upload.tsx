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

export function DocumentUpload({ type, onUploadSuccess, isExpanded = false }: DocumentUploadProps & { isExpanded?: boolean }) {
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
            pamphlet: ['image/png', 'image/jpeg', 'image/jpg'],
            visiting_card: ['image/png', 'image/jpeg', 'image/jpg'],
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

    if (!file) {
        return (
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragActive
                    ? 'border-purple-400 bg-purple-50'
                    : 'border-slate-200 hover:border-purple-400 hover:bg-slate-50'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={type === 'form' ? '.pdf' : '.png,.jpg,.jpeg'}
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                />

                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">
                    Click to upload {type.replace('_', ' ')}
                </p>
                <p className="text-xs text-slate-500">
                    {type === 'form' ? 'PDF only' : 'PNG, JPG'} • Max 10MB • Drag & drop supported
                </p>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                        {type === 'form' ? <FileText className="w-5 h-5 text-red-500" /> : <ImageIcon className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button
                    onClick={() => setFile(null)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        placeholder="e.g. Annual Report 2025"
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Button Label</label>
                    <input
                        type="text"
                        value={buttonLabel}
                        onChange={(e) => setButtonLabel(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        placeholder="e.g. Download Now"
                    />
                </div>

                {error && (
                    <div className="text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-100 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-red-600" />
                        {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? 'Uploading...' : 'Confirm Upload'}
                </button>
            </div>
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
