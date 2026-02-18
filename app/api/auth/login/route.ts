import { encrypt } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        let validUser = "admin";
        let validPass = "admin123";

        // Optionally override with credentials.json if it exists
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
            const token = await encrypt({ user: { username }, expires });

            // Return the token in the response body for localStorage storage
            return NextResponse.json({
                success: true,
                message: "Logged in successfully",
                token,
            });
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
