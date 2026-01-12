import { NextResponse } from 'next/server'
import { createBooking } from '@/services/booking.service'


export async function POST(req: Request) {
const body = await req.json()
return NextResponse.json(createBooking(body))
}