import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        try {
            const payload = await decrypt(token);

            // Return only safe payload info
            return NextResponse.json({
                success: true,
                type: payload.type,
                expires: payload.expires
            });
        } catch (e) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
    }
}
