//cancel Blood request
import { NextRequest, NextResponse } from "next/server";
import { getUserDataFromToken } from "@/app/utils/dbqueries/UserAuthQueries";
import { cancelBloodRequest } from "@/app/utils/dbqueries/BloodRequestQueries";


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const userData = await getUserDataFromToken(request);
    if (!userData) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = userData.userId;
    const bloodRequestId = params.id;
    const canceledBloodRequest = await cancelBloodRequest(bloodRequestId, userId);
    if (!canceledBloodRequest) {
        return NextResponse.json({ message: "Failed to cancel blood request" }, { status: 500 });
    }
    return NextResponse.json(canceledBloodRequest, { status: 200 });
}
