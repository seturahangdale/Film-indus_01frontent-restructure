import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        let validUser = process.env.ADMIN_USER || "admin";
        let validPass = process.env.ADMIN_PASSWORD || "admin123";

        try {
            const fs = require('fs');
            const path = require('path');
            const credentialsPath = path.join(process.cwd(), 'data', 'credentials.json');
            if (fs.existsSync(credentialsPath)) {
                const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
                validUser = credentials.username || validUser;
                validPass = credentials.password || validPass;
            }
        } catch (e) {
            console.error('Failed to read credentials file, falling back to env:', e);
        }

        if (username === validUser && password === validPass) {
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            const session = await encrypt({ user: { username }, expires });

            const res = NextResponse.json({ success: true, message: "Logged in successfully" });

            (await cookies()).set("session", session, {
                expires,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });

            return res;
        }

        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "An error occurred during login" },
            { status: 500 }
        );
    }
}
