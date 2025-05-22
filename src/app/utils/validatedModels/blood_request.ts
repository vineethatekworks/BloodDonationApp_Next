import {z} from 'zod';
import { bloodGroupMap } from './bloodgroupMap';

// Blood request schema (matches BloodRequest table)
export const BloodRequestSchema = z.object({
    blood_group: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
    units: z.number().min(1),
    reason: z.string().max(255).optional(),
    hospitalName: z.string().max(255),
    hospitalAddress: z.string().max(255),
    city: z.string().max(100),
    state: z.string().max(100),
    country: z.string().max(100),
    contactNumber: z.string().max(15),
    status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).default("PENDING").optional(),
    created_at: z.date().optional(),
    updated_at: z.date().optional()
})

export type BloodRequest = z.infer<typeof BloodRequestSchema>