


// check user availability
import { NextRequest, NextResponse } from "next/server";
import { getUserDataFromToken } from "@/app/utils/dbqueries/UserAuthQueries";
import { findUserById } from "@/app/utils/dbqueries/UserProfileQueries";

export async function GET(request: NextRequest) {
    const userauth = await getUserDataFromToken(request);
    if (!userauth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await findUserById(userauth.id);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ available: user.available_to_donate }, { status: 200 });
}