import { searchHotels } from '@/services/hotel.service'


export default function HotelsPage() {
  const hotels = searchHotels()


  return (
    <div className="grid gap-4 p-6">
      {hotels.map(h => (
        <div key={h.id} className="border p-4 rounded">
          <h2>{h.name}</h2>
          <p>{h.location}</p>
          <p>Rs. {h.pricePerNight}</p>
        </div>
      ))}
    </div>
  )
}