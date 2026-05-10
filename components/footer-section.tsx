"use client"

import Image from "next/image"
import { Twitter, Github, Linkedin } from "lucide-react"
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config"

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <Image src="/logos/nightdrop-logo.png" alt="Nightdrop" width={120} height={44} />
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">Off-market deals. Every morning.</p>
        <div className="flex justify-start items-start gap-3">
          <a href="#" aria-label="Twitter" className="w-4 h-4 flex items-center justify-center">
            <Twitter className="w-full h-full text-muted-foreground" />
          </a>
          <a href="#" aria-label="GitHub" className="w-4 h-4 flex items-center justify-center">
            <Github className="w-full h-full text-muted-foreground" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-4 h-4 flex items-center justify-center">
            <Linkedin className="w-full h-full text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Product</h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <a href="#features-section" className="text-foreground text-sm font-normal leading-5 hover:underline">How It Works</a>
            <a href="#pricing-section" className="text-foreground text-sm font-normal leading-5 hover:underline">Pricing</a>
            <a href="#faq-section" className="text-foreground text-sm font-normal leading-5 hover:underline">FAQ</a>
            <a href={SIGNUP_URL} className="text-foreground text-sm font-normal leading-5 hover:underline">Sign Up</a>
            <a href={LOGIN_URL} className="text-foreground text-sm font-normal leading-5 hover:underline">Sign In</a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Company</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">About</a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Contact
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Book a call
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Legal</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">Privacy Policy</a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
