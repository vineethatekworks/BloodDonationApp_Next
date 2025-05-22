import prisma from "@/app/lib/prisma_client";
import { BloodRequest } from "@/app/utils/validatedModels/blood_request";

export async function createBloodRequest(bloodRequest: any) {
    const createdBloodRequest = await prisma.bloodRequest.create({
        data: {
            recipientId: bloodRequest.recipientId,
            blood_group: bloodRequest.blood_group,
            units: bloodRequest.units,
            reason: bloodRequest.reason,
            hospitalName: bloodRequest.hospitalName,
            hospitalAddress: bloodRequest.hospitalAddress,
            city: bloodRequest.city,
            state: bloodRequest.state,
            country: bloodRequest.country,
            contactNumber: bloodRequest.contactNumber,
            status: bloodRequest.status || "PENDING",
        },
    });
    return createdBloodRequest;
}

export async function cancelBloodRequest(bloodRequestId: string, recipientId: string) {
    const canceledBloodRequest = await prisma.bloodRequest.update({
        where: { BloodRequest_id: bloodRequestId, recipientId: recipientId },
        data: { status: "CANCELLED" },
    });
    return canceledBloodRequest;
}