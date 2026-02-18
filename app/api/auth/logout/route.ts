import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true, message: "Logged out successfully" });

    (await cookies()).set("session", "", {
        expires: new Date(0),
        path: "/",
    });

    return res;
}
