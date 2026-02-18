import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://film-api.indusanalytics.co.in/api';

export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/health`, {
            cache: 'no-store'
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Backend health check failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Health Proxy Error:', error);
        return NextResponse.json(
            { error: 'Internal Health Proxy Error' },
            { status: 500 }
        );
    }
}
