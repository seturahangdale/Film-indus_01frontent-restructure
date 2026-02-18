import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function POST(request: Request) {
    try {
        const { token, password, username } = await request.json();

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        // 1. Decrypt and verify the token
        let payload;
        try {
            payload = await decrypt(token);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 });
        }

        if (payload.type !== 'password_reset' && payload.type !== 'username_reset') {
            return NextResponse.json({ error: 'Invalid token type' }, { status: 400 });
        }

        // Check expiration
        if (new Date(payload.expires) < new Date()) {
            return NextResponse.json({ error: 'Reset link has expired' }, { status: 400 });
        }

        // 2. Prepare update data
        const updateData: any = {};
        if (payload.type === 'password_reset') {
            if (!password) return NextResponse.json({ error: 'New password is required' }, { status: 400 });
            updateData.password = password;
        } else if (payload.type === 'username_reset') {
            if (!username || username.trim() === '') {
                return NextResponse.json({ error: 'New username is required' }, { status: 400 });
            }
            updateData.username = username.trim();
        }

        // 3. Call backend to update credentials
        const res = await fetch(`${BACKEND_URL}/auth/credentials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
        });

        if (!res.ok) {
            console.error('Failed to update credentials in backend');
            return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: `Account ${payload.type === 'password_reset' ? 'password' : 'username'} has been updated successfully. You can now login.`
        });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
    }
}
