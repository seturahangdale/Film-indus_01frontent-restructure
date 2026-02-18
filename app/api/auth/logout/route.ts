import { NextResponse } from "next/server";

export async function POST() {
    // Token is stored in localStorage on the client.
    // The client is responsible for removing it on logout.
    return NextResponse.json({ success: true, message: "Logged out successfully" });
}
