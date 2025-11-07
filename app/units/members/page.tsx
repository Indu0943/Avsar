"use client"

import { motion } from "framer-motion"
import { Users, Heart, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

const memberCategories = [
  {
    title: "Founding Members",
    count: 12,
    description: "Visionaries who established AVSAR",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Active Volunteers",
    count: 156,
    description: "Regular contributors to our mission",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Monthly Donors",
    count: 423,
    description: "Supporters who contribute regularly",
    icon: Calendar,
    color: "text-green-500",
  },
  {
    title: "Community Partners",
    count: 34,
    description: "Organizations working with us",
    icon: MapPin,
    color: "text-purple-500",
  },
]

const featuredMembers = [
  {
    name: "Ramesh Gupta",
    type: "Founding Member",
    since: "2010",
    contribution: "Established the first shelter facility",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Anjali Desai",
    type: "Active Volunteer",
    since: "2015",
    contribution: "Rescued over 500 animals",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    name: "Karan Malhotra",
    type: "Monthly Donor",
    since: "2018",
    contribution: "Sponsors medical treatments",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    name: "Lakshmi Iyer",
    type: "Community Partner",
    since: "2016",
    contribution: "Organizes awareness campaigns",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
]

export default function MembersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-accent opacity-90" />
        <Image 
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop" 
          alt="Our Members" 
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
            Our Members
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-balance"
          >
            A community united for animal welfare
          </motion.p>
        </div>
      </section>

      {/* Member Categories */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Member Categories</h2>
            <p className="text-xl text-muted-foreground">Join our growing community of animal lovers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border text-center"
              >
                <category.icon className={`w-12 h-12 mx-auto mb-4 ${category.color}`} />
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-4xl font-bold text-accent mb-3">{category.count}</p>
                <p className="text-muted-foreground">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Members</h2>
            <p className="text-xl text-muted-foreground">Meet some of our outstanding contributors</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-accent-light">{member.type}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {member.since}</span>
                    </div>
                    <p className="text-sm text-foreground">{member.contribution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-6">Become a Member Today</h2>
            <p className="text-xl mb-8 text-balance">
              Join our community and make a difference in the lives of animals. Every contribution counts!
            </p>
            <a
              href="/join"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Join AVSAR
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
