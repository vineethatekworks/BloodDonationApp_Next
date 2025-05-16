import { z } from 'zod'
import { bloodGroupMap } from './bloodgroupMap'

export const UserProfileSchema = z.object({
  full_name: z.string().min(3, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  contact: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits long' })
    .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
    .optional()
    .default(''),
  blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional()
    .transform(val => val ? bloodGroupMap[val] : undefined),
  location: z.string().min(2, { message: 'Location must be at least 2 characters long' }).optional(),
  available_to_donate: z.boolean().optional().default(false),
  last_donated_at: z.string().optional().transform(val => val ? new Date(val) : undefined),
  created_at: z.date().optional().default(() => new Date()),
  updated_at: z.date().optional().default(() => new Date()),
})


export type UserProfile = z.infer<typeof UserProfileSchema>
