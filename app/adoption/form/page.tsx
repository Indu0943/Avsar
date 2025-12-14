"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Heart } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AdoptionFormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    occupation: "",
    animalType: "",
    experience: "",
    homeType: "",
    hasOtherPets: "",
    reason: "",
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the adoption terms and conditions",
        variant: "destructive",
      })
      return
    }

    console.log("Adoption Application:", formData)
    setLoading(true)

    try {
      // Add timeout to fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch('/api/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest in adoption. We'll contact you within 3-5 business days.",
        })
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          occupation: "",
          animalType: "",
          experience: "",
          homeType: "",
          hasOtherPets: "",
          reason: "",
          agreeTerms: false,
        })
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "There was an error submitting your application. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error('Error submitting form:', error)
      
      if (error.name === 'AbortError') {
        toast({
          title: "Request Timeout",
          description: "The request took too long to complete. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Network Error",
          description: "Unable to submit application. Please check your connection and try again.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&h=1080&fit=crop&q=85)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
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
            Adoption Application
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Start your journey to finding a forever friend
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center mt-8"
          >
            <Link href="/adoption/terms">
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <FileText className="mr-2 h-5 w-5" />
                Terms & Conditions
              </Button>
            </Link>
            <Link href="/adoption/form">
              <Button size="lg" variant="default">
                <Heart className="mr-2 h-5 w-5" />
                Adoption Form
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Heart className="h-8 w-8 text-primary" />
                    Adoption Application Form
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Please provide accurate information to help us find the perfect match
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Personal Information</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Enter first name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
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
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Textarea
                          id="address"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Enter your complete address"
                          rows={2}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="City"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="State"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            required
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            placeholder="Pincode"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation *</Label>
                        <Input
                          id="occupation"
                          required
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          placeholder="Your occupation"
                        />
                      </div>
                    </div>

                    {/* Adoption Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Adoption Preferences</h3>

                      <div className="space-y-2">
                        <Label htmlFor="animalType">Type of Animal *</Label>
                        <Select
                          value={formData.animalType}
                          onValueChange={(value) => setFormData({ ...formData, animalType: value })}
                        >
                          <SelectTrigger id="animalType">
                            <SelectValue placeholder="Select animal type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dog">Dog</SelectItem>
                            <SelectItem value="cat">Cat</SelectItem>
                            <SelectItem value="bird">Bird</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Previous Pet Experience *</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => setFormData({ ...formData, experience: value })}
                        >
                          <SelectTrigger id="experience">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="first-time">First Time Pet Owner</SelectItem>
                            <SelectItem value="some">Some Experience</SelectItem>
                            <SelectItem value="extensive">Extensive Experience</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="homeType">Type of Home *</Label>
                        <Select
                          value={formData.homeType}
                          onValueChange={(value) => setFormData({ ...formData, homeType: value })}
                        >
                          <SelectTrigger id="homeType">
                            <SelectValue placeholder="Select home type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">Independent House</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="farmhouse">Farmhouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasOtherPets">Do you have other pets? *</Label>
                        <Select
                          value={formData.hasOtherPets}
                          onValueChange={(value) => setFormData({ ...formData, hasOtherPets: value })}
                        >
                          <SelectTrigger id="hasOtherPets">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason">Why do you want to adopt? *</Label>
                        <Textarea
                          id="reason"
                          required
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          placeholder="Tell us about your motivation for adoption and how you plan to care for the animal"
                          rows={5}
                        />
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                      />
                      <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        I have read and agree to the{" "}
                        <Link href="/adoption/terms" className="text-primary hover:underline">
                          adoption terms and conditions
                        </Link>
                        . I understand that AVSAR reserves the right to conduct home visits and follow-ups. *
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={loading}>
                      <Heart className="mr-2 h-5 w-5" />
                      {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
