import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const GALLERY_PATH = path.join(process.cwd(), 'data', 'gallery.json')

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        if (!existsSync(GALLERY_PATH)) {
            return NextResponse.json({ error: 'Gallery data not found' }, { status: 404 })
        }

        const data = await readFile(GALLERY_PATH, 'utf-8')
        const gallery = JSON.parse(data)

        const itemIndex = gallery.items.findIndex((item: any) => item.id.toString() === id.toString())

        if (itemIndex === -1) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 })
        }

        // Update item metadata
        gallery.items[itemIndex] = {
            ...gallery.items[itemIndex],
            ...body,
            id: gallery.items[itemIndex].id // Preserve original ID
        }

        await writeFile(GALLERY_PATH, JSON.stringify(gallery, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Gallery item updated successfully'
        })
    } catch (error) {
        console.error('Update item error:', error)
        return NextResponse.json(
            { error: 'Failed to update item' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (!existsSync(GALLERY_PATH)) {
            return NextResponse.json({ error: 'Gallery data not found' }, { status: 404 })
        }

        const data = await readFile(GALLERY_PATH, 'utf-8')
        const gallery = JSON.parse(data)

        const itemIndex = gallery.items.findIndex((item: any) => item.id.toString() === id.toString())

        if (itemIndex === -1) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 })
        }

        const item = gallery.items[itemIndex]

        // Delete physical file if it's in the uploads directory
        if (item.src && item.src.startsWith('/uploads/gallery/')) {
            const filepath = path.join(process.cwd(), 'public', item.src)
            if (existsSync(filepath)) {
                await unlink(filepath).catch(e => console.error('Failed to delete file:', e))
            }
        }

        // Remove from list
        gallery.items.splice(itemIndex, 1)

        await writeFile(GALLERY_PATH, JSON.stringify(gallery, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Gallery item deleted successfully'
        })
    } catch (error) {
        console.error('Delete item error:', error)
        return NextResponse.json(
            { error: 'Failed to delete item' },
            { status: 500 }
        )
    }
}
