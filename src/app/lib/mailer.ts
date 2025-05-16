import nodemailer from 'nodemailer';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    {
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
                text: `Hello, \n\n Please ${emailType === 'VERIFY' ? 'verify' : 'reset your password'} your email by clicking the link below: \n\n http://localhost:3000/${emailType === 'VERIFY' ? 'verify' : 'reset-password'}/${userId} \n\n Thank you!`,
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