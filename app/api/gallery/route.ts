import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const GALLERY_PATH = path.join(process.cwd(), 'data', 'gallery.json')

export async function GET() {
    try {
        if (!existsSync(GALLERY_PATH)) {
            // Return empty structure if file doesn't exist
            return NextResponse.json({ categories: [], items: [] })
        }

        const data = await readFile(GALLERY_PATH, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        console.error('Fetch gallery error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch gallery data' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        // Simple validation
        if (!body.categories || !body.items) {
            return NextResponse.json({ error: 'Invalid gallery data structure' }, { status: 400 })
        }

        await writeFile(GALLERY_PATH, JSON.stringify(body, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Gallery updated successfully'
        })
    } catch (error) {
        console.error('Update gallery error:', error)
        return NextResponse.json(
            { error: 'Failed to update gallery' },
            { status: 500 }
        )
    }
}
