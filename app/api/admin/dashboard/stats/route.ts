import { NextResponse } from 'next/server'
import { getAdminFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import MoneyDonation from '@/models/MoneyDonation'
import FoodDonation from '@/models/FoodDonation'
import Membership from '@/models/Membership'
import Complaint from '@/models/Complaint'
import CameraAnalysis from '@/models/CameraAnalysis'
import Contact from '@/models/Contact'
import AdoptionApplication from '@/models/AdoptionApplication'

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
    
    // Get current date ranges
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    // Parallel queries for better performance
    const [
      totalMoneyDonations,
      totalFoodDonations,
      totalMemberships,
      totalComplaints,
      totalCameraAnalyses,
      totalContacts,
      totalAdoptions,
      monthlyMoneyDonations,
      weeklyStats,
      dailyStats,
      recentActivities,
      donationTrends,
      complaintStats,
      membershipStats
    ] = await Promise.all([
      // Total counts
      MoneyDonation.countDocuments(),
      FoodDonation.countDocuments(),
      Membership.countDocuments(),
      Complaint.countDocuments(),
      CameraAnalysis.countDocuments(),
      Contact.countDocuments(),
      AdoptionApplication.countDocuments(),
      
      // Monthly money donations sum
      MoneyDonation.aggregate([
        { $match: { createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      
      // Weekly stats
      Promise.all([
        MoneyDonation.countDocuments({ createdAt: { $gte: startOfWeek } }),
        FoodDonation.countDocuments({ createdAt: { $gte: startOfWeek } }),
        Membership.countDocuments({ createdAt: { $gte: startOfWeek } }),
        Complaint.countDocuments({ createdAt: { $gte: startOfWeek } }),
      ]),
      
      // Daily stats
      Promise.all([
        MoneyDonation.countDocuments({ createdAt: { $gte: startOfDay } }),
        FoodDonation.countDocuments({ createdAt: { $gte: startOfDay } }),
        Membership.countDocuments({ createdAt: { $gte: startOfDay } }),
        Complaint.countDocuments({ createdAt: { $gte: startOfDay } }),
      ]),
      
      // Recent activities (last 10)
      Promise.all([
        MoneyDonation.find().sort({ createdAt: -1 }).limit(5).select('name amount createdAt'),
        Membership.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName membershipType createdAt'),
        Complaint.find().sort({ createdAt: -1 }).limit(5).select('name status createdAt'),
      ]),
      
      // Donation trends (last 7 days)
      MoneyDonation.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
            amount: { $sum: '$amount' }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      
      // Complaint status distribution
      Complaint.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      
      // Membership type distribution
      Membership.aggregate([
        { $group: { _id: '$membershipType', count: { $sum: 1 } } }
      ])
    ])
    
    // Calculate total donation amount
    const totalDonationAmount = await MoneyDonation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])

    const stats = {
      adoptions: totalAdoptions,
      contacts: totalContacts,
      complaints: totalComplaints,
      memberships: totalMemberships,
      foodDonations: totalFoodDonations,
      moneyDonations: totalMoneyDonations,
      cameraAnalyses: totalCameraAnalyses,
      totalDonationAmount: totalDonationAmount[0]?.total || 0,
      
      overview: {
        totalRecords: totalMoneyDonations + totalFoodDonations + totalMemberships + totalComplaints + totalCameraAnalyses + totalContacts + totalAdoptions,
        totalDonations: totalMoneyDonations + totalFoodDonations,
        totalMembers: totalMemberships,
        totalComplaints: totalComplaints,
        monthlyRevenue: monthlyMoneyDonations[0]?.total || 0,
      },
      
      counts: {
        moneyDonations: totalMoneyDonations,
        foodDonations: totalFoodDonations,
        memberships: totalMemberships,
        complaints: totalComplaints,
        cameraAnalyses: totalCameraAnalyses,
        contacts: totalContacts,
        adoptions: totalAdoptions,
      },
      
      weekly: {
        moneyDonations: weeklyStats[0],
        foodDonations: weeklyStats[1],
        memberships: weeklyStats[2],
        complaints: weeklyStats[3],
      },
      
      daily: {
        moneyDonations: dailyStats[0],
        foodDonations: dailyStats[1],
        memberships: dailyStats[2],
        complaints: dailyStats[3],
      },
      
      recentActivities: {
        donations: recentActivities[0],
        memberships: recentActivities[1],
        complaints: recentActivities[2],
      },
      
      trends: {
        donations: donationTrends,
        complaints: complaintStats,
        memberships: membershipStats,
      }
    }
    
    return NextResponse.json({ stats })
    
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}