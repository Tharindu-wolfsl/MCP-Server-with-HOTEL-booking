import { Hotel } from '@/types'


const hotels: Hotel[] = [
{ id: '1', name: 'Sea View Hotel', location: 'Galle', pricePerNight: 12000 },
{ id: '2', name: 'Hill Top Resort', location: 'Kandy', pricePerNight: 15000 }
]


export function searchHotels(location?: string): Hotel[] {
if (!location) return hotels
return hotels.filter(h => h.location === location)
}