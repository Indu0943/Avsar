import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import MoneyDonation from '@/models/MoneyDonation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    await connectDB()
    
    const donation = await MoneyDonation.create(body)
    
    return NextResponse.json(
      { success: true, data: donation },
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
    
    const donations = await MoneyDonation.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json(
      { success: true, data: donations },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
