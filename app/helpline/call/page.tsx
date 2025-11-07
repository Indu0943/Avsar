"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Camera, Phone, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function CallPage() {
  const handleCall = () => {
    // In a real app, this would initiate a call
    window.location.href = "tel:+91XXXXXXXXXX"
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1920&h=1080&fit=crop&q=85)",
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
            Emergency Call
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Speak directly with our rescue team for immediate assistance
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
              <Button size="lg" variant="default">
                <Phone className="mr-2 h-5 w-5" />
                Call
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="shadow-xl text-center">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center justify-center gap-2">
                    <Phone className="h-8 w-8 text-primary" />
                    24/7 Emergency Helpline
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Our trained rescue team is ready to assist you anytime
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="text-5xl md:text-6xl font-bold text-primary">+91-XXXX-XXXXXX</div>
                    <p className="text-muted-foreground">Available 24 hours a day, 7 days a week</p>
                  </div>

                  <Button size="lg" className="text-xl px-12 py-8 w-full md:w-auto" onClick={handleCall}>
                    <Phone className="mr-3 h-6 w-6" />
                    Call Now
                  </Button>

                  <div className="pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      For non-emergency inquiries, please use our complaint form or email us at{" "}
                      <span className="font-semibold text-foreground">help@avsar.org</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <Clock className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">Average response time: 15-30 minutes</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <MapPin className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Wide Coverage</h3>
                    <p className="text-sm text-muted-foreground">Serving multiple cities across the region</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Expert Team</h3>
                    <p className="text-sm text-muted-foreground">Trained professionals with years of experience</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* When to Call */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle>When to Call Our Emergency Helpline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Animal in immediate danger or life-threatening situation",
                      "Severe injury requiring urgent medical attention",
                      "Animal trapped in hazardous location",
                      "Suspected animal abuse or cruelty",
                      "Aggressive or dangerous animal posing threat to public",
                      "Natural disaster affecting animals",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                          <Phone className="h-3 w-3 text-primary" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{item}</p>
                      </li>
                    ))}
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
