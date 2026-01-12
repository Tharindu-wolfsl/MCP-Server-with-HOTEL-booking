import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { searchHotels } from '@/services/hotel.service'
import { createBooking } from '@/services/booking.service'

export const mcpServer = new Server(
  {
    name: 'hotel-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Register tools/list handler
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_hotels',
        description: 'Search hotels by location',
        inputSchema: {
          type: 'object' as const,
          properties: {
            location: {
              type: 'string',
              description: 'Location to search hotels in',
            },
          },
        },
      },
      {
        name: 'create_booking',
        description: 'Create a hotel booking (USER role only)',
        inputSchema: {
          type: 'object' as const,
          properties: {
            userId: { type: 'string' },
            hotelId: { type: 'string' },
            from: { type: 'string' },
            to: { type: 'string' },
          },
          required: ['userId', 'hotelId', 'from', 'to'],
        },
      },
    ],
  }
})

// Register tools/call handler
mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  switch (name) {
    case 'search_hotels': {
      const location = (args as Record<string, unknown>)?.location as string | undefined
      const hotels = searchHotels(location)
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(hotels, null, 2),
          },
        ],
      }
    }

    case 'create_booking': {
      const argsRecord = args as Record<string, unknown>
      const bookingInput = {
        userId: argsRecord?.userId as string,
        hotelId: argsRecord?.hotelId as string,
        from: argsRecord?.from as string,
        to: argsRecord?.to as string,
      }
      const booking = createBooking(bookingInput)
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(booking, null, 2),
          },
        ],
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
})