import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://film-api.indusanalytics.co.in/api';

export async function GET() {
    try {
        console.log('Admin Proxy: Fetching all contacts');

        const response = await fetch(`${BACKEND_URL}/contact/all`, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Backend failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Admin Proxy Error:', error);
        return NextResponse.json(
            { error: 'Internal Admin Proxy Error' },
            { status: 500 }
        );
    }
}
