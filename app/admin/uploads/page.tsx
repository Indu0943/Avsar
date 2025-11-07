"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Download, Eye } from "lucide-react"
import Image from "next/image"

interface FileInfo {
  originalName: string
  filename: string
  path: string
  size: number
  type: string
}

interface Analysis {
  _id: string
  name: string
  contact: string
  address: string
  files: FileInfo[]
  fileCount: number
  recommendations: string[]
  urgencyLevel: string
  createdAt: string
}

export default function UploadsAdminPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyses()
  }, [])

  const fetchAnalyses = async () => {
    try {
      const response = await fetch("/api/helpline/camera")
      const data = await response.json()
      if (data.success) {
        setAnalyses(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch analyses:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Uploaded Files Admin</h1>
        <p className="text-muted-foreground">View and manage all uploaded camera analysis files</p>
      </div>

      <div className="grid gap-6">
        {analyses.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No uploads yet</p>
            </CardContent>
          </Card>
        ) : (
          analyses.map((analysis) => (
            <Card key={analysis._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Analysis #{analysis._id.slice(-6)}
                  </span>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      analysis.urgencyLevel === "critical"
                        ? "bg-red-500/20 text-red-500"
                        : analysis.urgencyLevel === "high"
                          ? "bg-orange-500/20 text-orange-500"
                          : analysis.urgencyLevel === "medium"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-green-500/20 text-green-500"
                    }`}
                  >
                    {analysis.urgencyLevel.toUpperCase()}
                  </span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{formatDate(analysis.createdAt)}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold mb-2">Reporter Information</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <p className="font-medium">{analysis.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contact:</span>
                        <p className="font-medium">{analysis.contact}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-medium">{analysis.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Files Grid */}
                  <div>
                    <h3 className="font-semibold mb-3">
                      Uploaded Files ({analysis.fileCount})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {analysis.files.map((file, index) => (
                        <div key={index} className="border rounded-lg p-3 space-y-2">
                          {file.type.startsWith("image/") && (
                            <div className="relative aspect-square bg-muted rounded overflow-hidden">
                              <Image
                                src={file.path}
                                alt={file.originalName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="space-y-1">
                            <p className="text-xs font-medium truncate" title={file.originalName}>
                              {file.originalName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs flex-1"
                                onClick={() => window.open(file.path, "_blank")}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs flex-1"
                                onClick={() => {
                                  const a = document.createElement("a")
                                  a.href = file.path
                                  a.download = file.originalName
                                  a.click()
                                }}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold mb-2">AI Recommendations</h3>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
