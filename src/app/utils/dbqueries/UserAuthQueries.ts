import prisma from "@/app/lib/prisma_client";
export async function InsertUserAuthVerifyToken(userId: string, HashToken: string) {
   const result = await prisma.userAuth.create({
                data: {
                    user_id: userId,
                    verifytoken: HashToken,
                    verifytokenexpiry: new Date(Date.now() + 60 * 60 * 1000), 
                },
            });
   if (!result) {
      throw new Error("Failed to update user auth verify token");
   }
   return true;
}
export async function updateforgotPasswordToken(userId: string, HashToken: string) {
   const result = await prisma.userAuth.update({
                where: { user_id: userId },
                data: {
                    forgotpasswordtoken: HashToken,
                    forgotpasswordtokenexpiry: new Date(Date.now() + 60 * 60 * 1000), 
                },
            });
   if (!result) {
      throw new Error("Failed to update user auth forgot password token");
   }
   return true;
}