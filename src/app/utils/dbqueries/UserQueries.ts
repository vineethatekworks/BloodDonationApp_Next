import prisma from "@/app/lib/prisma_client";

//Query to find user by email
export async function findUserExists(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}


//Query to insert user
export async function insertUser(userData: any) {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
}
