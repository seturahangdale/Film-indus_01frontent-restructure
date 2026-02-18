import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const title = formData.get('title') as string
        const buttonLabel = formData.get('buttonLabel') as string
        const type = formData.get('type') as string

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            )
        }

        // Validate file type
        const allowedTypes: Record<string, string[]> = {
            form: ['application/pdf'],
            pamphlet: ['image/png', 'image/jpeg', 'image/jpg'],
            visiting_card: ['image/png', 'image/jpeg', 'image/jpg'],
        }

        if (!allowedTypes[type]?.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type for this category' },
                { status: 400 }
            )
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400 }
            )
        }

        // Create upload directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', type + 's')
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // Generate unique filename
        const timestamp = Date.now()
        const ext = path.extname(file.name)
        const filename = `${timestamp}${ext}`
        const filepath = path.join(uploadDir, filename)

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filepath, buffer)

        // Create document metadata
        const document = {
            id: timestamp,
            title: title || file.name,
            buttonLabel: buttonLabel || getDefaultButtonLabel(type),
            type,
            filename,
            filepath: `/uploads/${type}s/${filename}`,
            filesize: file.size,
            uploadedAt: new Date().toISOString(),
        }

        // Save to documents.json
        const documentsPath = path.join(process.cwd(), 'data', 'documents.json')
        const documentsDir = path.dirname(documentsPath)

        if (!existsSync(documentsDir)) {
            await mkdir(documentsDir, { recursive: true })
        }

        let documents = []
        if (existsSync(documentsPath)) {
            const { readFile } = await import('fs/promises')
            const data = await readFile(documentsPath, 'utf-8')
            documents = JSON.parse(data)
        }

        documents.push(document)
        await writeFile(documentsPath, JSON.stringify(documents, null, 2))

        return NextResponse.json({
            success: true,
            document,
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        )
    }
}

function getDefaultButtonLabel(type: string): string {
    const defaults: Record<string, string> = {
        form: 'Download Form',
        pamphlet: 'View Pamphlet',
        visiting_card: 'Download Card',
    }
    return defaults[type] || 'Download'
}
