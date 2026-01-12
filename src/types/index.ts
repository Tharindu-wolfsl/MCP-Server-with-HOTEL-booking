export type Role = 'USER' | 'ADMIN'


export interface User {
id: string
email: string
role: Role
}


export interface Hotel {
id: string
name: string
location: string
pricePerNight: number
}


export interface Booking {
id: string
userId: string
hotelId: string
from: string
to: string
}