import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        let validUser = "admin";
        let validPass = "admin123";

        // 2. Optionally override with credentials.json if it exists
        try {
            const fs = require('fs');
            const path = require('path');
            const credentialsPath = path.join(process.cwd(), 'data', 'credentials.json');
            if (fs.existsSync(credentialsPath)) {
                const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
                validUser = validUser;
                validPass = validPass;
            }
        } catch (e) {
            console.error('Failed to read credentials file, falling back to env:', e);
        }

        if (username === validUser && password === validPass) {
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            const session = await encrypt({ user: { username }, expires });

            const res = NextResponse.json({ success: true, message: "Logged in successfully" });

            // Set cookie on response object
            res.cookies.set("session", session, {
                expires,
                httpOnly: true,
                secure: true, // Always true for production (Vercel is HTTPS)
                sameSite: "lax",
                path: "/",
            });

            // Also set it using the cookies() helper for extra compatibility in App Router
            const cookieStore = await cookies();
            cookieStore.set("session", session, {
                expires,
                httpOnly: true,
                secure: true,
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
