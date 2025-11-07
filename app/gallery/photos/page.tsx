"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/ui/hero-section"

const photos = [
  {
    id: 1,
    src: "/rescued-dog-happy.jpg",
    title: "Happy Rescue",
    description: "A beautiful dog finding joy after rescue",
  },
  {
    id: 2,
    src: "/cat-shelter-care.jpg",
    title: "Gentle Care",
    description: "Providing medical attention to rescued cats",
  },
  {
    id: 3,
    src: "/animal-adoption-event.jpg",
    title: "Adoption Day",
    description: "Successful adoption event bringing families together",
  },
  {
    id: 4,
    src: "/veterinary-care-animals.jpg",
    title: "Medical Care",
    description: "Our veterinary team providing essential treatment",
  },
  {
    id: 5,
    src: "/rescued-puppies-playing.jpg",
    title: "Playful Puppies",
    description: "Rescued puppies enjoying their new life",
  },
  {
    id: 6,
    src: "/animal-shelter-volunteers.jpg",
    title: "Volunteer Love",
    description: "Our dedicated volunteers making a difference",
  },
  {
    id: 7,
    src: "/rescued-birds-sanctuary.jpg",
    title: "Bird Sanctuary",
    description: "Safe haven for rescued birds",
  },
  {
    id: 8,
    src: "/animal-feeding-time.jpg",
    title: "Feeding Time",
    description: "Nutritious meals for all our residents",
  },
]

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection backgroundImage="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&h=1080&fit=crop&q=85">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance"
        >
          Photo Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
        >
          Capturing moments of hope, healing, and happiness
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          <Link href="/gallery/photos">
            <Button size="lg" variant="default">
              Photos
            </Button>
          </Link>
          <Link href="/gallery/videos">
            <Button
              size="lg"
              variant="outline"
              className="glass text-white border-white hover:bg-white/20 bg-transparent"
            >
              Videos
            </Button>
          </Link>
        </motion.div>
      </HeroSection>

      {/* Photos Grid */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square">
                    <img
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-lg">{photo.title}</h3>
                        <p className="text-sm text-gray-200">{photo.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl">
          {selectedPhoto && (
            <div>
              <img
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.title}
                className="w-full rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h3>
                <p className="text-muted-foreground">{selectedPhoto.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
