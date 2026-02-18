import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { title, buttonLabel } = body

        const documentsPath = path.join(process.cwd(), 'data', 'documents.json')

        if (!existsSync(documentsPath)) {
            return NextResponse.json(
                { error: 'No documents found' },
                { status: 404 }
            )
        }

        const data = await readFile(documentsPath, 'utf-8')
        const documents = JSON.parse(data)

        const index = documents.findIndex((doc: any) => String(doc.id) === String(id))
        if (index === -1) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            )
        }

        // Update document
        documents[index] = {
            ...documents[index],
            title: title || documents[index].title,
            buttonLabel: buttonLabel || documents[index].buttonLabel,
            updatedAt: new Date().toISOString(),
        }

        await writeFile(documentsPath, JSON.stringify(documents, null, 2))

        return NextResponse.json({
            success: true,
            document: documents[index],
        })
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json(
            { error: 'Failed to update document' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const documentsPath = path.join(process.cwd(), 'data', 'documents.json')

        if (!existsSync(documentsPath)) {
            return NextResponse.json(
                { error: 'No documents found' },
                { status: 404 }
            )
        }

        const data = await readFile(documentsPath, 'utf-8')
        let documents = JSON.parse(data)

        // Find by string comparison to be safe with large IDs/mixed types
        const index = documents.findIndex((doc: any) => String(doc.id) === String(id))

        if (index === -1) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            )
        }

        const document = documents[index]

        // Delete physical file only if it's in the /uploads directory 
        // We don't want to delete historical files in /forms, /pamphlets, etc. unless we want to
        // For safety, let's check if it's in /uploads
        if (document.filepath.startsWith('/uploads/')) {
            const filePath = path.join(process.cwd(), 'public', document.filepath)
            if (existsSync(filePath)) {
                await unlink(filePath)
            }
        }

        // Remove from documents array
        documents = documents.filter((doc: any) => String(doc.id) !== String(id))
        await writeFile(documentsPath, JSON.stringify(documents, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Document deleted successfully',
        })
    } catch (error) {
        console.error('Delete error:', error)
        return NextResponse.json(
            { error: 'Failed to delete document' },
            { status: 500 }
        )
    }
}
