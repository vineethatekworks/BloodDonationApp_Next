import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma_client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;
        console.log(email, password);

        const user = await prisma.userProfile.findFirst({
            where: {
                email: email,
            },
        });
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

        const tokendata = {
            id: user.id,
            name: user.full_name,
            email: user.email,
        };

        const token = await jwt.sign(tokendata, process.env.JWT_SECRET!, {
            expiresIn: "1d"
        });

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