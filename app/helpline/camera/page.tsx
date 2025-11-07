"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Camera, Phone, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CameraPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<string[] | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
      setRecommendations(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form fields
    if (!formData.name || !formData.contact || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, contact, and address",
        variant: "destructive",
      })
      return
    }

    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please upload at least one photo",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      console.log("Starting upload process...")
      console.log("Selected files:", selectedFiles.length)

      // Step 1: Upload files to server
      const uploadFormData = new FormData()
      selectedFiles.forEach((file) => {
        console.log("Adding file:", file.name, file.size, file.type)
        uploadFormData.append("files", file)
      })

      console.log("Uploading to /api/upload...")
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      console.log("Upload response status:", uploadResponse.status)
      const uploadData = await uploadResponse.json()
      console.log("Upload response data:", uploadData)

      if (!uploadData.success) {
        throw new Error(uploadData.error || "Failed to upload files")
      }

      // Step 2: Save analysis to database
      console.log("Saving analysis to database...")
      const analysisResponse = await fetch("/api/helpline/camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          address: formData.address,
          files: uploadData.files,
          fileCount: uploadData.files.length,
          urgencyLevel: "high",
        }),
      })

      console.log("Analysis response status:", analysisResponse.status)
      const analysisData = await analysisResponse.json()
      console.log("Analysis response data:", analysisData)

      if (analysisData.success) {
        setRecommendations(analysisData.recommendations)
        toast({
          title: "Analysis Complete",
          description: "Photos uploaded and recommendations generated successfully",
        })

        // Reset form
        setFormData({
          name: "",
          contact: "",
          address: "",
        })
        setSelectedFiles([])
      } else {
        throw new Error(analysisData.error || "Failed to analyze photos")
      }
    } catch (error) {
      console.error("Error during submission:", error)
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920&h=1080&fit=crop&q=85)",
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
            Photo Analysis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Upload photos for AI-powered assessment and recommendations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <Link href="/helpline/complaint">
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <AlertCircle className="mr-2 h-5 w-5" />
                Complaint
              </Button>
            </Link>
            <Link href="/helpline/camera">
              <Button size="lg" variant="default">
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

      {/* Upload Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Camera className="h-8 w-8 text-primary" />
                    Upload Photos
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Upload clear photos of the animal for instant analysis and recommendations
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
                        placeholder="Enter the exact location where the animal was found"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="photos">Upload Photos *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                        <input
                          id="photos"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="photos" className="cursor-pointer">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-lg font-medium mb-2">Click to upload photos</p>
                          <p className="text-sm text-muted-foreground">
                            Support for JPG, PNG, HEIC (Max 10 files, 5MB each)
                          </p>
                        </label>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Selected Files:</p>
                          <div className="space-y-1">
                            {selectedFiles.map((file, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                {file.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-5 w-5" />
                          Analyze Photos
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommendations */}
            {recommendations && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <Card className="shadow-xl border-green-500/50 bg-green-500/5">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <CheckCircle className="h-7 w-7 text-green-500" />
                      Analysis Complete
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="font-semibold">Recommendations:</p>
                      <ul className="space-y-2">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{rec}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Photo Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Take clear, well-lit photos from multiple angles</li>
                    <li>Include close-ups of any visible injuries or issues</li>
                    <li>Capture the animal's surroundings for context</li>
                    <li>Avoid using flash if it distresses the animal</li>
                    <li>Upload at least 2-3 photos for accurate analysis</li>
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
