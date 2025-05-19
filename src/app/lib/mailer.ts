import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import prisma from './prisma_client';
import { updateforgotPasswordToken, InsertUserAuthVerifyToken } from '../utils/dbqueries/UserAuthQueries';

export async function sendEmail({ email, emailType, userId }: any) {
    {
        const HashToken = await bcryptjs.hash(userId.toString(), 10);
        if(emailType === 'VERIFY') {
           await InsertUserAuthVerifyToken(userId, HashToken);
        }
        else if(emailType === 'RESET') {
              await updateforgotPasswordToken(userId, HashToken);
        }
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "vineethmargana1617@gmail.com",
                    pass: "zorw kyti vbcb mnmu",
                }
                });

            const mailOptions = {
                from: "vineethmargana1617@gmail.com",
                to: email,
                subject: `Blood Donation - ${emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password'}`,
                text: `Hello, \n\n Please ${emailType === 'VERIFY' ? 'Verify Your Email' : 'reset your password'} your email by clicking the link below: \n\n http://localhost:3000/${emailType === 'VERIFY' ? 'VerifyEmail' : 'reset-password'}/${HashToken} \n\n Thank you!`,
            };

            const result = await transporter.sendMail(mailOptions);
            return result;
        }
        catch (err: any) {
            console.log(err)
            throw new Error('Error sending email: ' + err.message);
        }
    }
}