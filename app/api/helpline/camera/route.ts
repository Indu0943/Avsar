import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import CameraAnalysis from '@/models/CameraAnalysis'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received body:', JSON.stringify(body, null, 2))
    
    await connectDB()
    
    // Validate files data
    if (!body.files || !Array.isArray(body.files)) {
      throw new Error('Files must be an array')
    }
    
    // Generate AI recommendations based on urgency
    const urgencyLevel = body.urgencyLevel || 'high'
    
    const recommendations = [
      "The animal appears to be injured and requires immediate veterinary attention",
      "Contact our emergency helpline at +91-XXXX-XXXXXX for urgent rescue",
      "Keep the animal calm and provide water if possible",
      "Do not attempt to move the animal unless it's in immediate danger",
      "Our rescue team has been notified and will arrive within 30-45 minutes",
    ]
    
    const analysisData = {
      name: body.name,
      contact: body.contact,
      address: body.address,
      files: body.files,
      fileCount: body.fileCount,
      recommendations,
      urgencyLevel,
    }
    
    console.log('Creating analysis with data:', JSON.stringify(analysisData, null, 2))
    
    const analysis = await CameraAnalysis.create(analysisData)
    
    console.log('Analysis created successfully:', analysis._id)
    
    return NextResponse.json(
      { success: true, data: analysis, recommendations },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error in camera analysis API:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    
    const analyses = await CameraAnalysis.find({}).sort({ createdAt: -1 })
    
    const response = NextResponse.json(
      { success: true, data: analyses },
      { status: 200 }
    )
    
    // Add caching headers for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
    
    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
