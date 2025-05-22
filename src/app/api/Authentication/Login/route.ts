import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserExists } from "@/app/utils/dbqueries/UserProfileQueries";
import { JWTPayload } from "jose";
import { generateToken } from "@/app/utils/Jwt/JwtUtils";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;
        console.log(email, password);

        const user = await findUserExists(email);
        console.log(user);

        if (!user) {
            return NextResponse.json({
                message: "Invalid email or password"
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                message: "Invalid email or password"
            });
        }

        const tokendata: JWTPayload = {
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: user.role
        };
        // Generate JWT token
        const token = await generateToken(tokendata);
        console.log("Token generated:", token);
        
        // Set the token in the response cookies
        const response = NextResponse.json({
            message: "Login successful",
            status: true,
            user: user
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({
            message: "Error in login",
            error: err.message
        });
    }
}