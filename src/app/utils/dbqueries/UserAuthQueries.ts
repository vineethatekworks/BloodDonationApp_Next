import prisma from "@/app/lib/prisma_client";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function InsertUserAuthVerifyToken(userId: string, HashToken: string) {
   const result = await prisma.userAuth.create({
      data: {
         user_id: userId,
         verifytoken: HashToken,
         verifytokenexpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
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


//verify token
export async function verifyToken(token: string) {
    const result = await prisma.userAuth.findFirst({
        where: {
            verifytoken: token,
            verifytokenexpiry: {
                gte: new Date()
            }
        }
    });
    if (!result) {
        throw new Error("Invalid or expired token");
    }
    return result.user_id;
}

// verify token and update user
export async function verifyTokenAndUpdateUser(user_id: string) {
    const result = await prisma.userAuth.update({
        where: {
            user_id: user_id
        },
        data: {
            isVerified: true,
            verifytoken: null,
            verifytokenexpiry: null
        }
    });
    return result;
}



//getdata from token
export async function getUserDataFromToken(req: NextRequest) {
   try {
      const token = req.cookies.get("token")?.value || "";
      if (!token) {
         throw new Error("No token found");
      }
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      return decoded.id;
   }
   catch (err: any) {
      console.log(err);
      throw new Error("Error in getting user data from token");
   }
}

