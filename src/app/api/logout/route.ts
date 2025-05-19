import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest ) {
    try{
        const response =  NextResponse.json({
            message: "Logout successful",
            status: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    }
    catch(err: any) {
        console.log(err);
        return NextResponse.json({
            message: "Error in logout",
            error: err.message
        });
    }
}