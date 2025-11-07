import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received contact form submission:', body)
    
    await connectDB()
    
    const contact = await Contact.create(body)
    
    console.log('Contact form submitted successfully:', contact._id)
    
    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}