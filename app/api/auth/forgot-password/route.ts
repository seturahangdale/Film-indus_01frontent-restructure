import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { encrypt } from '@/lib/auth';
import { sendResetEmail } from '@/lib/mail';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 1. Read credentials to verify email
        const filePath = path.join(process.cwd(), 'data', 'credentials.json');
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'System error: Credentials not found' }, { status: 500 });
        }

        const credentials = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // 2. Check if email matches
        if (email !== credentials.email) {
            // For security, don't reveal if email exists or not
            return NextResponse.json({
                success: true,
                message: 'If an account exists with this email, a reset link has been sent.'
            });
        }

        // 3. Generate a temporary reset token (valid for 1 hour)
        const expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
        const resetToken = await encrypt({ email, type: 'password_reset', expires });

        // 4. Send the email with the username
        await sendResetEmail(email, resetToken, credentials.username);

        return NextResponse.json({
            success: true,
            message: 'If an account exists with this email, a reset link has been sent.'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
