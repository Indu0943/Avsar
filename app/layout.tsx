import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "AVSAR - Pashu Seva Sansthan | Animal Welfare NGO",
  description: "AVSAR is dedicated to animal welfare, rescue, and rehabilitation. Join us in making a difference.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
