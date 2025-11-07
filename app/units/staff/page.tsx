"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Award } from "lucide-react"
import Image from "next/image"

const staffMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Chief Veterinarian",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    email: "rajesh@avsar.org",
    phone: "+91 98765 43210",
    specialization: "Large Animal Surgery",
    experience: "15 years",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Senior Veterinarian",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    email: "priya@avsar.org",
    phone: "+91 98765 43211",
    specialization: "Small Animal Care",
    experience: "10 years",
  },
  {
    name: "Amit Patel",
    role: "Rescue Operations Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    email: "amit@avsar.org",
    phone: "+91 98765 43212",
    specialization: "Emergency Response",
    experience: "8 years",
  },
  {
    name: "Sunita Verma",
    role: "Animal Care Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    email: "sunita@avsar.org",
    phone: "+91 98765 43213",
    specialization: "Rehabilitation",
    experience: "12 years",
  },
  {
    name: "Vikram Singh",
    role: "Shelter Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    email: "vikram@avsar.org",
    phone: "+91 98765 43214",
    specialization: "Facility Management",
    experience: "7 years",
  },
  {
    name: "Meera Reddy",
    role: "Adoption Counselor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    email: "meera@avsar.org",
    phone: "+91 98765 43215",
    specialization: "Animal Behavior",
    experience: "6 years",
  },
]

export default function StaffPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
        <Image 
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&h=600&fit=crop" 
          alt="Our Staff" 
          fill 
          className="object-cover mix-blend-overlay" 
          unoptimized
        />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Our Staff
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-balance"
          >
            Dedicated professionals committed to animal welfare
          </motion.p>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="text-accent-light">{member.role}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Award className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.specialization}</p>
                        <p className="text-xs">{member.experience} of experience</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
