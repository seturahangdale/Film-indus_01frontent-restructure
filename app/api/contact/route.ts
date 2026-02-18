import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://film-api.indusanalytics.co.in/api';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Proxying Contact Request:', body);

        const response = await fetch(`${BACKEND_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log('Backend Response Status:', response.status);
        console.log('Backend Response Body:', data);

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Backend failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { error: 'Internal Proxy Error' },
            { status: 500 }
        );
    }
}
