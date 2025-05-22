import { SignJWT, JWTPayload, jwtVerify } from "jose";


const secretKey=process.env.JWT_SECRET;
export async function generateToken(payload: JWTPayload): Promise<string> {
  const secret = new TextEncoder().encode(secretKey);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  return token;
}
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    console.error("Token verification error:", error);
    throw new Error("Invalid token");
  }
}