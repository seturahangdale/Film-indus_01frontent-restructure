import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Auth is now handled client-side via localStorage.
// This middleware simply passes all requests through.
export async function middleware(req: NextRequest) {
    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
}
