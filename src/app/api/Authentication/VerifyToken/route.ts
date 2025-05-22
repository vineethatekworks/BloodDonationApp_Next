import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma_client";
import { verifyToken, verifyTokenAndUpdateUser } from "@/app/utils/dbqueries/UserAuthQueries";

export async function PUT(request: NextRequest) {
    try{
        const body = await request.json();
        const {token} = body;

        const user_id = await verifyToken(token);

        const user = await verifyTokenAndUpdateUser(user_id);

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
