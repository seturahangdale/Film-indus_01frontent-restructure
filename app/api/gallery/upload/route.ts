import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const GALLERY_PATH = path.join(process.cwd(), 'data', 'gallery.json')
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'gallery')

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const title = formData.get('title') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string
        const tagsString = formData.get('tags') as string
        const tags = tagsString ? tagsString.split(',').map(t => t.trim()) : []

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // Validate file type (images only)
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only images are allowed' }, { status: 400 })
        }

        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
        const filepath = path.join(UPLOAD_DIR, filename)
        const publicPath = `/uploads/gallery/${filename}`

        await writeFile(filepath, buffer)

        // Update gallery.json
        let galleryData: { categories: any[], items: any[] } = { categories: [], items: [] }
        if (existsSync(GALLERY_PATH)) {
            const fileData = await readFile(GALLERY_PATH, 'utf-8')
            galleryData = JSON.parse(fileData)
        }

        const newItem = {
            id: Date.now().toString(),
            title: title || 'Untitled',
            category: category || 'others',
            description: description || '',
            src: publicPath,
            tags: tags,
            uploadedAt: new Date().toISOString()
        }

        galleryData.items.push(newItem)
        await writeFile(GALLERY_PATH, JSON.stringify(galleryData, null, 2))

        return NextResponse.json({
            success: true,
            item: newItem
        })
    } catch (error) {
        console.error('Gallery upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload gallery image' },
            { status: 500 }
        )
    }
}
