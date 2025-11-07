"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const staff = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Chief Veterinarian",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    experience: "15 years",
  },
  {
    name: "Priya Sharma",
    role: "Rescue Operations Head",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    experience: "10 years",
  },
  {
    name: "Amit Patel",
    role: "Shelter Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    experience: "8 years",
  },
  {
    name: "Dr. Sneha Reddy",
    role: "Senior Veterinarian",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    experience: "12 years",
  },
  {
    name: "Rahul Verma",
    role: "Adoption Coordinator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    experience: "6 years",
  },
  {
    name: "Kavita Singh",
    role: "Volunteer Coordinator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    experience: "7 years",
  },
]

const members = [
  {
    name: "Anita Desai",
    role: "Lifetime Member",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    since: "2015",
  },
  {
    name: "Vikram Malhotra",
    role: "Supporter Member",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    since: "2017",
  },
  {
    name: "Meera Iyer",
    role: "Volunteer Member",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    since: "2018",
  },
  {
    name: "Arjun Kapoor",
    role: "Lifetime Member",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    since: "2016",
  },
  {
    name: "Pooja Nair",
    role: "Supporter Member",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
    since: "2019",
  },
  {
    name: "Sanjay Gupta",
    role: "Volunteer Member",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    since: "2020",
  },
  {
    name: "Deepa Menon",
    role: "Lifetime Member",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    since: "2018",
  },
  {
    name: "Karan Bhatia",
    role: "Supporter Member",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    since: "2021",
  },
]

export default function UnitsPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&h=800&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance"
          >
            Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Meet the dedicated people who make AVSAR's mission possible
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container px-4">
          <Tabs defaultValue="staff" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="staff" className="text-lg">
                <Users className="mr-2 h-5 w-5" />
                Staff
              </TabsTrigger>
              <TabsTrigger value="members" className="text-lg">
                <Heart className="mr-2 h-5 w-5" />
                Members
              </TabsTrigger>
            </TabsList>

            {/* Staff Tab */}
            <TabsContent value="staff">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold mb-4 text-balance">Our Dedicated Staff</h2>
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                  Professional team committed to animal welfare and rescue operations
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((person, index) => (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-1">{person.name}</h3>
                        <p className="text-primary font-medium mb-2">{person.role}</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <Award className="h-4 w-4" />
                          <span>{person.experience} experience</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold mb-4 text-balance">Our Valued Members</h2>
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                  Community members supporting our mission through dedication and compassion
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((person, index) => (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-lg font-bold mb-1">{person.name}</h3>
                        <p className="text-sm text-primary font-medium mb-1">{person.role}</p>
                        <p className="text-xs text-muted-foreground">Member since {person.since}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 gradient-bg">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Join Our Team</h2>
            <p className="text-xl leading-relaxed text-pretty mb-8">
              Whether as a staff member or volunteer, there's always room for passionate individuals who want to make a
              difference in animal welfare.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
