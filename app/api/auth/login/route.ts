import { encrypt } from "@/lib/auth";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Validate credentials against the backend
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Credentials are valid — issue a JWT token for the session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const token = await encrypt({ user: { username }, expires });

        return NextResponse.json({
            success: true,
            message: "Logged in successfully",
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: "An error occurred during login" },
            { status: 500 }
        );
    }
}
