"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Heart,
  MessageSquare,
  AlertTriangle,
  UserPlus,
  DollarSign,
  Camera,
  Clock,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Activity {
  id: string
  type: string
  title: string
  description: string
  timestamp: Date
  status?: string
}

export default function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/activities')
      const data = await response.json()
      setActivities(data.activities || [])
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'adoption':
        return Heart
      case 'contact':
        return MessageSquare
      case 'complaint':
        return AlertTriangle
      case 'membership':
        return UserPlus
      case 'donation':
        return DollarSign
      case 'camera':
        return Camera
      default:
        return Clock
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'adoption':
        return 'from-pink-500 to-rose-500'
      case 'contact':
        return 'from-blue-500 to-cyan-500'
      case 'complaint':
        return 'from-orange-500 to-yellow-500'
      case 'membership':
        return 'from-purple-500 to-indigo-500'
      case 'donation':
        return 'from-green-500 to-emerald-500'
      case 'camera':
        return 'from-indigo-500 to-purple-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'adoption':
        return 'bg-pink-500/10'
      case 'contact':
        return 'bg-blue-500/10'
      case 'complaint':
        return 'bg-orange-500/10'
      case 'membership':
        return 'bg-purple-500/10'
      case 'donation':
        return 'bg-green-500/10'
      case 'camera':
        return 'bg-indigo-500/10'
      default:
        return 'bg-gray-500/10'
    }
  }

  if (isLoading) {
    return (
      <Card className="border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-10 h-10 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates from your organization</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent activities
              </div>
            ) : (
              activities.map((activity, index) => {
                const Icon = getIcon(activity.type)
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`${getBgColor(activity.type)} p-2 rounded-lg h-fit`}
                    >
                      <Icon className={`w-5 h-5 bg-gradient-to-br ${getColor(activity.type)} bg-clip-text text-transparent`} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm">{activity.title}</p>
                        {activity.status && (
                          <Badge variant="outline" className="text-xs">
                            {activity.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
