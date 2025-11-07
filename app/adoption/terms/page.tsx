"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, Heart } from "lucide-react"
import Link from "next/link"

const terms = [
  {
    title: "Age Requirement",
    description: "Adopters must be at least 21 years old and provide valid identification.",
  },
  {
    title: "Home Verification",
    description: "Our team will conduct a home visit to ensure a safe and suitable environment for the animal.",
  },
  {
    title: "Financial Stability",
    description: "Adopters must demonstrate ability to provide for the animal's food, medical care, and other needs.",
  },
  {
    title: "Commitment",
    description: "Adoption is a lifetime commitment. Animals cannot be returned except in extreme circumstances.",
  },
  {
    title: "Medical Care",
    description: "All adopted animals must receive regular veterinary check-ups and necessary vaccinations.",
  },
  {
    title: "No Breeding",
    description: "Animals adopted from AVSAR must be spayed/neutered and cannot be used for breeding purposes.",
  },
  {
    title: "Living Conditions",
    description:
      "Animals must be kept indoors or in secure outdoor spaces. No chaining or caging for extended periods.",
  },
  {
    title: "Follow-up Visits",
    description: "AVSAR reserves the right to conduct follow-up visits to ensure the animal's wellbeing.",
  },
]

export default function TermsPage() {
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
          }}
        />

        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance"
          >
            Adopt a Friend
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Give a rescued animal a loving forever home
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center mt-8"
          >
            <Link href="/adoption/terms">
              <Button size="lg" variant="default">
                <FileText className="mr-2 h-5 w-5" />
                Terms & Conditions
              </Button>
            </Link>
            <Link href="/adoption/form">
              <Button
                size="lg"
                variant="outline"
                className="glass text-white border-white hover:bg-white/20 bg-transparent"
              >
                <Heart className="mr-2 h-5 w-5" />
                Adoption Form
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="shadow-xl mb-12">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <FileText className="h-8 w-8 text-primary" />
                    Adoption Terms & Conditions
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Please read and understand these requirements before applying for adoption
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed mb-6">
                      At AVSAR, we are committed to finding the best possible homes for our rescued animals. Our
                      adoption process is designed to ensure that both the animal and the adopter are well-matched for a
                      successful, lifelong relationship.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Terms Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {terms.map((term, index) => (
                <motion.div
                  key={term.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{term.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{term.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Adoption Process</h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li className="text-muted-foreground leading-relaxed">
                      Submit the adoption application form with complete and accurate information
                    </li>
                    <li className="text-muted-foreground leading-relaxed">
                      Our team will review your application and contact you within 3-5 business days
                    </li>
                    <li className="text-muted-foreground leading-relaxed">
                      Schedule a home visit for verification and assessment
                    </li>
                    <li className="text-muted-foreground leading-relaxed">
                      Meet the animal you wish to adopt and spend time together
                    </li>
                    <li className="text-muted-foreground leading-relaxed">
                      Complete adoption paperwork and pay the adoption fee
                    </li>
                    <li className="text-muted-foreground leading-relaxed">
                      Take your new family member home and begin your journey together
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link href="/adoption/form">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Proceed to Adoption Form
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
