import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'

export interface AdminPayload {
  id: string
  username: string
  email: string
  role: string
}

export function generateToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload
  } catch {
    return null
  }
}

export async function getAdminFromToken(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin-token')?.value
    
    if (!token) return null
    
    return verifyToken(token)
  } catch {
    return null
  }
}

export function setAuthCookie(token: string) {
  return {
    name: 'admin-token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  }
}