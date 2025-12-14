"use client"

import type React from "react"

import { useState, lazy, Suspense, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, CreditCard, DollarSign, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// Lazy load framer-motion components
const MotionDiv = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.div })))
const MotionH1 = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.h1 })))
const MotionP = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.p })))

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
  const [errors, setErrors] = useState<{[key: string]: string}>({}) // Form errors state
  const { toast } = useToast()
  const router = useRouter()

  // Clear errors when user starts typing
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const clearErrors = setTimeout(() => {
        setErrors({})
      }, 5000) // Clear errors after 5 seconds
      return () => clearTimeout(clearErrors)
    }
  }, [errors])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    const amount = selectedAmount || (customAmount ? Number.parseInt(customAmount) : 0)
    if (!amount || amount <= 0) {
      newErrors.amount = "Please select or enter a valid donation amount"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please correct the errors in the form before submitting",
        variant: "destructive",
        duration: 8000, // Show for 8 seconds
      })
      return
    }
    
    const amount = selectedAmount || Number.parseInt(customAmount)

    setIsSubmitting(true)

    try {
      // Add timeout to fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
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
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)

      const data = await response.json()

      if (response.ok && data.success) {
        // Show success message before redirect
        toast({
          title: "Donation Registered",
          description: "Your donation has been registered successfully. Redirecting to payment...",
          duration: 5000, // Show for 5 seconds
        })
        
        // Validate that we have the required data before redirecting
        if (!data.data || !data.data._id) {
          throw new Error('Donation ID is missing from response')
        }
        
        // Redirect to payment page with donation details
        // Using window.location to ensure full page navigation
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: amount.toString(),
          donationId: data.data._id
        }).toString()
        
        // Add a small delay to ensure the success message is visible
        setTimeout(() => {
          window.location.href = `/donation/money/payment?${params}`
        }, 2000)
      } else {
        throw new Error(data.error || 'Failed to submit donation')
      }
    } catch (error: any) {
      console.error('Donation submission error:', error)
      if (error.name === 'AbortError') {
        toast({
          title: "Request Timeout",
          description: "The request took too long to complete. Please try again.",
          variant: "destructive",
          duration: 10000, // Show for 10 seconds
        })
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to submit donation. Please try again.",
          variant: "destructive",
          duration: 10000, // Show for 10 seconds
        })
      }
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
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="container relative z-10 px-4 text-center">
          <Suspense fallback={<h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance">Make a Donation</h1>}>
            <MotionH1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance"
            >
              Make a Donation
            </MotionH1>
          </Suspense>
          <Suspense fallback={<p className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed">Your generosity helps us rescue, rehabilitate, and rehome animals in need</p>}>
            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              Your generosity helps us rescue, rehabilitate, and rehome animals in need
            </MotionP>
          </Suspense>

          <Suspense fallback={
            <div className="flex gap-4 justify-center mt-8">
              <Button size="lg" variant="default">
                <DollarSign className="mr-2 h-5 w-5" />
                Money
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <Heart className="mr-2 h-5 w-5" />
                Food
              </Button>
            </div>
          }>
            <MotionDiv
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
            </MotionDiv>
          </Suspense>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <Suspense fallback={<div className="shadow-xl"><Card><CardContent>Loading...</CardContent></Card></div>}>
              <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                        {errors.amount && (
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.amount}</span>
                          </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {donationAmounts.map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={selectedAmount === amount ? "default" : "outline"}
                              className={`h-16 text-lg ${errors.amount ? "border-destructive" : ""}`}
                              onClick={() => {
                                setSelectedAmount(amount)
                                setCustomAmount(amount.toString())
                                // Clear amount error when user selects an amount
                                if (errors.amount) {
                                  setErrors(prev => {
                                    const newErrors = {...prev}
                                    delete newErrors.amount
                                    return newErrors
                                  })
                                }
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
                              // Clear amount error when user types
                              if (errors.amount) {
                                setErrors(prev => {
                                  const newErrors = {...prev}
                                  delete newErrors.amount
                                  return newErrors
                                })
                              }
                            }}
                            className={`text-lg h-12 ${errors.amount ? "border-destructive" : ""}`}
                          />
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Your Information</h3>

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          {errors.name && (
                            <div className="flex items-center gap-2 text-sm text-destructive">
                              <AlertCircle className="h-4 w-4" />
                              <span>{errors.name}</span>
                            </div>
                          )}
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value })
                              // Clear name error when user types
                              if (errors.name) {
                                setErrors(prev => {
                                  const newErrors = {...prev}
                                  delete newErrors.name
                                  return newErrors
                                })
                              }
                            }}
                            placeholder="Enter your full name"
                            className={errors.name ? "border-destructive" : ""}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          {errors.email && (
                            <div className="flex items-center gap-2 text-sm text-destructive">
                              <AlertCircle className="h-4 w-4" />
                              <span>{errors.email}</span>
                            </div>
                          )}
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value })
                              // Clear email error when user types
                              if (errors.email) {
                                setErrors(prev => {
                                  const newErrors = {...prev}
                                  delete newErrors.email
                                  return newErrors
                                })
                              }
                            }}
                            placeholder="your.email@example.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          {errors.phone && (
                            <div className="flex items-center gap-2 text-sm text-destructive">
                              <AlertCircle className="h-4 w-4" />
                              <span>{errors.phone}</span>
                            </div>
                          )}
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value })
                              // Clear phone error when user types
                              if (errors.phone) {
                                setErrors(prev => {
                                  const newErrors = {...prev}
                                  delete newErrors.phone
                                  return newErrors
                                })
                              }
                            }}
                            placeholder="+91 XXXXX XXXXX"
                            className={errors.phone ? "border-destructive" : ""}
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
              </MotionDiv>
            </Suspense>

            {/* Impact Section */}
            <Suspense fallback={<div className="mt-12 grid md:grid-cols-3 gap-6"><div className="text-center">Loading...</div></div>}>
              <MotionDiv
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
              </MotionDiv>
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  )
}