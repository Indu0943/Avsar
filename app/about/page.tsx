"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, Heart, Award, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"

const timeline = [
  {
    year: "2015",
    title: "Foundation",
    description: "AVSAR was founded with a vision to create a compassionate world for animals in need.",
    icon: Heart,
  },
  {
    year: "2017",
    title: "First Shelter",
    description:
      "Opened our first animal shelter with capacity for 100 animals, providing medical care and rehabilitation.",
    icon: Users,
  },
  {
    year: "2019",
    title: "Recognition",
    description: "Received national recognition for our innovative animal welfare programs and rescue operations.",
    icon: Award,
  },
  {
    year: "2021",
    title: "Expansion",
    description: "Expanded operations to multiple cities, rescuing over 1000 animals annually.",
    icon: Calendar,
  },
  {
    year: "2023",
    title: "Milestone",
    description:
      "Celebrated 5000+ successful rescues and 3000+ adoptions, becoming a leading animal welfare organization.",
    icon: Award,
  },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div className="pt-16">
            <section ref={heroRef} className="hero-section">
        <motion.div style={{ y, scale }} className="hero-background">
          <div
            className="hero-background-image"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1920&h=1080&fit=crop&q=85)"
            }}
          />
        </motion.div>

        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance"
          >
            Our Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            From humble beginnings to a leading force in animal welfare - discover how AVSAR has been making a
            difference
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              At AVSAR (Pashu Seva Sansthan), we are dedicated to rescuing, rehabilitating, and rehoming animals in
              distress. Our mission is to create a compassionate society where every animal is treated with dignity,
              respect, and love. Through education, advocacy, and direct action, we strive to end animal suffering and
              promote responsible pet ownership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Rescue",
                description: "24/7 emergency response for animals in danger",
                color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
              },
              {
                title: "Rehabilitate",
                description: "Medical care and emotional healing for rescued animals",
                color: "bg-green-500/10 text-green-600 dark:text-green-400",
              },
              {
                title: "Rehome",
                description: "Finding loving forever homes through our adoption program",
                color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item.color} mb-4`}
                    >
                      <Heart className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Timeline</h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              A journey of compassion, dedication, and impact
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l-2 border-primary/30 last:pb-0"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-primary mb-1">{item.year}</div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 gradient-bg">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Values</h2>
            <p className="text-xl leading-relaxed text-pretty mb-8">
              Compassion, integrity, and dedication drive everything we do. We believe every animal deserves a second
              chance at life, and we work tirelessly to make that a reality.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
