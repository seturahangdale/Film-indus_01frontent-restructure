import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/gallery`, { cache: 'no-store' })
        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            return NextResponse.json(
                { error: err.error || 'Failed to fetch gallery data' },
                { status: res.status }
            )
        }
        const data = await res.json()
        return NextResponse.json(data)
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
        const res = await fetch(`${BACKEND_URL}/gallery`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        const data = await res.json()
        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error('Update gallery error:', error)
        return NextResponse.json(
            { error: 'Failed to update gallery' },
            { status: 500 }
        )
    }
}
