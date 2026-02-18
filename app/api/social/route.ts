import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const SOCIAL_PATH = path.join(process.cwd(), 'data', 'social.json')

export async function GET() {
    try {
        if (!existsSync(SOCIAL_PATH)) {
            return NextResponse.json({ youtubeUrl: '', socialLinks: [] })
        }

        const data = await readFile(SOCIAL_PATH, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        console.error('Fetch social error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch social data' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        await writeFile(SOCIAL_PATH, JSON.stringify(body, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Social data updated successfully'
        })
    } catch (error) {
        console.error('Update social error:', error)
        return NextResponse.json(
            { error: 'Failed to update social data' },
            { status: 500 }
        )
    }
}
