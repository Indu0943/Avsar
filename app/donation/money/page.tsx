"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, CreditCard, DollarSign } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const donationAmounts = [500, 1000, 2500, 5000, 10000]

export default function MoneyDonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = selectedAmount || Number.parseInt(customAmount)

    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/donations/money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: amount,
          frequency: 'one-time',
          message: formData.pan,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to payment page with donation details
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: amount.toString(),
          donationId: data.data._id
        }).toString()
        
        router.push(`/donation/money/payment?${params}`)
      } else {
        throw new Error(data.error || 'Failed to submit donation')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=1080&fit=crop&q=85)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance"
          >
            Make a Donation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Your generosity helps us rescue, rehabilitate, and rehome animals in need
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center mt-8"
          >
            <Link href="/donation/money">
              <Button size="lg" variant="default">
                <DollarSign className="mr-2 h-5 w-5" />
                Money
              </Button>
            </Link>
            <Link href="/donation/food">
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <Heart className="mr-2 h-5 w-5" />
                Food
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <CreditCard className="h-8 w-8 text-primary" />
                    Money Donation
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Every contribution makes a difference in an animal's life
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Donation Amount Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Select Amount (₹)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {donationAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className="h-16 text-lg"
                            onClick={() => {
                              setSelectedAmount(amount)
                              setCustomAmount(amount.toString())
                            }}
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customAmount">Or Enter Custom Amount</Label>
                        <Input
                          id="customAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setSelectedAmount(null)
                          }}
                          className="text-lg h-12"
                        />
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Your Information</h3>

                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pan">Address</Label>
                        <Input
                          id="pan"
                          value={formData.pan}
                          onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                          placeholder="ABCDE1234F"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                      <Heart className="mr-2 h-5 w-5" />
                      {isSubmitting ? "Processing..." : "Proceed to Payment"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      Your donation is secure and tax-deductible under 80G
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                { amount: "₹500", impact: "Feeds 10 animals for a day" },
                { amount: "₹2,500", impact: "Provides medical care for 1 animal" },
                { amount: "₹10,000", impact: "Rescues and rehabilitates 1 animal" },
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">{item.amount}</div>
                    <p className="text-muted-foreground">{item.impact}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
