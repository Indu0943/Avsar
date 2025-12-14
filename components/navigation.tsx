"use client"

import { useState, memo, useMemo, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Gallery",
    href: "/gallery",
    dropdown: [
      { name: "Photos", href: "/gallery/photos" },
      { name: "Videos", href: "/gallery/videos" },
    ],
  },
  {
    name: "Donation",
    href: "/donation",
    dropdown: [
      { name: "Money", href: "/donation/money" },
      { name: "Food", href: "/donation/food" },
    ],
  },
  { name: "Join Now", href: "/join" },
  {
    name: "Helpline",
    href: "/helpline",
    dropdown: [
      { name: "Complaint", href: "/helpline/complaint" },
      { name: "Camera", href: "/helpline/camera" },
      { name: "Call", href: "/helpline/call" },
    ],
  },
  {
    name: "Adoption",
    href: "/adoption",
    dropdown: [
      { name: "Terms & Conditions", href: "/adoption/terms" },
      { name: "Adoption Form", href: "/adoption/form" },
    ],
  },
  { name: "Units", href: "/units" },
  { name: "Contact", href: "/contact" },
]

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
})

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Memoize the navigation items to prevent unnecessary re-renders
  const memoizedNavItems = useMemo(() => navItems, [])
  
  // Use useCallback for event handlers
  const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-gray-900/95 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary dark:text-white">AVSAR</div>
            <div className="text-xs text-muted-foreground dark:text-gray-400 hidden md:block">Pashu Seva Sansthan</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {memoizedNavItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href}>{subItem.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.name} href={item.href}>
                  <Button variant={pathname === item.href ? "default" : "ghost"}>{item.name}</Button>
                </Link>
              ),
            )}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-fade-in">
            {memoizedNavItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="space-y-1">
                    <div className="font-semibold px-4 py-2 text-sm text-muted-foreground">{item.name}</div>
                    {item.dropdown.map((subItem) => (
                      <Link key={subItem.name} href={subItem.href} onClick={closeMenu}>
                        <Button variant="ghost" className="w-full justify-start pl-8">
                          {subItem.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link href={item.href} onClick={closeMenu}>
                    <Button variant={pathname === item.href ? "default" : "ghost"} className="w-full justify-start">
                      {item.name}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default memo(Navigation)