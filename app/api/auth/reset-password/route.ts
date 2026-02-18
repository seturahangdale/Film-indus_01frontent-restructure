import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { decrypt } from '@/lib/auth';

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

        // 2. Read current credentials
        const filePath = path.join(process.cwd(), 'data', 'credentials.json');
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'System error: Credentials not found' }, { status: 500 });
        }

        const credentials = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // 3. Update account details based on token type
        if (payload.type === 'password_reset') {
            if (!password) return NextResponse.json({ error: 'New password is required' }, { status: 400 });
            credentials.password = password;
        } else if (payload.type === 'username_reset') {
            if (!username || username.trim() === '') {
                return NextResponse.json({ error: 'New username is required' }, { status: 400 });
            }
            credentials.username = username.trim();
        }

        fs.writeFileSync(filePath, JSON.stringify(credentials, null, 2));

        return NextResponse.json({
            success: true,
            message: `Account ${payload.type === 'password_reset' ? 'password' : 'username'} has been updated successfully. You can now login.`
        });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
    }
}
