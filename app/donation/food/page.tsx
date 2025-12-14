"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, DollarSign, Package, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function FoodDonationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    foodType: "",
    quantity: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({}) // Form errors state
  const { toast } = useToast()

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
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }
    
    if (!formData.foodType) {
      newErrors.foodType = "Please select a food type"
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required"
    } else {
      const quantity = Number(formData.quantity)
      if (isNaN(quantity) || quantity < 5) {
        newErrors.quantity = "Minimum donation quantity is 5 kg"
      }
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
    
    const quantity = Number(formData.quantity)

    setIsSubmitting(true)

    try {
      // Add timeout to fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch('/api/donations/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          foodType: formData.foodType,
          quantity: formData.quantity,
          address: formData.address,
          pickupDate: new Date(),
          message: formData.description,
        }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)

      const data = await response.json()

      if (response.ok && data.success) {
        toast({
          title: "Donation Request Submitted!",
          description: "Your food donation request has been submitted. We'll contact you soon to arrange pickup.",
          duration: 10000, // Show for 10 seconds
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          foodType: "",
          quantity: "",
          description: "",
        })
      } else {
        throw new Error(data.error || 'Failed to submit donation')
      }
    } catch (error: any) {
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
            backgroundImage: "url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&h=1080&fit=crop&q=85)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance"
          >
            Donate Food
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Help us feed hungry animals with your food donations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center mt-8"
          >
            <Link href="/donation/money">
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Money
              </Button>
            </Link>
            <Link href="/donation/food">
              <Button size="lg" variant="default">
                <Heart className="mr-2 h-5 w-5" />
                Food
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Food Donation Form */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Package className="h-8 w-8 text-primary" />
                    Food Donation Form
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Share details about the food you'd like to donate
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label htmlFor="address">Pickup Address *</Label>
                        {errors.address && (
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.address}</span>
                          </div>
                        )}
                        <Textarea
                          id="address"
                          required
                          value={formData.address}
                          onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value })
                            // Clear address error when user types
                            if (errors.address) {
                              setErrors(prev => {
                                const newErrors = {...prev}
                                delete newErrors.address
                                return newErrors
                              })
                            }
                          }}
                          placeholder="Enter complete address for food pickup"
                          rows={3}
                          className={errors.address ? "border-destructive" : ""}
                        />
                      </div>
                    </div>

                    {/* Food Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Food Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="foodType">Type of Food *</Label>
                        {errors.foodType && (
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.foodType}</span>
                          </div>
                        )}
                        <Select
                          value={formData.foodType}
                          onValueChange={(value) => {
                            setFormData({ ...formData, foodType: value })
                            // Clear foodType error when user selects
                            if (errors.foodType) {
                              setErrors(prev => {
                                const newErrors = {...prev}
                                delete newErrors.foodType
                                return newErrors
                              })
                            }
                          }}
                        >
                          <SelectTrigger id="foodType" className={errors.foodType ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dry-food">Dry Food (Kibble)</SelectItem>
                            <SelectItem value="wet-food">Wet Food (Canned)</SelectItem>
                            <SelectItem value="raw-food">Raw Food</SelectItem>
                            <SelectItem value="treats">Treats & Snacks</SelectItem>
                            <SelectItem value="grains">Grains & Cereals</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity (in kg) *</Label>
                        {errors.quantity && (
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.quantity}</span>
                          </div>
                        )}
                        <Input
                          id="quantity"
                          type="number"
                          required
                          value={formData.quantity}
                          onChange={(e) => {
                            setFormData({ ...formData, quantity: e.target.value })
                            // Clear quantity error when user types
                            if (errors.quantity) {
                              setErrors(prev => {
                                const newErrors = {...prev}
                                delete newErrors.quantity
                                return newErrors
                              })
                            }
                          }}
                          placeholder="Enter quantity in kilograms (minimum 5kg)"
                          className={errors.quantity ? "border-destructive" : ""}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Additional Details</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Any special notes about the food (expiry date, storage conditions, etc.)"
                          rows={4}
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                      <Heart className="mr-2 h-5 w-5" />
                      {isSubmitting ? "Submitting..." : "Submit Food Donation"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      We'll contact you within 24 hours to arrange pickup
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Food Donation Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Food should be fresh and within expiry date</li>
                    <li>Properly sealed and stored in hygienic conditions</li>
                    <li>No spoiled or contaminated food items</li>
                    <li>Vegetarian and non-vegetarian food both accepted</li>
                    <li>Minimum donation quantity: 5 kg</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}