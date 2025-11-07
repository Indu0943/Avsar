import { cn } from "@/lib/utils"

interface HeroSectionProps {
  backgroundImage: string
  className?: string
  children: React.ReactNode
  minHeight?: string
}

export function HeroSection({
  backgroundImage,
  className,
  children,
  minHeight = "min-h-screen"
}: HeroSectionProps) {
  return (
    <section className={cn("relative w-full flex items-center justify-center overflow-hidden", minHeight, className)}>
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container relative z-10 px-4 text-center">
        {children}
      </div>
    </section>
  )
}