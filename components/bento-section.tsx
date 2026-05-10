"use client"

import React, { useEffect, useRef } from "react"
import AiCodeReviews from "./bento/ai-code-reviews"
import RealtimeCodingPreviews from "./bento/real-time-previews"
import OneClickIntegrationsIllustration from "./bento/one-click-integrations-illustration"
import MCPConnectivityIllustration from "./bento/mcp-connectivity-illustration"
import EasyDeployment from "./bento/easy-deployment"
import ParallelCodingAgents from "./bento/parallel-agents"

const BentoCard = ({
  title,
  description,
  Component,
}: {
  title: string
  description: string
  Component: React.ComponentType
}) => (
  <div className="bento-card overflow-hidden rounded-2xl border border-white/20 flex flex-col justify-start items-start relative transition-all duration-500 hover:border-primary/40">
    {/* Background blur */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: "rgba(231, 236, 235, 0.08)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    />
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
      <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
        <h3 className="self-stretch text-foreground text-2xl md:text-3xl font-bold leading-tight">
          {title}
        </h3>
        <p className="self-stretch text-white text-base font-normal leading-7">
          {description}
        </p>
      </div>
    </div>
    <div className="self-stretch h-72 relative -mt-0.5 z-10">
      <Component />
    </div>
  </div>
)

export function BentoSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    let raf = 0
    let last: { x: number; y: number } | null = null

    const update = () => {
      raf = 0
      if (!last) return
      const cards = grid.querySelectorAll<HTMLElement>(".bento-card")
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = last!.x - cx
        const dy = last!.y - cy
        const len = Math.sqrt(dx * dx + dy * dy) || 1
        const nx = dx / len
        const ny = dy / len
        // Quadratic falloff: only the card the cursor is in (and its very near neighbors) glow
        const cardSize = (rect.width + rect.height) / 2
        const distFactor = Math.min(len / (cardSize * 0.9), 1)
        const opacity = Math.pow(1 - distFactor, 2) * 0.95 // peak ~0.95, sharp dropoff
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
      const cards = grid.querySelectorAll<HTMLElement>(".bento-card")
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

  const cards = [
    {
      title: "Submit your buy box.",
      description:
        "Tell us your asset class, geography, lot size, value range, and distress criteria. Takes five minutes.",
      Component: AiCodeReviews,
    },
    {
      title: "We run every night.",
      description:
        "Our pipeline runs at 2am against 160 million parcels with 900 data points per property, including geospatial, demographic, ownership, transaction, and assessment data.",
      Component: RealtimeCodingPreviews,
    },
    {
      title: "AI scores every match.",
      description:
        "Each property is evaluated against your exact criteria and assigned a confidence score. Weak matches are dropped before they ever reach you.",
      Component: OneClickIntegrationsIllustration,
    },
    {
      title: "Distress signals surfaced.",
      description:
        "Tax delinquency, absentee ownership, long holds with no permits, inactive entities. Every signal is flagged and explained.",
      Component: MCPConnectivityIllustration,
    },
    {
      title: "Owner contact attached.",
      description:
        "Each deal brief includes the best available owner name, phone, and email, with confidence percentages on each.",
      Component: ParallelCodingAgents,
    },
    {
      title: "In your inbox by 6am.",
      description:
        "Matched deals land every morning as a clean email digest. Read it, make calls, move on.",
      Component: EasyDeployment,
    },
  ]

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      {/* Cursor-tracking edge glow */}
      <style>{`
        .bento-card {
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

      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              How <span className="text-primary">Nightdrop</span> Works
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Fully autonomous. No dashboards to check. No searches to run. Your buy box runs every night and deals land in your inbox every morning.
            </p>
          </div>
        </div>
        <div ref={gridRef} className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
