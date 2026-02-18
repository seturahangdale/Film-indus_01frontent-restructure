import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'promotion.json')

export async function GET() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch promotion data' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
        return NextResponse.json({ message: 'Promotion data updated successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update promotion data' }, { status: 500 })
    }
}
