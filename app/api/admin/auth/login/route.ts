import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }
    
    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    })
    
    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Check password
    const isValidPassword = await admin.comparePassword(password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Update last login
    admin.lastLogin = new Date()
    await admin.save()
    
    // Generate JWT token
    const token = generateToken({
      id: admin._id.toString(),
      username: admin.username,
      email: admin.email,
      role: admin.role,
    })
    
    // Set cookie
    const cookie = setAuthCookie(token)
    
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      }
    })
    
    response.cookies.set(cookie)
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}