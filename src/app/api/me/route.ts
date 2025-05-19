import { getUserDataFromToken } from "@/app/utils/dbqueries/UserAuthQueries";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma_client";



export async function POST(request: NextRequest) {
    try{
        
        const userId = await getUserDataFromToken(request);

        const user = await prisma.userProfile.findFirst({
            where: {
                id: userId
            },
        });
        if (!user) {
            return NextResponse.json({
                message: "No user found"
            });
        }
        return NextResponse.json({
            message: "User data fetched successfully",
            user: user
        })

    }
    catch(err: any) {
        console.log(err);
        return NextResponse.json({
            message: "Error in getting user data",
            error: err.message
        });
    }
}
