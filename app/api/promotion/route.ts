import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'https://film-api.indusanalytics.co.in/api';

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/promotion`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch promotion data' }, { status: 500 });
        }

        const data = await res.json();
        // Parse the ContentJson which contains the structured data
        const content = data.contentJson ? JSON.parse(data.contentJson) : {};

        // Merge with hero fields
        return NextResponse.json({
            hero: {
                title: data.heroTitle,
                description: data.heroDescription
            },
            ...content
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch promotion data' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Extract hero fields and rest of content
        const { hero, ...rest } = data;

        const backendPayload = {
            heroTitle: hero?.title,
            heroDescription: hero?.description,
            contentJson: JSON.stringify(rest)
        };

        const res = await fetch(`${BACKEND_URL}/promotion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(backendPayload)
        });

        if (!res.ok) {
            throw new Error('Failed to update backend content');
        }

        return NextResponse.json({ message: 'Promotion data updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update promotion data' }, { status: 500 });
    }
}
