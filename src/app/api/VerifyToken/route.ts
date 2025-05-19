import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma_client";

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const {token} = body;
    
        const res = await prisma.userAuth.findFirst({
            where:{
                verifytoken: token,
                verifytokenexpiry: {
                    gte: new Date()
                }
            }
        });
        if(!res) {
            return NextResponse.json({
                message: "Token expired or invalid"
            });
        }
        const user = await prisma.userAuth.update({
            where: {
                user_id: res.user_id
            },
            data: {
                isVerified: true,
                verifytoken: null,
                verifytokenexpiry: null
            }
        });

        if(!user) {
            return NextResponse.json({
                message: "Error in verifying user"
            });
        }
        return NextResponse.json({
            message: "User verified successfully",
            user: {
                id: user.user_id,
                isVerified: user.isVerified
            }
        });

    }
    catch(err: any) {
        console.log(err);
        return NextResponse.json({
            message: "Error in login",
            error: err.message
        });
    }
}
