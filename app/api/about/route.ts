import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'about.json')

export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        console.error('Error reading about data:', error)
        return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        // Simple validation
        if (!body.whoWeAre || !body.whatWeDo) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
        }

        await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf8')
        return NextResponse.json({ message: 'About data updated successfully' })
    } catch (error) {
        console.error('Error updating about data:', error)
        return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
    }
}
