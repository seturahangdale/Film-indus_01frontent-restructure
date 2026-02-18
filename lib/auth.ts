import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET || "default_secret_key_change_me_in_production";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

/**
 * Verifies a Bearer token from an Authorization header string.
 * Returns the payload if valid, or null if invalid/missing.
 */
export async function verifyBearerToken(authHeader: string | null): Promise<any | null> {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    const token = authHeader.slice(7);
    try {
        return await decrypt(token);
    } catch {
        return null;
    }
}
