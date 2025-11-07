"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

export default function AnalyticsCharts() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats')
      const result = await response.json()
      setData(result.stats)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-32 bg-muted rounded" />
              <div className="h-4 w-48 bg-muted rounded mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const donationData = [
    { name: 'Food Donations', value: data?.foodDonations || 0, color: '#10b981' },
    { name: 'Money Donations', value: data?.moneyDonations || 0, color: '#f59e0b' },
  ]

  const applicationData = [
    { name: 'Adoptions', value: data?.adoptions || 0, color: '#ec4899' },
    { name: 'Memberships', value: data?.memberships || 0, color: '#8b5cf6' },
  ]

  const supportData = [
    { name: 'Contacts', value: data?.contacts || 0, color: '#3b82f6' },
    { name: 'Complaints', value: data?.complaints || 0, color: '#f97316' },
    { name: 'Camera Reports', value: data?.cameraAnalyses || 0, color: '#6366f1' },
  ]

  const monthlyTrend = [
    { month: 'Jan', adoptions: 12, donations: 25, contacts: 18 },
    { month: 'Feb', adoptions: 19, donations: 32, contacts: 24 },
    { month: 'Mar', adoptions: 15, donations: 28, contacts: 21 },
    { month: 'Apr', adoptions: 22, donations: 35, contacts: 29 },
    { month: 'May', adoptions: 28, donations: 42, contacts: 35 },
    { month: 'Jun', adoptions: 24, donations: 38, contacts: 31 },
  ]

  const COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#f97316', '#10b981', '#f59e0b', '#6366f1']

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Donation Distribution */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Donation Distribution</CardTitle>
            <CardDescription>Food vs Money donations breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={donationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {donationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Applications Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Applications Overview</CardTitle>
            <CardDescription>Adoptions and membership applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Support Requests */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Support Requests</CardTitle>
            <CardDescription>Contacts, complaints, and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supportData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={800}>
                  {supportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Activity trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="adoptions"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={800}
                />
                <Line
                  type="monotone"
                  dataKey="donations"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={800}
                />
                <Line
                  type="monotone"
                  dataKey="contacts"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
