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
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    console.log("Contact Form Data:", formData)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        })
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "",
        })
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "There was an error sending your message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast({
        title: "Network Error",
        description: "Unable to send message. Please check your connection and try again.",
        variant: "destructive",
      })
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
            backgroundImage: "url(https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=1920&h=1080&fit=crop&q=85)",
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            We're here to help. Reach out to us for any questions, support, or to learn more about our mission.
          </motion.p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Have questions about adoption, want to volunteer, or need help with our services? 
                    We'd love to hear from you. Our team is dedicated to helping animals and supporting our community.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Visit Us</h3>
                      <p className="text-muted-foreground">
                        123 Animal Care Street<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="text-muted-foreground">
                        Main: +91 98765 43210<br />
                        Emergency: +91 98765 43211<br />
                        Helpline: 1800-AVSAR-HELP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-muted-foreground">
                        General: info@avsar.org<br />
                        Adoption: adopt@avsar.org<br />
                        Support: support@avsar.org
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Emergency calls only
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <MessageCircle className="h-7 w-7 text-primary" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Personal Information */}
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

                      {/* Inquiry Type */}
                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                        >
                          <SelectTrigger id="inquiryType">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Information</SelectItem>
                            <SelectItem value="adoption">Pet Adoption</SelectItem>
                            <SelectItem value="donation">Donations</SelectItem>
                            <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                            <SelectItem value="helpline">Helpline Support</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Brief subject of your message"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please provide details about your inquiry..."
                          rows={6}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full text-lg" disabled={loading}>
                        <Send className="mr-2 h-5 w-5" />
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}