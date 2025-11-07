"use client"

import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-gray-900 text-primary-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-accent" />
              AVSAR
            </h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-4">
              Pashu Seva Sansthan - Dedicated to protecting and caring for animals in need since 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-foreground dark:text-gray-300 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground dark:text-gray-300 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground dark:text-gray-300 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground dark:text-gray-300 hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground dark:text-gray-400 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground dark:text-gray-400 hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/adoption" className="text-muted-foreground dark:text-gray-400 hover:text-accent transition-colors">
                  Adopt
                </Link>
              </li>
              <li>
                <Link href="/donation" className="text-muted-foreground dark:text-gray-400 hover:text-accent transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground dark:text-white">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/join" className="text-muted-foreground dark:text-gray-400 hover:text-accent transition-colors">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link href="/helpline" className="text-muted-foreground dark:text-gray-400 hover:text-accent transition-colors">
                  Report Emergency
                </Link>
              </li>
              <li>
                <Link href="/units" className="text-muted-foreground dark:text-gray-400 hover:text-accent transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground dark:text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground dark:text-gray-400">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>123 Animal Welfare Street, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                <Phone className="w-5 h-5" />
                <a href="tel:+911234567890" className="hover:text-accent transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@avsar.org" className="hover:text-accent transition-colors">
                  info@avsar.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border dark:border-gray-700 mt-8 pt-8 text-center text-muted-foreground dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} AVSAR - Pashu Seva Sansthan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
