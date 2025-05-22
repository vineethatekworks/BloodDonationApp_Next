/*
  Warnings:

  - You are about to drop the column `location` on the `blood_request` table. All the data in the column will be lost.
  - You are about to drop the column `units_needed` on the `blood_request` table. All the data in the column will be lost.
  - Added the required column `city` to the `blood_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `blood_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `blood_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalAddress` to the `blood_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalName` to the `blood_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `blood_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `blood_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blood_request" DROP COLUMN "location",
DROP COLUMN "units_needed",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "hospitalAddress" TEXT NOT NULL,
ADD COLUMN     "hospitalName" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "units" INTEGER NOT NULL;
