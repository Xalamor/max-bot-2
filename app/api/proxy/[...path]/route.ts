import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params
  const url = `https://university-schedule-bot.vercel.app/api/${path.join('/')}`
  
  try {
    const body = await request.json()
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params
  const url = `https://university-schedule-bot.vercel.app/api/${path.join('/')}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 })
  }
}