import { NextResponse } from 'next/server'
import { getAdminFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import AdoptionApplication from '@/models/AdoptionApplication'
import Contact from '@/models/Contact'
import Complaint from '@/models/Complaint'
import Membership from '@/models/Membership'
import MoneyDonation from '@/models/MoneyDonation'
import CameraAnalysis from '@/models/CameraAnalysis'

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
    
    // Fetch recent records from all collections
    const [adoptions, contacts, complaints, memberships, donations, cameraAnalyses] = await Promise.all([
      AdoptionApplication.find().sort({ createdAt: -1 }).limit(5).lean(),
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
      Complaint.find().sort({ createdAt: -1 }).limit(5).lean(),
      Membership.find().sort({ createdAt: -1 }).limit(5).lean(),
      MoneyDonation.find().sort({ createdAt: -1 }).limit(5).lean(),
      CameraAnalysis.find().sort({ createdAt: -1 }).limit(5).lean(),
    ])
    
    // Format activities
    const activities = [
      ...adoptions.map((item: any) => ({
        id: item._id,
        type: 'adoption',
        title: 'New Adoption Application',
        description: `${item.firstName} ${item.lastName} applied to adopt a ${item.animalType}`,
        timestamp: item.createdAt,
        status: item.status,
      })),
      ...contacts.map((item: any) => ({
        id: item._id,
        type: 'contact',
        title: 'New Contact Message',
        description: `${item.firstName} ${item.lastName} - ${item.subject}`,
        timestamp: item.createdAt,
        status: item.status,
      })),
      ...complaints.map((item: any) => ({
        id: item._id,
        type: 'complaint',
        title: 'New Complaint',
        description: `${item.name} - ${item.complaint.substring(0, 50)}...`,
        timestamp: item.createdAt,
        status: item.status,
      })),
      ...memberships.map((item: any) => ({
        id: item._id,
        type: 'membership',
        title: 'New Membership',
        description: `${item.firstName} ${item.lastName} joined as ${item.membershipType}`,
        timestamp: item.createdAt,
      })),
      ...donations.map((item: any) => ({
        id: item._id,
        type: 'donation',
        title: 'New Donation',
        description: `${item.name} donated ₹${item.amount}`,
        timestamp: item.createdAt,
      })),
      ...cameraAnalyses.map((item: any) => ({
        id: item._id,
        type: 'camera',
        title: 'New Camera Report',
        description: `${item.name} submitted ${item.fileCount} files - ${item.urgencyLevel} urgency`,
        timestamp: item.createdAt,
      })),
    ]
    
    // Sort by timestamp and limit to 20
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20)
    
    return NextResponse.json({ activities: sortedActivities })
    
  } catch (error) {
    console.error('Activities fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
