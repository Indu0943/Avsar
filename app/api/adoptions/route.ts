import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AdoptionApplication from '@/models/AdoptionApplication'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received adoption application:', body)
    
    await connectDB()
    
    const application = await AdoptionApplication.create(body)
    
    console.log('Application created successfully:', application._id)
    
    return NextResponse.json(
      { success: true, data: application },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating adoption application:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    
    const applications = await AdoptionApplication.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
