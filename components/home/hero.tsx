"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useMemo } from "react"

// Reduce particle count for better performance
const PARTICLE_COUNT = 10

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Fixed particles to prevent hydration mismatch - same values server & client
  const particles = useMemo(() => [
    { id: 0, initialX: 840, initialY: 706, endY: -75, duration: 3.2, delay: 0.4 },
    { id: 1, initialX: 717, initialY: 702, endY: -120, duration: 4.5, delay: 1.2 },
    { id: 2, initialX: 866, initialY: 512, endY: -95, duration: 3.8, delay: 0.8 },
    { id: 3, initialX: 578, initialY: 33, endY: -110, duration: 4.2, delay: 1.6 },
    { id: 4, initialX: 45, initialY: 665, endY: -88, duration: 3.5, delay: 0.2 },
    { id: 5, initialX: 312, initialY: 430, endY: -125, duration: 4.0, delay: 1.0 },
    { id: 6, initialX: 927, initialY: 303, endY: -92, duration: 3.6, delay: 0.6 },
    { id: 7, initialX: 881, initialY: 739, endY: -105, duration: 4.3, delay: 1.4 },
    { id: 8, initialX: 998, initialY: 220, endY: -80, duration: 3.4, delay: 0.3 },
    { id: 9, initialX: 902, initialY: 688, endY: -115, duration: 3.9, delay: 0.9 },
  ], [])

  return (
        <section ref={ref} className="hero-section">
      <motion.div style={{ y }} className="hero-background">
        <div
          className="hero-background-image"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&h=1080&fit=crop&q=85)",
          }}
        />
      </motion.div>

      {/* Floating particles effect - optimized */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: particle.initialX,
              y: particle.initialY,
            }}
            animate={{
              y: particle.endY,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white text-balance"
          >
            Welcome to{" "}
            <motion.span
              className="text-[#D2C1B6]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(210, 193, 182, 0.5)",
                  "0 0 40px rgba(210, 193, 182, 0.8)",
                  "0 0 20px rgba(210, 193, 182, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              AVSAR
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 text-pretty leading-relaxed"
          >
            Pashu Seva Sansthan - Dedicated to rescuing, rehabilitating, and rehoming animals in need. Join us in our
            mission to create a compassionate world for all creatures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/donation/money">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8 py-6 gradient-bg hover:opacity-90 transition-opacity">
                  Donate Now
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 glass text-white border-white hover:bg-white/20 bg-transparent"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
