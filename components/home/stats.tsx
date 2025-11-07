"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  { value: "5000+", label: "Animals Rescued" },
  { value: "3000+", label: "Successful Adoptions" },
  { value: "50+", label: "Dedicated Staff" },
  { value: "24/7", label: "Emergency Support" },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 gradient-bg">
      <div className="container px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
