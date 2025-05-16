import { z } from 'zod'
// Auth schema (matches UserAuth table)
export const UserAuthSchema = z.object({
  user_id: z.string().uuid(),
  isVerified: z.boolean().optional().default(false),
  role: z.enum(['DONOR', 'RECIPIENT', 'ADMIN']).optional().default('DONOR'),
  verifytoken: z.string().optional(),
  verifytokenexpiry: z.string().optional().transform(val => val ? new Date(val) : undefined),
  forgotpasswordtoken: z.string().optional(),
  forgotpasswordtokenexpiry: z.string().optional().transform(val => val ? new Date(val) : undefined),
})

export type UserAuth = z.infer<typeof UserAuthSchema>
