"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Heart,
  MessageSquare,
  AlertTriangle,
  UserPlus,
  DollarSign,
  Camera,
  Utensils,
  Search,
  Download,
  RefreshCw,
  CreditCard,
} from 'lucide-react'
import { format } from 'date-fns'

export default function DataTables() {
  const [activeTab, setActiveTab] = useState('adoptions')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>({
    adoptions: [],
    contacts: [],
    complaints: [],
    memberships: [],
    foodDonations: [],
    moneyDonations: [],
    cameraAnalyses: [],
  })

  useEffect(() => {
    fetchData(activeTab)
  }, [activeTab])

  const fetchData = async (type: string) => {
    setIsLoading(true)
    try {
      const endpoint = getEndpoint(type)
      const response = await fetch(endpoint)
      const result = await response.json()
      setData((prev: any) => ({ ...prev, [type]: result.data || [] }))
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const getEndpoint = (type: string) => {
    const endpoints: Record<string, string> = {
      adoptions: '/api/adoptions',
      contacts: '/api/contact',
      complaints: '/api/helpline/complaints',
      memberships: '/api/memberships',
      foodDonations: '/api/donations/food',
      moneyDonations: '/api/donations/money',
      payments: '/api/payments',
      cameraAnalyses: '/api/helpline/camera',
    }
    return endpoints[type] || '/api/adoptions'
  }

  const handleRefresh = () => {
    fetchData(activeTab)
  }

  const handleExport = () => {
    const currentData = data[activeTab]
    const dataStr = JSON.stringify(currentData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${activeTab}-${Date.now()}.json`
    link.click()
  }

  const tabs = [
    { id: 'adoptions', label: 'Adoptions', icon: Heart, color: 'text-pink-500' },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare, color: 'text-blue-500' },
    { id: 'complaints', label: 'Complaints', icon: AlertTriangle, color: 'text-orange-500' },
    { id: 'memberships', label: 'Memberships', icon: UserPlus, color: 'text-purple-500' },
    { id: 'foodDonations', label: 'Food Donations', icon: Utensils, color: 'text-green-500' },
    { id: 'moneyDonations', label: 'Money Donations', icon: DollarSign, color: 'text-yellow-500' },
    { id: 'payments', label: 'Payments', icon: CreditCard, color: 'text-blue-500' },
    { id: 'cameraAnalyses', label: 'Camera Reports', icon: Camera, color: 'text-indigo-500' },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      approved: 'bg-green-500/10 text-green-500 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
      resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
      'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      new: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    }
    return (
      <Badge variant="outline" className={variants[status] || 'bg-gray-500/10 text-gray-500'}>
        {status}
      </Badge>
    )
  }

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Database Records</CardTitle>
            <CardDescription>View and manage all your database records</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center gap-4">
            <ScrollArea className="flex-1">
              <TabsList className="inline-flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                      <Icon className={`w-4 h-4 ${tab.color}`} />
                      {tab.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </ScrollArea>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Adoptions Table */}
          <TabsContent value="adoptions">
            <AdoptionsTable data={data.adoptions} searchTerm={searchTerm} isLoading={isLoading} getStatusBadge={getStatusBadge} />
          </TabsContent>

          {/* Contacts Table */}
          <TabsContent value="contacts">
            <ContactsTable data={data.contacts} searchTerm={searchTerm} isLoading={isLoading} getStatusBadge={getStatusBadge} />
          </TabsContent>

          {/* Complaints Table */}
          <TabsContent value="complaints">
            <ComplaintsTable data={data.complaints} searchTerm={searchTerm} isLoading={isLoading} getStatusBadge={getStatusBadge} />
          </TabsContent>

          {/* Memberships Table */}
          <TabsContent value="memberships">
            <MembershipsTable data={data.memberships} searchTerm={searchTerm} isLoading={isLoading} />
          </TabsContent>

          {/* Food Donations Table */}
          <TabsContent value="foodDonations">
            <FoodDonationsTable data={data.foodDonations} searchTerm={searchTerm} isLoading={isLoading} />
          </TabsContent>

          {/* Money Donations Table */}
          <TabsContent value="moneyDonations">
            <MoneyDonationsTable data={data.moneyDonations} searchTerm={searchTerm} isLoading={isLoading} />
          </TabsContent>

          {/* Payments Table */}
          <TabsContent value="payments">
            <PaymentsTable data={data.payments} searchTerm={searchTerm} isLoading={isLoading} />
          </TabsContent>

          {/* Camera Analyses Table */}
          <TabsContent value="cameraAnalyses">
            <CameraAnalysesTable data={data.cameraAnalyses} searchTerm={searchTerm} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Adoptions Table Component
function AdoptionsTable({ data, searchTerm, isLoading, getStatusBadge }: any) {
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Animal Type</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">
                  {item.firstName} {item.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell className="capitalize">{item.animalType}</TableCell>
                <TableCell className="capitalize">{item.experience}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{format(new Date(item.createdAt), 'MMM dd, yyyy')}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

// Contacts Table Component
function ContactsTable({ data, searchTerm, isLoading, getStatusBadge }: any) {
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">
                  {item.firstName} {item.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell className="capitalize">{item.inquiryType}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{format(new Date(item.createdAt), 'MMM dd, yyyy')}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

// Complaints Table Component
function ComplaintsTable({ data, searchTerm, isLoading, getStatusBadge }: any) {
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Complaint</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell className="max-w-xs truncate">{item.address}</TableCell>
                <TableCell className="max-w-md truncate">{item.complaint}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{format(new Date(item.createdAt), 'MMM dd, yyyy')}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

// Memberships Table Component
function MembershipsTable({ data, searchTerm, isLoading }: any) {
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Membership Type</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">
                  {item.firstName} {item.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell className="capitalize">{item.membershipType}</TableCell>
                <TableCell>{format(new Date(item.createdAt), 'MMM dd, yyyy')}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

// Food Donations Table Component
function FoodDonationsTable({ data, searchTerm, isLoading }: any) {
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Food Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Pickup Date</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.foodType}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{format(new Date(item.pickupDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{format(new Date(item.createdAt), 'MMM dd, yyyy')}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

// Money Donations Table Component
function MoneyDonationsTable({ data, searchTerm, isLoading }: any) {
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell className="font-semibold">₹{item.amount.toLocaleString()}</TableCell>
                <TableCell className="capitalize">{item.frequency}</TableCell>
                <TableCell>{format(new Date(item.createdAt), 'MMM dd, yyyy')}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

// Payments Table Component
function PaymentsTable({ data, searchTerm, isLoading }: any) {
  // Ensure data is an array before filtering
  const filteredData = (data || []).filter((item: any) =>
    Object.values(item || {}).some((val) =>
      String(val || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Donor Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Card Last 4</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item?._id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">{item?.name || 'N/A'}</TableCell>
                <TableCell>{item?.email || 'N/A'}</TableCell>
                <TableCell className="font-semibold">₹{item?.amount?.toLocaleString() || 0}</TableCell>
                <TableCell className="capitalize">{item?.paymentMethod || 'N/A'}</TableCell>
                <TableCell>{item?.cardLastFour || 'N/A'}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      item?.paymentStatus === 'completed'
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : item?.paymentStatus === 'failed'
                        ? 'bg-red-500/10 text-red-500 border-red-500/20'
                        : item?.paymentStatus === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                    }
                  >
                    {item?.paymentStatus || 'unknown'}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{item?.transactionId || 'N/A'}</TableCell>
                <TableCell>{item?.createdAt ? format(new Date(item.createdAt), 'MMM dd, yyyy HH:mm') : 'N/A'}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

// Camera Analyses Table Component
function CameraAnalysesTable({ data, searchTerm, isLoading }: any) {
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  // Function to open image in new tab
  const viewImage = (imagePath: string) => {
    const fullUrl = `${window.location.origin}${imagePath}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Files</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item: any, index: number) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b"
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell className="max-w-xs truncate">{item.address}</TableCell>
                <TableCell>{item.fileCount} files</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      item.urgencyLevel === 'critical'
                        ? 'bg-red-500/10 text-red-500'
                        : item.urgencyLevel === 'high'
                        ? 'bg-orange-500/10 text-orange-500'
                        : item.urgencyLevel === 'medium'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-green-500/10 text-green-500'
                    }
                  >
                    {item.urgencyLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {item.files && item.files.length > 0 ? (
                      item.files.map((file: any, fileIndex: number) => (
                        <Button
                          key={fileIndex}
                          size="sm"
                          variant="outline"
                          onClick={() => viewImage(file.path)}
                          className="h-8 px-2"
                        >
                          View {fileIndex + 1}
                        </Button>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">No images</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{format(new Date(item.createdAt), 'MMM dd, yyyy')}</TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
