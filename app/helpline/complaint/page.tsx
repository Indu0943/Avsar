"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Camera, Phone } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ComplaintPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    complaint: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/helpline/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Complaint Registered",
          description: "Your complaint has been submitted. Our team will respond within 24 hours.",
        })

        // Reset form
        setFormData({
          name: "",
          contact: "",
          address: "",
          complaint: "",
        })
      } else {
        throw new Error(data.error || "Failed to submit complaint")
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
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
            backgroundImage: "url(https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=1920&h=1080&fit=crop&q=85)",
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
            24/7 Helpline
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Report animal emergencies and get immediate assistance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <Link href="/helpline/complaint">
              <Button size="lg" variant="default">
                <AlertCircle className="mr-2 h-5 w-5" />
                Complaint
              </Button>
            </Link>
            <Link href="/helpline/camera">
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <Camera className="mr-2 h-5 w-5" />
                Camera
              </Button>
            </Link>
            <Link href="/helpline/call">
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Complaint Form */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <AlertCircle className="h-8 w-8 text-primary" />
                    File a Complaint
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Report animal abuse, neglect, or emergency situations
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number *</Label>
                      <Input
                        id="contact"
                        type="tel"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Location/Address *</Label>
                      <Textarea
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Enter the exact location where the incident occurred"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complaint">Complaint Details *</Label>
                      <Textarea
                        id="complaint"
                        required
                        value={formData.complaint}
                        onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                        placeholder="Describe the situation in detail - type of animal, condition, urgency level, etc."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                      <AlertCircle className="mr-2 h-5 w-5" />
                      {isSubmitting ? "Submitting..." : "Submit Complaint"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      For life-threatening emergencies, please call our helpline immediately
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card className="border-red-500/50 bg-red-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Emergency Response</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        If you witness an animal in immediate danger or severe distress, please call our emergency
                        helpline at <span className="font-bold text-foreground">+91-XXXX-XXXXXX</span> for instant
                        assistance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
