


//check role of the user
import { getUserDataFromToken } from "@/app/utils/dbqueries/UserAuthQueries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
          const user = await getUserDataFromToken(request);
          if (!user) {
                    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

          const userRole = user.role;
            if (!userRole) {
                        return NextResponse.json({ error: "User role not found" }, { status: 404 });
            }

          return NextResponse.json({ role: userRole }, { status: 200 });
}