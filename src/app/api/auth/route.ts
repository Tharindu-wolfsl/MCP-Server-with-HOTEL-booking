// src/app/api/auth/route.ts
import { NextResponse } from 'next/server'
import { signToken } from '@/lib/jwt'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, role } = body

  const user = {
    id: crypto.randomUUID(),
    email,
    role: role || 'USER'
  }

  const token = signToken(user)

  return NextResponse.json({ token, user })
}
