import { NextResponse } from "next/server";
import { verifyBearerToken } from "@/lib/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function GET(request: Request) {
    const session = await verifyBearerToken(request.headers.get("Authorization"));
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await fetch(`${BACKEND_URL}/auth/credentials`, { cache: 'no-store' });
        if (!res.ok) {
            return NextResponse.json({ error: "Failed to load credentials" }, { status: 500 });
        }
        const data = await res.json();
        // Never return the password — backend already omits it
        return NextResponse.json({ username: data.username });
    } catch (error) {
        console.error('Failed to fetch credentials:', error);
        return NextResponse.json({ error: "Failed to load credentials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await verifyBearerToken(request.headers.get("Authorization"));
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const res = await fetch(`${BACKEND_URL}/auth/credentials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Failed to update credentials:', error);
        return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
    }
}
