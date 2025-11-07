import { NextResponse } from 'next/server'
import { getAdminFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'

export async function GET() {
  try {
    const adminPayload = await getAdminFromToken()
    
    if (!adminPayload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await connectDB()
    
    const admin = await Admin.findById(adminPayload.id).select('-password')
    
    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { error: 'Admin not found or inactive' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt,
      }
    })
    
  } catch (error) {
    console.error('Get admin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}