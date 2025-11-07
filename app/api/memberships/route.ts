import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Membership from '@/models/Membership'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    await connectDB()
    
    const membership = await Membership.create(body)
    
    return NextResponse.json(
      { success: true, data: membership },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    
    const memberships = await Membership.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json(
      { success: true, data: memberships },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
