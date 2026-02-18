import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const filePath = path.join(process.cwd(), "data", "credentials.json");
        const fileContent = fs.readFileSync(filePath, "utf8");
        const credentials = JSON.parse(fileContent);
        // Never return the password
        return NextResponse.json({ username: credentials.username });
    } catch (error) {
        return NextResponse.json({ error: "Failed to load credentials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { username, password } = await request.json();

        const filePath = path.join(process.cwd(), "data", "credentials.json");
        const fileContent = fs.readFileSync(filePath, "utf8");
        const credentials = JSON.parse(fileContent);

        // Update fields if provided
        if (username) credentials.username = username;
        if (password) credentials.password = password;

        fs.writeFileSync(filePath, JSON.stringify(credentials, null, 2));

        return NextResponse.json({ success: true, message: "Credentials updated successfully" });
    } catch (error) {
        console.error('Failed to update credentials:', error);
        return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
    }
}
