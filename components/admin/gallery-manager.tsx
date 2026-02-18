'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Edit2, Upload, X, Check, Loader2, Image as ImageIcon, Filter } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'

interface Category {
    id: string
    name: string
    color: string
    icon: string
    description?: string
}

interface GalleryItem {
    id: string
    title: string
    category: string
    description: string
    src: string
    tags: string[]
}

export function GalleryManager() {
    const [data, setData] = useState<{ categories: Category[], items: GalleryItem[] } | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all')
    const [uploading, setUploading] = useState(false)
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    // Form states
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [newTitle, setNewTitle] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newTags, setNewTags] = useState('')

    // Category form states
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [catName, setCatName] = useState('')
    const [catIcon, setCatIcon] = useState('📸')
    const [catDesc, setCatDesc] = useState('')
    const [catThumbnail, setCatThumbnail] = useState('')
    const [catPlaces, setCatPlaces] = useState<string[]>([''])

    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            const res = await apiClient.getGalleryData()
            setData(res)
            if (res.categories.length > 0 && activeTab === 'all') {
                // Keep 'all' or default
            }
        } catch (error) {
            toast.error('Failed to load gallery')
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (!selectedFile.type.startsWith('image/')) {
                toast.error('Please select an image file')
                return
            }
            setFile(selectedFile)
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleUpload = async () => {
        if (!file || !newCategory) {
            toast.error('Please select a file and category')
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', newTitle)
        formData.append('description', newDesc)
        formData.append('category', newCategory)
        formData.append('tags', newTags)

        try {
            await apiClient.uploadGalleryImage(formData)
            toast.success('Image uploaded to gallery!')
            resetForm()
            fetchGallery()
        } catch (error: any) {
            toast.error(error.message || 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleUpdateItem = async () => {
        if (!editingItem) return
        setUploading(true)
        try {
            await apiClient.updateGalleryItem(editingItem.id, {
                title: newTitle,
                description: newDesc,
                category: newCategory,
                tags: newTags.split(',').map(t => t.trim())
            })
            toast.success('Item updated!')
            resetForm()
            fetchGallery()
        } catch (error) {
            toast.error('Update failed')
        } finally {
            setUploading(false)
        }
    }

    const handleDeleteItem = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return
        try {
            await apiClient.deleteGalleryItem(id)
            toast.success('Item removed')
            fetchGallery()
        } catch (error) {
            toast.error('Delete failed')
        }
    }

    const handleSaveCategory = async () => {
        if (!catName || !data) return

        let updatedCategories;
        const validPlaces = catPlaces.filter(p => p.trim() !== '')

        if (editingCategory) {
            updatedCategories = data.categories.map(c =>
                c.id === editingCategory.id ? {
                    ...c,
                    name: catName,
                    icon: catIcon,
                    description: catDesc,
                    thumbnail: catThumbnail,
                    places: validPlaces
                } : c
            )
        } else {
            const newCat = {
                id: catName.toLowerCase().replace(/\s+/g, '-'),
                name: catName,
                color: 'from-slate-500 to-slate-700',
                icon: catIcon,
                description: catDesc,
                thumbnail: catThumbnail || (data.items.find(i => i.category === catName.toLowerCase())?.src || ''),
                places: validPlaces
            }
            updatedCategories = [...data.categories, newCat]
        }

        const updatedData = {
            ...data,
            categories: updatedCategories
        }

        try {
            await apiClient.updateGalleryData(updatedData)
            toast.success(editingCategory ? 'Category updated!' : 'Category added!')
            setIsAddingCategory(false)
            setEditingCategory(null)
            setCatName('')
            setCatIcon('📸')
            setCatDesc('')
            setCatThumbnail('')
            setCatPlaces([''])
            fetchGallery()
        } catch (error) {
            toast.error('Failed to save category')
        }
    }

    const handleDeleteCategory = async (catId: string) => {
        if (!data) return
        if (data.items.some(item => item.category === catId)) {
            toast.error('Cannot delete category that contains images. Move or delete images first.')
            return
        }
        if (!confirm('Delete this category?')) return

        const updatedData = {
            ...data,
            categories: data.categories.filter(c => c.id !== catId)
        }

        try {
            await apiClient.updateGalleryData(updatedData)
            toast.success('Category removed')
            fetchGallery()
        } catch (error) {
            toast.error('Failed to remove category')
        }
    }

    const startEditingCategory = (cat: Category) => {
        setEditingCategory(cat)
        setCatName(cat.name)
        setCatIcon(cat.icon)
        setCatDesc(cat.description || '')
        setIsAddingCategory(true)
    }

    const resetForm = () => {
        setFile(null)
        setPreview(null)
        setNewTitle('')
        setNewDesc('')
        setNewCategory('')
        setNewTags('')
        setEditingItem(null)
        setIsUploadModalOpen(false)
    }

    const startEditing = (item: GalleryItem) => {
        setEditingItem(item)
        setNewTitle(item.title)
        setNewDesc(item.description)
        setNewCategory(item.category)
        setNewTags(item.tags.join(', '))
        setIsUploadModalOpen(true)
    }

    if (loading) return <div className="py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-accent" /></div>

    const filteredItems = activeTab === 'all'
        ? data?.items || []
        : data?.items.filter(item => item.category === activeTab) || []

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & Categories */}
            <div className="bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground tracking-tight">Gallery <span className="text-slate-400 dark:text-muted-foreground font-light text-2xl ml-1">Showcase</span></h2>
                        <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1 font-medium italic">Curate and organize location photos for the public portfolio.</p>
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsUploadModalOpen(true); }}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-8 py-7 h-auto shadow-xl shadow-purple-900/20 gap-3 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Upload className="w-5 h-5 border-2 border-white/20 rounded-md p-0.5" />
                        Upload Gallery Photo
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <Filter className="w-3.5 h-3.5 text-purple-500" />
                        Explore by Category
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2 scroll-smooth">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={cn(
                                "px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm ring-1 shrink-0 whitespace-nowrap",
                                activeTab === 'all'
                                    ? "bg-purple-600 text-white ring-purple-600 shadow-purple-900/20 shadow-lg scale-105"
                                    : "bg-slate-50 dark:bg-muted text-slate-500 dark:text-muted-foreground ring-slate-200 dark:ring-border hover:bg-white dark:hover:bg-muted/80 hover:text-purple-600 hover:ring-purple-200 dark:hover:ring-purple-900"
                            )}
                        >
                            All Media
                        </button>
                        {data?.categories.map(cat => (
                            <div key={cat.id} className="group relative shrink-0">
                                <button
                                    onClick={() => setActiveTab(cat.id)}
                                    className={cn(
                                        "px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm ring-1 pr-12 whitespace-nowrap",
                                        activeTab === cat.id
                                            ? "bg-purple-600 text-white ring-purple-600 shadow-purple-900/20 shadow-lg scale-105"
                                            : "bg-slate-50 dark:bg-muted text-slate-500 dark:text-muted-foreground ring-slate-200 dark:ring-border hover:bg-white dark:hover:bg-muted/80 hover:text-purple-600 hover:ring-purple-200 dark:hover:ring-purple-900"
                                    )}
                                >
                                    <span className="mr-2 opacity-70 group-hover:scale-125 transition-transform inline-block">{cat.icon}</span>
                                    {cat.name}
                                </button>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 origin-right">
                                    <button
                                        onClick={() => startEditingCategory(cat)}
                                        className="p-1.5 bg-white dark:bg-card shadow-sm ring-1 ring-slate-200 dark:ring-border rounded-lg text-slate-400 hover:text-indigo-600 border-none"
                                        title="Edit"
                                    >
                                        <Edit2 size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(cat.id)}
                                        className="p-1.5 bg-white dark:bg-card shadow-sm ring-1 ring-slate-200 dark:ring-border rounded-lg text-slate-400 hover:text-red-500 border-none"
                                        title="Delete"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {!isAddingCategory && (
                            <button
                                onClick={() => {
                                    setEditingCategory(null);
                                    setCatName('');
                                    setCatIcon('📸');
                                    setCatDesc('');
                                    setIsAddingCategory(true);
                                }}
                                className="px-6 py-3 bg-white dark:bg-muted text-slate-400 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-purple-600 dark:hover:text-purple-400 hover:ring-purple-200 transition-all border border-dashed border-slate-300 dark:border-border flex items-center gap-2 group shrink-0 whitespace-nowrap"
                            >
                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                New Category
                            </button>
                        )}
                    </div>
                </div>

                {isAddingCategory && (
                    <div className="mt-8 p-6 bg-slate-50 dark:bg-muted/30 rounded-2xl border border-slate-200 dark:border-border animate-in slide-in-from-top-2">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-slate-700 dark:text-foreground flex items-center gap-2">
                                {editingCategory ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Category'}
                            </h4>
                            <button onClick={() => { setIsAddingCategory(false); setEditingCategory(null); }} className="text-slate-400 hover:text-slate-600 dark:hover:text-foreground">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="md:col-span-1">
                                <label className="block text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase mb-2">Icon</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border dark:border-border dark:bg-background dark:text-foreground rounded-xl outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                                    value={catIcon}
                                    onChange={e => setCatIcon(e.target.value)}
                                    placeholder="Emoji"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase mb-2">Category Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border dark:border-border dark:bg-background dark:text-foreground rounded-xl outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                                    value={catName}
                                    onChange={e => setCatName(e.target.value)}
                                    placeholder="Enter Category Name"
                                    onKeyDown={e => e.key === 'Enter' && handleSaveCategory()}
                                />
                            </div>

                            <div className="md:col-span-full">
                                <label className="block text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase mb-2">Home Page Thumbnail URL</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border dark:border-border dark:bg-background dark:text-foreground rounded-xl outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                                    value={catThumbnail}
                                    onChange={e => setCatThumbnail(e.target.value)}
                                    placeholder="/images/your-image.jpg"
                                />
                                {catThumbnail && (
                                    <div className="mt-2 relative h-20 w-40 rounded-lg overflow-hidden border">
                                        <img src={catThumbnail} alt="Preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-full">
                                <label className="block text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase mb-2">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 border dark:border-border dark:bg-background dark:text-foreground rounded-xl outline-none focus:ring-2 focus:ring-accent/20 min-h-[80px] transition-colors"
                                    value={catDesc}
                                    onChange={e => setCatDesc(e.target.value)}
                                    placeholder="Describe this category..."
                                />
                            </div>

                            <div className="md:col-span-full">
                                <label className="block text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase mb-2">Notable Places (for locations page)</label>
                                <div className="space-y-2">
                                    {catPlaces.map((place, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 px-4 py-2 border dark:border-border dark:bg-background dark:text-foreground rounded-lg outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                                                value={place}
                                                onChange={e => {
                                                    const newPlaces = [...catPlaces]
                                                    newPlaces[idx] = e.target.value
                                                    setCatPlaces(newPlaces)
                                                }}
                                                placeholder={`Place ${idx + 1}`}
                                            />
                                            <button
                                                onClick={() => {
                                                    if (catPlaces.length > 1) {
                                                        setCatPlaces(catPlaces.filter((_, i) => i !== idx))
                                                    }
                                                }}
                                                className="p-2 text-slate-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setCatPlaces([...catPlaces, ''])}
                                        className="flex items-center gap-2 text-sm font-bold text-accent hover:bg-accent/5 px-3 py-1.5 rounded-lg transition"
                                    >
                                        <Plus className="w-4 h-4" /> Add Place
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => { setIsAddingCategory(false); setEditingCategory(null); }}
                                className="px-4 py-2 text-slate-600 dark:text-muted-foreground hover:bg-slate-200 dark:hover:bg-muted rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCategory}
                                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition shadow-sm font-bold flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                {editingCategory ? 'Update Category' : 'Create Category'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.length === 0 ? (
                    <div className="col-span-full py-24 text-center bg-white dark:bg-card rounded-[2rem] border border-dashed border-slate-200 dark:border-border shadow-sm flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-muted/50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 dark:text-muted-foreground">
                            <ImageIcon size={32} />
                        </div>
                        <p className="text-slate-400 dark:text-muted-foreground font-medium font-display">No media discovered in this category.</p>
                        <button
                            onClick={() => { resetForm(); setIsUploadModalOpen(true); }}
                            className="mt-4 text-purple-600 font-bold text-xs uppercase tracking-widest hover:underline"
                        >
                            Start Uploading
                        </button>
                    </div>
                ) : (
                    filteredItems.map(item => (
                        <div key={item.id} className="bg-white dark:bg-card rounded-[2rem] border border-slate-100 dark:border-border shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500 ring-1 ring-slate-200/50 dark:ring-border/50">
                            <div className="relative h-60 w-full bg-slate-100 dark:bg-muted overflow-hidden">
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <button
                                        onClick={() => startEditing(item)}
                                        className="p-3 bg-white/90 backdrop-blur-md rounded-xl text-slate-700 hover:bg-white shadow-lg transition-colors border-none"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="p-3 bg-red-500/90 backdrop-blur-md rounded-xl text-white hover:bg-red-600 shadow-lg transition-colors border-none"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-card/90 backdrop-blur-md rounded-lg text-[10px] text-slate-900 dark:text-foreground uppercase font-bold tracking-widest shadow-sm">
                                    {data?.categories.find(c => c.id === item.category)?.name || item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="font-display font-bold text-slate-900 dark:text-foreground mb-2 truncate text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors uppercase tracking-tight">{item.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-muted-foreground line-clamp-2 min-h-[2.5rem] mb-4 leading-relaxed font-medium">{item.description || 'No description provided.'}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {item.tags.map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-slate-50 dark:bg-muted text-slate-400 dark:text-muted-foreground rounded-lg text-[9px] font-bold uppercase tracking-wider border border-slate-100 dark:border-border">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Upload/Edit Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
                    <div className="bg-white dark:bg-card w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-white/20 dark:border-border ring-1 ring-slate-200 dark:ring-border animate-in zoom-in-95 duration-300">
                        <div className="p-10 border-b border-slate-100 dark:border-border flex justify-between items-center bg-slate-50/50 dark:bg-muted/30">
                            <div>
                                <h3 className="text-2xl font-display font-bold flex items-center gap-3 text-slate-900 dark:text-foreground tracking-tight">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-900/20">
                                        {editingItem ? <Edit2 size={24} /> : <Upload size={24} />}
                                    </div>
                                    {editingItem ? 'Edit Portfolio Asset' : 'Contribute to Gallery'}
                                </h3>
                                <p className="text-xs text-slate-400 dark:text-muted-foreground font-bold uppercase tracking-[0.2em] mt-2">Media Management Core</p>
                            </div>
                            <button onClick={resetForm} className="p-3 hover:bg-slate-200 dark:hover:bg-muted rounded-2xl transition-colors text-slate-400 hover:text-foreground">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-10 overflow-y-auto space-y-10 custom-scrollbar">
                            {/* File Upload Area */}
                            {!editingItem && (
                                <div
                                    className={`relative border-2 border-dashed rounded-[2rem] transition-all duration-500 overflow-hidden ${preview ? 'border-purple-600 p-2 ring-8 ring-purple-50' : 'border-slate-200 p-16 text-center hover:border-purple-400 hover:bg-purple-50/30'}`}
                                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('bg-purple-50/30'); }}
                                    onDragLeave={e => { e.preventDefault(); e.currentTarget.classList.remove('bg-purple-50/30'); }}
                                    onDrop={e => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('bg-purple-50/30');
                                        const file = e.dataTransfer.files[0];
                                        if (file && file.type.startsWith('image/')) {
                                            setFile(file);
                                            const reader = new FileReader();
                                            reader.onloadend = () => setPreview(reader.result as string);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                >
                                    {preview ? (
                                        <div className="relative h-72 w-full rounded-2xl overflow-hidden shadow-inner group/preview">
                                            <Image src={preview} alt="Preview" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                <Button
                                                    onClick={() => { setFile(null); setPreview(null); }}
                                                    variant="destructive"
                                                    className="rounded-xl font-bold uppercase tracking-widest text-[10px]"
                                                >
                                                    Discard & Replace
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                            <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-purple-600 shadow-inner group-hover:scale-110 transition-transform">
                                                <Upload size={32} />
                                            </div>
                                            <h4 className="text-xl font-display font-bold text-slate-900 mb-2">Initialize Asset Pipeline</h4>
                                            <p className="text-slate-400 text-sm font-medium">Drag-and-drop imagery or select from file gateway</p>
                                        </>
                                    )}
                                </div>
                            )}

                            {editingItem && editingItem.src && (
                                <div className="relative h-60 w-full rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-border">
                                    <Image src={editingItem.src} alt={editingItem.title} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="col-span-full space-y-3">
                                    <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        Asset Designation
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-purple-600/20 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-200 dark:ring-border"
                                        placeholder="Identification Title (e.g. Majestic Fortifications)"
                                        value={newTitle}
                                        onChange={e => setNewTitle(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                        Categorization Hook
                                    </label>
                                    <select
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 text-slate-900 dark:text-foreground font-bold appearance-none cursor-pointer transition-all shadow-sm ring-1 ring-slate-200 dark:ring-border"
                                        value={newCategory}
                                        onChange={e => setNewCategory(e.target.value)}
                                    >
                                        <option value="">Select Domain</option>
                                        {data?.categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3 font-medium">
                                    <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                        Metadata Tags
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-600/20 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-200 dark:ring-border"
                                        placeholder="archival, nature, historic..."
                                        value={newTags}
                                        onChange={e => setNewTags(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-full space-y-3">
                                    <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Expanded Documentation
                                    </label>
                                    <textarea
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-700 dark:text-foreground font-medium placeholder:text-slate-300 dark:placeholder:text-muted-foreground transition-all shadow-sm ring-1 ring-slate-200 dark:ring-border min-h-[120px] resize-none"
                                        placeholder="Elaborate on the significance or visual details of this asset..."
                                        value={newDesc}
                                        onChange={e => setNewDesc(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-slate-50 dark:bg-muted/30 border-t border-slate-100 dark:border-border flex gap-4">
                            <Button
                                onClick={resetForm}
                                variant="outline"
                                className="flex-1 py-7 rounded-2xl font-bold uppercase tracking-widest text-[11px] border-slate-200 dark:border-border hover:bg-white dark:hover:bg-muted text-slate-500 transition-all"
                            >
                                Terminate
                            </Button>
                            <Button
                                onClick={editingItem ? handleUpdateItem : handleUpload}
                                disabled={uploading || (!editingItem && !file) || !newCategory}
                                className="flex-[2] py-7 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-xl shadow-purple-900/20 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] gap-3"
                            >
                                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingItem ? <Check size={18} /> : <Upload size={18} />}
                                {uploading ? 'Processing Transaction...' : editingItem ? 'Commit Updates' : 'Authorize Final Upload'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
