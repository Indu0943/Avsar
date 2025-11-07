"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url(/placeholder.svg?height=600&width=1920&query=animal+paws+pattern)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Every contribution, big or small, helps us save more lives. Join our community of animal lovers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" className="text-lg px-8 py-6">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/adoption/form">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Adopt a Pet
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
