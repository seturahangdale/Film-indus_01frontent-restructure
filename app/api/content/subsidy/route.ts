import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CONTENT_PATH = path.join(process.cwd(), 'data', 'subsidy-content.json')

export async function GET() {
    try {
        if (!existsSync(CONTENT_PATH)) {
            return NextResponse.json(
                { error: 'Content not found' },
                { status: 404 }
            )
        }

        const data = await readFile(CONTENT_PATH, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        console.error('Fetch content error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        // Ensure data directory exists
        const dataDir = path.dirname(CONTENT_PATH)
        if (!existsSync(dataDir)) {
            // This shouldn't happen as it's created during build/setup, but good for safety
            return NextResponse.json({ error: 'Data directory missing' }, { status: 500 })
        }

        await writeFile(CONTENT_PATH, JSON.stringify(body, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Content updated successfully'
        })
    } catch (error) {
        console.error('Update content error:', error)
        return NextResponse.json(
            { error: 'Failed to update content' },
            { status: 500 }
        )
    }
}
