import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')

        const url = type
            ? `${BACKEND_URL}/documents?type=${encodeURIComponent(type)}`
            : `${BACKEND_URL}/documents`

        const res = await fetch(url, { cache: 'no-store' })
        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            return NextResponse.json(
                { error: err.error || 'Failed to fetch documents' },
                { status: res.status }
            )
        }
        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Get documents error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        )
    }
}
