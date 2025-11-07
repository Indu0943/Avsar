"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Heart,
  MessageSquare,
  AlertTriangle,
  Camera,
  DollarSign,
  UserPlus,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stats {
  adoptions: number
  contacts: number
  complaints: number
  memberships: number
  foodDonations: number
  moneyDonations: number
  cameraAnalyses: number
  totalDonationAmount: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats')
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Adoptions',
      value: stats?.adoptions || 0,
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      title: 'Contact Messages',
      value: stats?.contacts || 0,
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Complaints',
      value: stats?.complaints || 0,
      icon: AlertTriangle,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Memberships',
      value: stats?.memberships || 0,
      icon: UserPlus,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Food Donations',
      value: stats?.foodDonations || 0,
      icon: Heart,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Money Donations',
      value: stats?.moneyDonations || 0,
      icon: DollarSign,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Camera Analyses',
      value: stats?.cameraAnalyses || 0,
      icon: Camera,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10',
    },
    {
      title: 'Total Donation Amount',
      value: `₹${stats?.totalDonationAmount?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-500/10',
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-8 w-8 bg-muted rounded-lg" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${stat.bgColor} p-2 rounded-lg`}
                >
                  <Icon className={`w-4 h-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="text-2xl font-bold"
                >
                  {stat.value}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
