"use client"

import { Heart, Home, Phone, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const features = [
  {
    icon: Heart,
    title: "Animal Rescue",
    description: "24/7 emergency rescue services for animals in distress",
  },
  {
    icon: Home,
    title: "Shelter & Care",
    description: "Safe haven with medical care and rehabilitation",
  },
  {
    icon: Users,
    title: "Adoption Program",
    description: "Find loving homes for rescued animals",
  },
  {
    icon: Phone,
    title: "Helpline Support",
    description: "Round-the-clock assistance for animal emergencies",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">How We Make a Difference</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Our comprehensive approach to animal welfare ensures every creature gets the care they deserve
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
