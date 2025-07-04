import { getUserDataFromToken } from "@/app/utils/dbqueries/UserAuthQueries";
import { NextRequest, NextResponse } from "next/server";
import { findUserById } from "@/app/utils/dbqueries/UserProfileQueries";



export async function GET(request: NextRequest) {
    try{
        
        const userId = await getUserDataFromToken(request);

        const user = await findUserById(userId);
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
