import { Check, X } from "lucide-react"
import Image from "next/image"

interface ComparisonRow {
  need: string
  nightdrop: string
  oldWay: string
}

const rows: ComparisonRow[] = [
  {
    need: "Deals delivered to your inbox daily",
    nightdrop: "Every morning by 6 AM",
    oldWay: "You or your VA pulls the list manually",
  },
  {
    need: "Distress signal on every property",
    nightdrop: "Hard gate, required to ship",
    oldWay: "You filter, you decide",
  },
  {
    need: "AI-written deal brief per property",
    nightdrop: "Full analysis on every deal",
    oldWay: "Raw spreadsheet rows",
  },
  {
    need: "Runs automatically every night",
    nightdrop: "Set once, done forever",
    oldWay: "Manual every single time",
  },
  {
    need: "Skip-traced contacts included",
    nightdrop: "In every brief",
    oldWay: "Separate step, extra cost",
  },
  {
    need: "No hiring, training, or managing",
    nightdrop: "Zero human dependencies",
    oldWay: "Find a VA on Fiverr · train them · review their work · pay $15/hr",
  },
  {
    need: "Total monthly cost",
    nightdrop: "$149 flat",
    oldWay: "$99 PropStream + $15/hr VA + skip trace fees",
  },
]

export function VsOldWaySection() {
  return (
    <section className="w-full px-5 py-12 md:py-20 flex flex-col items-center">
      <div className="max-w-[1100px] w-full flex flex-col items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-foreground/80 text-xs md:text-sm font-medium uppercase tracking-wide">
            How we're different
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight max-w-[720px]">
            <span className="text-red-500">Stop</span> doing the work. <span className="text-primary">Start</span> getting the deals.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-[680px]">
            PropStream and BatchLeads make you the operator. So does hiring a VA — they're just running the same tools while you pay them, train them, and manage them. Nightdrop eliminates all of that.
          </p>
        </div>

        {/* Mobile: stacked comparison cards */}
        <div className="md:hidden w-full flex flex-col gap-3">
          {rows.map((row) => (
            <div
              key={row.need}
              className="rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-sm p-4 flex flex-col gap-3"
            >
              <div className="text-foreground/90 text-sm font-semibold leading-snug">
                {row.need}
              </div>
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-primary/[0.08] ring-1 ring-primary/20">
                <Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <div className="mb-0.5">
                    <Image src="/logos/nightdrop-logo.png" alt="Nightdrop" width={80} height={29} className="h-4 w-auto" />
                  </div>
                  <span className="text-foreground/90 text-sm leading-snug">{row.nightdrop}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white/[0.03] ring-1 ring-white/10">
                <X className="w-4 h-4 mt-0.5 text-red-400/80 flex-shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <div className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wide mb-0.5">
                    The old way
                  </div>
                  <span className="text-muted-foreground text-sm leading-snug">{row.oldWay}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm">
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr] text-sm md:text-base">
            <div className="px-4 md:px-6 py-4 md:py-5 text-muted-foreground font-medium border-b border-white/10">
              What you need
            </div>
            <div className="px-4 md:px-6 py-2 font-semibold border-b border-white/10 bg-primary/10 flex items-center">
              <Image src="/logos/nightdrop-logo.png" alt="Nightdrop" width={193} height={71} className="h-20 w-auto" />
            </div>
            <div className="px-4 md:px-6 py-4 md:py-5 text-muted-foreground font-medium border-b border-white/10">
              <span className="block">The old way</span>
              <span className="block text-xs font-normal text-muted-foreground/70 mt-0.5">
                You or a VA on PropStream / BatchLeads
              </span>
            </div>
            {rows.map((row, idx) => (
              <div key={row.need} className="contents">
                <div
                  className={`px-4 md:px-6 py-4 md:py-5 text-foreground/90 font-medium ${idx === rows.length - 1 ? "" : "border-b border-white/10"}`}
                >
                  {row.need}
                </div>
                <div
                  className={`px-4 md:px-6 py-4 md:py-5 bg-primary/[0.06] text-foreground flex items-start gap-2 ${idx === rows.length - 1 ? "" : "border-b border-white/10"}`}
                >
                  <Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="leading-snug">{row.nightdrop}</span>
                </div>
                <div
                  className={`px-4 md:px-6 py-4 md:py-5 text-muted-foreground flex items-start gap-2 ${idx === rows.length - 1 ? "" : "border-b border-white/10"}`}
                >
                  <X className="w-4 h-4 mt-0.5 text-red-400/80 flex-shrink-0" strokeWidth={2.5} />
                  <span className="leading-snug">{row.oldWay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
