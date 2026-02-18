import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')

        const documentsPath = path.join(process.cwd(), 'data', 'documents.json')

        if (!existsSync(documentsPath)) {
            return NextResponse.json({ documents: [] })
        }

        const data = await readFile(documentsPath, 'utf-8')
        let documents = JSON.parse(data)

        // Filter by type if provided
        if (type) {
            documents = documents.filter((doc: any) => doc.type === type)
        }

        return NextResponse.json({ documents })
    } catch (error) {
        console.error('Get documents error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        )
    }
}
