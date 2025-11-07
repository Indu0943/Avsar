import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ success: true })
    
    // Clear the auth cookie
    response.cookies.set({
      name: 'admin-token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
    
    return response
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}