-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "blood_request" (
    "BloodRequest_id" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "blood_group" "BloodGroup" NOT NULL,
    "units_needed" INTEGER NOT NULL,
    "reason" TEXT,
    "location" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blood_request_pkey" PRIMARY KEY ("BloodRequest_id")
);

-- AddForeignKey
ALTER TABLE "blood_request" ADD CONSTRAINT "blood_request_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
