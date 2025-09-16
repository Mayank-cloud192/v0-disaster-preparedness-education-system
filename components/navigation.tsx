"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Register Institution", href: "/register" },
  { name: "Learning Modules", href: "/modules" },
  { name: "Admin Panel", href: "/admin" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="backdrop-blur-lg bg-background/95 border-b border-border/50 sticky top-0 z-50 w-full shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              🛡️
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">DisasterPrep India</h1>
              <p className="text-xs text-muted-foreground">Education & Response System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-foreground hover:bg-muted/80 hover:text-foreground"
                >
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                document.documentElement.classList.toggle("dark")
              }}
              className="h-9 w-9 text-foreground hover:bg-muted/80"
              aria-label="Toggle theme"
            >
              🌙
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                document.documentElement.classList.toggle("dark")
              }}
              className="h-9 w-9 text-foreground hover:bg-muted/80"
              aria-label="Toggle theme"
            >
              🌙
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/80">
                  ☰<span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="backdrop-blur-lg bg-background/95 border-l border-border/50">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start space-x-2 text-foreground hover:bg-muted/80"
                      >
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
