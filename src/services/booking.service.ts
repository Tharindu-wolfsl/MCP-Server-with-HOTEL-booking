// src/services/booking.service.ts
import { Booking } from '@/types'


const bookings: Booking[] = []


export function createBooking(input: Omit<Booking, 'id'>): Booking {
const booking: Booking = {
id: crypto.randomUUID(),
...input
}
bookings.push(booking)
return booking
}