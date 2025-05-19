import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma_client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { stat } from "fs";



export async function POST(request: Request) {
    try{
         const body = await request.json();
         const {email, password} = body;

         const user = await prisma.userProfile.findFirst({
             where: {
                 email: email,
                 password: password
             }
         });

            if(!user) {
                return NextResponse.json({
                    message: "Invalid email or password"
                });
            }

        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) {
            return NextResponse.json({
                message: "Invalid email or password"
            });
        }

        const tokendata = {
            id: user.id,
            name: user.full_name,
            email: user.email,
        };

        const token = await jwt.sign(tokendata, process.env.JWT_SECRET !, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            message: "Login successful",
            status: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    }
    catch(err: any) {
        console.log(err);
        return NextResponse.json({
            message: "Error in login",
            error: err.message
        });
    }
}