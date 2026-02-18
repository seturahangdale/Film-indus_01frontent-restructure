import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET || "default_secret_key_change_me_in_production";
const key = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // protect /admin and /api/admin routes
    if (pathname.startsWith('/admin') || (pathname.startsWith('/api/admin') && !pathname.includes('/auth/login'))) {
        const session = req.cookies.get('session')?.value

        if (!session) {
            if (pathname.startsWith('/api')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
            }
            return NextResponse.redirect(new URL('/login', req.url))
        }

        try {
            await jwtVerify(session, key, {
                algorithms: ["HS256"],
            });
            return NextResponse.next()
        } catch (error) {
            console.error('Session validation failed:', error)
            if (pathname.startsWith('/api')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
            }
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
}
