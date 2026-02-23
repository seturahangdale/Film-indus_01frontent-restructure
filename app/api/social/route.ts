import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'https://film-api.indusanalytics.co.in/api';

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/social`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return NextResponse.json({ youtubeUrl: '', socialLinks: [] });
        }

        const data = await res.json();
        // Backend returns SocialLinksJson string, parse it
        return NextResponse.json({
            youtubeUrl: data.youtubeUrl,
            socialLinks: data.socialLinksJson ? JSON.parse(data.socialLinksJson) : []
        });
    } catch (error) {
        console.error('Fetch social error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch social data' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Transform for backend model
        const backendPayload = {
            youtubeUrl: body.youtubeUrl,
            socialLinksJson: JSON.stringify(body.socialLinks)
        };

        const res = await fetch(`${BACKEND_URL}/social`, {
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
            message: 'Social data updated successfully'
        });
    } catch (error) {
        console.error('Update social error:', error);
        return NextResponse.json(
            { error: 'Failed to update social data' },
            { status: 500 }
        );
    }
}
