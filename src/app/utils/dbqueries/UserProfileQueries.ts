import prisma from "@/app/lib/prisma_client";
import { BloodGroup, Role } from "@prisma/client";

//Query to find user by email
export async function findUserExists(email: string) {
  const user = await prisma.userProfile.findUnique({
    where: {
      email,
    },
  });
  return user;
}

//Query to insert user
export async function insertUserProfile(
  userData: {
    full_name: string;
    email: string;
    password: string;
    contact: string;
    blood_group?: BloodGroup;
    location?: string;
    available_to_donate?: boolean;
    last_donated_at?: Date | null;
  },
) {
  const user = await prisma.userProfile.create({
    data: { ...userData },
  });
  return user;
}

//Query to find user by id
export async function findUserById(id: string) {
  const user = await prisma.userProfile.findUnique({
    where: {
      id,
    },
  });
  return user;
}
