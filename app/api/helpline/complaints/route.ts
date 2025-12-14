import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Complaint from '@/models/Complaint'
import { getFromCache, setInCache } from '@/lib/redis'

export async function POST(request: Request) {
  try {
    // Check if request has body
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    // Check if request body is empty
    const contentLength = request.headers.get('content-length')
    if (!contentLength || parseInt(contentLength) === 0) {
      return NextResponse.json(
        { success: false, error: 'Request body is empty' },
        { status: 400 }
      )
    }

    // Parse request body with error handling
    let body;
    try {
      body = await request.json()
    } catch (jsonError) {
      console.error('Error parsing JSON body:', jsonError)
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.name || !body.contact || !body.address || !body.complaint) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields. Please fill in all required information.' },
        { status: 400 }
      )
    }

    // Connect to database with timeout
    await Promise.race([
      connectDB(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 5000)
      )
    ])
    
    // Create complaint with timeout
    const complaint = await Promise.race([
      Complaint.create(body),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timeout')), 5000)
      )
    ])
    
    return NextResponse.json(
      { success: true, data: complaint },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating complaint:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    // Try to get from cache first
    const cacheKey = 'complaints_list'
    const cachedData = await getFromCache(cacheKey)
    
    if (cachedData) {
      const response = NextResponse.json(
        { success: true, data: cachedData },
        { status: 200 }
      )
      
      // Add caching headers
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
      response.headers.set('X-Cache', 'HIT')
      
      return response
    }
    
    await connectDB()
    
    const complaints = await Complaint.find({}, {
      name: 1,
      contact: 1,
      address: 1,
      complaint: 1,
      status: 1,
      createdAt: 1
    }).sort({ createdAt: -1 })
    
    // Cache the result for 60 seconds
    await setInCache(cacheKey, complaints, 60)
    
    const response = NextResponse.json(
      { success: true, data: complaints },
      { status: 200 }
    )
    
    // Add caching headers for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
    response.headers.set('X-Cache', 'MISS')
    
    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}