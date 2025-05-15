import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { UserSchema } from '@/app/utils/validatedModels/user'
import prisma from '@/app/lib/prisma_client'
import { findUserExists } from '@/app/utils/dbqueries/UserQueries'

async function getformData(params: NextRequest) {
  const formdata = await params.formData()
  const userData = {
    full_name: formdata.get('full_name'),
    email: formdata.get('email'),
    password: formdata.get('password'),
    contact: formdata.get('contact'),
    blood_group: formdata.get('blood_group'),
    location: formdata.get('location'),
    role: formdata.get('role') || 'DONOR',
    available_to_donate: formdata.get('available_to_donate') || false,
    last_donated_at: formdata.get('last_donated_at') || undefined,
  }
  return userData
}

export async function POST(request: NextRequest) {
  const userData = await getformData(request)

  // Validate the user data using Zod
  const parsed = UserSchema.safeParse(userData)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  }


  // Check if the user already exists
  const existingUser = await findUserExists(parsed.data.email)
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(parsed.data.password, 10)

  const user = await prisma.user.create({
    data: {
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      password: hashedPassword,
      contact: parsed.data.contact,
      blood_group: parsed.data.blood_group, // already mapped to Prisma enum
      location: parsed.data.location,
      role: parsed.data.role,
      available_to_donate: parsed.data.available_to_donate,
      last_donated_at: parsed.data.last_donated_at,
    },
  })

  return NextResponse.json({ message: 'User created successfully', user }, { status: 201 })
}
