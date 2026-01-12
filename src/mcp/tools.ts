import { z } from 'zod'
import { searchHotels } from '@/services/hotel.service'
import { createBooking } from '@/services/booking.service'
import { User } from '@/types'

interface ToolContext {
  user: User
}

export const tools = {
  search_hotels: {
    description: 'Search hotels',
    inputSchema: z.object({ location: z.string().optional() }),
    execute: async ({ location }: { location?: string }) => searchHotels(location)
  },

  create_booking: {
    description: 'Create booking (USER only)',
    inputSchema: z.object({
      userId: z.string(),
      hotelId: z.string(),
      from: z.string(),
      to: z.string()
    }),
    execute: async (
      input: { userId: string; hotelId: string; from: string; to: string },
      ctx: ToolContext
    ) => {
      if (ctx.user.role !== 'USER') {
        throw new Error('Forbidden')
      }
      return createBooking(input)
    }
  }
}