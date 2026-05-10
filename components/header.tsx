"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config"

export function Header() {
  const navItems = [
    { name: "How It Works", href: "#features-section" },
    { name: "Pricing", href: "#pricing-section" },
    { name: "FAQ", href: "#faq-section" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remove '#' from href
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full py-4 px-4 md:px-8">
      <div className="w-full flex items-center justify-between relative">
        <div className="flex items-center">
          <Image
            src="/logos/nightdrop-logo.png"
            alt="Nightdrop"
            width={193}
            height={71}
            priority
            className="w-[140px] h-auto md:w-[193px]"
          />
        </div>
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-[#cccccc] hover:text-foreground px-3 py-1.5 rounded-full text-[14px] font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={LOGIN_URL} className="hidden md:block">
            <Button variant="outline" className="px-5 py-2 rounded-full font-medium text-sm">
              Sign In
            </Button>
          </Link>
          <Link href={SIGNUP_URL} className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-full font-medium text-sm">
              Sign Up Free
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-[#888888] hover:text-foreground justify-start text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex gap-3 mt-4">
                  <Link href={LOGIN_URL} className="flex-1">
                    <Button variant="outline" className="w-full rounded-full font-medium text-sm">Sign In</Button>
                  </Link>
                  <Link href={SIGNUP_URL} className="flex-1">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium text-sm">Sign Up Free</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
