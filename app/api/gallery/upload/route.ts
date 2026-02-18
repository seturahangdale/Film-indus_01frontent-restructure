import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        // Forward the multipart form directly to the backend
        const res = await fetch(`${BACKEND_URL}/gallery/upload`, {
            method: 'POST',
            body: formData,
        })

        const data = await res.json()
        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error('Gallery upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload gallery image' },
            { status: 500 }
        )
    }
}
