import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { findUserExists, insertUserProfile } from '@/app/utils/dbqueries/UserProfileQueries'
import { UserProfileSchema } from '@/app/utils/validatedModels/userProfile'
import { sendEmail } from '@/app/lib/mailer'

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
  const parsed = UserProfileSchema.safeParse(userData)
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
  // Insert the user into the database
  const newUser = await insertUserProfile({...parsed.data,password: hashedPassword})
  if (!newUser) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }

  await sendEmail({ email: newUser.email, emailType: "VERIFY", userId: newUser.id })

  return NextResponse.json({ message: 'User created successfully please verify your email', user: newUser }, { status: 201 })
}
