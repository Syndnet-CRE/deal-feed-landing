"use client"

import { useEffect, useRef } from "react"

const testimonials = [
  {
    quote:
      "I set my buy box for self-storage in the Austin metro and had three legit off-market leads in my inbox the next morning. One of them turned into a deal.",
    name: "Early Access Investor",
    company: "Austin, TX",
    avatar: "",
    type: "large-teal",
  },
  {
    quote:
      "The distress signal breakdown alone is worth the subscription. I know exactly why each deal is flagged before I pick up the phone.",
    name: "CRE Operator",
    company: "Dallas, TX",
    avatar: "",
    type: "small-dark",
  },
  {
    quote: "I was spending 15 hours a week pulling lists and screening properties. Nightdrop cut that to zero.",
    name: "Wholesaler",
    company: "Phoenix, AZ",
    avatar: "",
    type: "small-dark",
  },
  {
    quote: "Finally a tool built for people who actually buy commercial real estate, not just browse it.",
    name: "Acquisitions Director",
    company: "Denver, CO",
    avatar: "",
    type: "small-dark",
  },
  {
    quote: "Two of the three deals I pursued last quarter came through Nightdrop. I'm not going back to pulling lists manually.",
    name: "Private Investor",
    company: "Nashville, TN",
    avatar: "",
    type: "small-dark",
  },
  {
    quote: "I have three buy boxes running across two states. Deals hit my inbox every morning before I've had my coffee.",
    name: "Portfolio Operator",
    company: "Atlanta, GA",
    avatar: "",
    type: "small-dark",
  },
  {
    quote:
      "We tried building our own sourcing pipeline internally. It took months and it was never this good. Nightdrop was running in five minutes.",
    name: "Real Estate Fund Manager",
    company: "Houston, TX",
    avatar: "",
    type: "large-light",
  },
]

const TestimonialCard = ({ quote, name, company, type }: { quote: string; name: string; company: string; type: string }) => {
  const isLargeCard = type.startsWith("large")
  const padding = isLargeCard ? "p-6" : "p-[30px]"

  let cardClasses = `testimonial-card flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative ${padding} transition-all duration-500`
  let quoteClasses = ""
  let nameClasses = ""
  let companyClasses = ""
  let cardHeight = ""
  const cardWidth = "w-full md:w-full lg:w-[384px]"

  if (type === "large-teal") {
    cardClasses += " bg-primary border border-primary/40 hover:border-primary/70"
    quoteClasses += " text-primary-foreground text-2xl font-medium leading-8"
    nameClasses += " text-primary-foreground text-base font-normal leading-6"
    companyClasses += " text-primary-foreground/60 text-base font-normal leading-6"
    cardHeight = "h-auto md:h-[502px]"
  } else if (type === "large-light") {
    cardClasses += " bg-[rgba(231,236,235,0.12)] border border-white/10 hover:border-primary/40"
    quoteClasses += " text-foreground text-2xl font-medium leading-8"
    nameClasses += " text-foreground text-base font-normal leading-6"
    companyClasses += " text-muted-foreground text-base font-normal leading-6"
    cardHeight = "h-auto md:h-[502px]"
  } else {
    cardClasses += " bg-card border border-white/10 hover:border-primary/40"
    quoteClasses += " text-foreground/80 text-[17px] font-normal leading-6"
    nameClasses += " text-foreground text-sm font-normal leading-[22px]"
    companyClasses += " text-muted-foreground text-sm font-normal leading-[22px]"
    cardHeight = "h-auto md:h-[244px]"
  }

  const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className={`${cardClasses} ${cardWidth} ${cardHeight}`}>
      <div className={`relative z-10 font-normal break-words ${quoteClasses}`}>{quote}</div>
      <div className="relative z-10 flex justify-start items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-semibold flex-shrink-0">
          {initials}
        </div>
        <div className="flex flex-col justify-start items-start gap-0.5">
          <div className={nameClasses}>{name}</div>
          <div className={companyClasses}>{company}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialGridSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    let last: { x: number; y: number } | null = null
    let raf = 0

    const update = () => {
      raf = 0
      if (!last) return
      const cards = grid.querySelectorAll<HTMLElement>(".testimonial-card")
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = last!.x - cx
        const dy = last!.y - cy
        const len = Math.sqrt(dx * dx + dy * dy) || 1
        const nx = dx / len
        const ny = dy / len
        const cardSize = (rect.width + rect.height) / 2
        const distFactor = Math.min(len / (cardSize * 0.9), 1)
        const opacity = Math.pow(1 - distFactor, 2) * 0.95
        card.style.setProperty("--glow-x", nx.toFixed(3))
        card.style.setProperty("--glow-y", ny.toFixed(3))
        card.style.setProperty("--glow-opacity", opacity.toFixed(3))
      })
    }

    const handleMove = (e: MouseEvent) => {
      last = { x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(update)
    }

    const handleLeave = () => {
      last = null
      const cards = grid.querySelectorAll<HTMLElement>(".testimonial-card")
      cards.forEach((card) => {
        card.style.setProperty("--glow-opacity", "0")
      })
    }

    grid.addEventListener("mousemove", handleMove)
    grid.addEventListener("mouseleave", handleLeave)
    return () => {
      grid.removeEventListener("mousemove", handleMove)
      grid.removeEventListener("mouseleave", handleLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14">
      <style>{`
        .testimonial-card {
          --glow-x: 0;
          --glow-y: 0;
          --glow-opacity: 0;
          box-shadow:
            calc(var(--glow-x) * 18px)
            calc(var(--glow-y) * 18px)
            28px
            rgba(91, 204, 72, calc(var(--glow-opacity) * 0.5));
          transition: box-shadow 0.25s ease-out, border-color 0.5s ease;
        }
      `}</style>
      <div className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            Investors who tried it, kept it
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed">
            Early access feedback from real estate investors and operators using Nightdrop
          </p>
        </div>
      </div>
      <div ref={gridRef} className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-6 max-w-[1100px] mx-auto">
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[0]} />
          <TestimonialCard {...testimonials[1]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[2]} />
          <TestimonialCard {...testimonials[3]} />
          <TestimonialCard {...testimonials[4]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[5]} />
          <TestimonialCard {...testimonials[6]} />
        </div>
      </div>
    </section>
  )
}
