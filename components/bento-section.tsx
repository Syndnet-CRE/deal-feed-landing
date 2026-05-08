import React from "react"
import AiCodeReviews from "./bento/ai-code-reviews"
import RealtimeCodingPreviews from "./bento/real-time-previews"
import OneClickIntegrationsIllustration from "./bento/one-click-integrations-illustration"
import MCPConnectivityIllustration from "./bento/mcp-connectivity-illustration" // Updated import
import EasyDeployment from "./bento/easy-deployment"
import ParallelCodingAgents from "./bento/parallel-agents" // Updated import

const BentoCard = ({ title, description, Component }: { title: string; description: string; Component: React.ComponentType }) => (
  <div className="overflow-hidden rounded-2xl border border-white/20 flex flex-col justify-start items-start relative">
    {/* Background with blur effect */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: "rgba(231, 236, 235, 0.08)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    />
    {/* Additional subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
      <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
        <p className="self-stretch text-foreground text-lg font-normal leading-7">
          {title} <br />
          <span className="text-muted-foreground">{description}</span>
        </p>
      </div>
    </div>
    <div className="self-stretch h-72 relative -mt-0.5 z-10">
      <Component />
    </div>
  </div>
)

export function BentoSection() {
  const cards = [
    {
      title: "Submit your buy box.",
      description: "Tell us your asset class, geography, lot size, value range, and distress criteria. Takes five minutes.",
      Component: AiCodeReviews,
    },
    {
      title: "We search every night.",
      description: "Our pipeline runs at 2am against 160 million parcels with 900 data points per property — geospatial, demographic, ownership, transaction, and assessment data.",
      Component: RealtimeCodingPreviews,
    },
    {
      title: "AI scores every match.",
      description: "Each property is evaluated against your exact criteria and assigned a confidence score. Weak matches are dropped before they ever reach you.",
      Component: OneClickIntegrationsIllustration,
    },
    {
      title: "Distress signals surfaced.",
      description: "Tax delinquency, absentee ownership, long holds with no permits, inactive entities — every signal is flagged and explained.",
      Component: MCPConnectivityIllustration,
    },
    {
      title: "Owner contact attached.",
      description: "Each deal brief includes the best available owner contact — name, phone, and email — with confidence percentages on each.",
      Component: ParallelCodingAgents,
    },
    {
      title: "In your inbox by 6am.",
      description: "Matched deals land every morning as a clean email digest. Read it, make calls, move on.",
      Component: EasyDeployment,
    },
  ]

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              How Nightdrop Works
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Fully autonomous. No dashboards to check. No searches to run. Your buy box runs every night and deals land in your inbox every morning.
              streamline your operations.
            </p>
          </div>
        </div>
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
