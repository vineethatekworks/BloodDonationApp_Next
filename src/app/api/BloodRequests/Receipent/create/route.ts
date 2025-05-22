//create a new blood request
import { NextRequest, NextResponse } from "next/server";
import { getUserDataFromToken } from "@/app/utils/dbqueries/UserAuthQueries";
import { BloodRequest, BloodRequestSchema } from "@/app/utils/validatedModels/blood_request";
import { createBloodRequest } from "@/app/utils/dbqueries/BloodRequestQueries";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const user = await getUserDataFromToken(request);
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        

        const parsed = BloodRequestSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
        }

        const recipientId = user.id;

        const createdBloodRequest = await createBloodRequest({ ...parsed.data, recipientId });
        if (!createdBloodRequest) {
            return NextResponse.json({ error: "Failed to create blood request" }, { status: 500 });
        }
        return NextResponse.json({ message: "Blood request created successfully", bloodRequest: createdBloodRequest }, { status: 201 });
    } catch (error) {
        console.error("Error creating blood request:", error);
        return NextResponse.json({ error: "Failed to create blood request" }, { status: 500 });
    }
}

