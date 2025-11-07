import dynamic from "next/dynamic"
import Hero from "@/components/home/hero"

// Lazy load components that are below the fold
const Features = dynamic(() => import("@/components/home/features"), {
  loading: () => <div className="h-96 animate-pulse bg-muted/30" />,
})
const Stats = dynamic(() => import("@/components/home/stats"), {
  loading: () => <div className="h-64 animate-pulse bg-muted/30" />,
})
const CallToAction = dynamic(() => import("@/components/home/call-to-action"), {
  loading: () => <div className="h-80 animate-pulse bg-muted/30" />,
})

export default function HomePage() {
  return (
    <div className="pt-16">
      <Hero />
      <Features />
      <Stats />
      <CallToAction />
    </div>
  )
}
