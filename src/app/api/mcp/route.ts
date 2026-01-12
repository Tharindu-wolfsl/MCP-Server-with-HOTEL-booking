import { mcpServer } from '@/mcp/server'
import { NextRequest, NextResponse } from 'next/server'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Create a simple transport wrapper for HTTP requests
    const responses: JSONRPCMessage[] = []
    const transport = new StdioServerTransport()
    
    // Override send to capture responses
    const originalSend = transport.send.bind(transport)
    transport.send = async (message: JSONRPCMessage) => {
      responses.push(message)
      return originalSend(message)
    }
    
    // Connect server to transport
    await mcpServer.connect(transport)
    
    // Send the request through the transport
    if (transport.onmessage) {
      await transport.onmessage(body)
    }
    
    // Return the response
    if (responses.length > 0) {
      return NextResponse.json(responses[0])
    }
    
    return NextResponse.json({ jsonrpc: '2.0', error: { code: -32603, message: 'No response' }, id: null })
  } catch (error) {
    console.error('MCP Error:', error)
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32603, message: 'Internal server error' }, id: null },
      { status: 500 }
    )
  }
}