import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'https://film-api.indusanalytics.co.in/api';

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/subsidy`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Content not found' },
                { status: 404 }
            );
        }

        const data = await res.json();
        // Parse the ContentJson
        const content = data.contentJson ? JSON.parse(data.contentJson) : {};

        // Reconstruct for frontend
        return NextResponse.json({
            hero: {
                title: data.heroTitle,
                description: data.heroDescription
            },
            ...content
        });
    } catch (error) {
        console.error('Fetch content error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Extract hero fields and rest of content
        const { hero, ...rest } = body;

        const backendPayload = {
            heroTitle: hero?.title,
            heroDescription: hero?.description,
            contentJson: JSON.stringify(rest)
        };

        const res = await fetch(`${BACKEND_URL}/subsidy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(backendPayload)
        });

        if (!res.ok) {
            throw new Error('Failed to update backend content');
        }

        return NextResponse.json({
            success: true,
            message: 'Content updated successfully'
        });
    } catch (error) {
        console.error('Update content error:', error);
        return NextResponse.json(
            { error: 'Failed to update content' },
            { status: 500 }
        );
    }
}
