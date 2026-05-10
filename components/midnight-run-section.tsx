import { Fragment } from "react"
import { Inbox, Lock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Step {
  idx: number
  time: string
  title: string
  detail: string
  startMin: number
  endMin: number
  milestone?: boolean
  Icon?: LucideIcon
  accent?: "primary" | "orange"
}

const TOTAL_MINUTES = 361

const steps: Step[] = [
  {
    idx: 1,
    time: "11:59 PM",
    title: "Buy boxes lock in",
    detail: "Any edits to your criteria take effect for tonight's run.",
    startMin: 0,
    endMin: 0,
    milestone: true,
    Icon: Lock,
    accent: "orange",
  },
  {
    idx: 2,
    time: "12:00 AM",
    title: "Cross-check + warm-up",
    detail:
      "Configuring every active buy box, cross-checking criteria, and prepping the agent fleet for tonight's run.",
    startMin: 0,
    endMin: 121,
  },
  {
    idx: 3,
    time: "2:00 AM",
    title: "Agents run nationwide",
    detail: "160M+ parcels queried against every active buy box simultaneously.",
    startMin: 121,
    endMin: 181,
  },
  {
    idx: 4,
    time: "3:00 AM",
    title: "Buy Box Gate applied",
    detail:
      "Properties scored against every criterion in your buy box. Anything below your match threshold is dropped.",
    startMin: 181,
    endMin: 271,
  },
  {
    idx: 5,
    time: "4:30 AM",
    title: "Briefs written, contacts attached",
    detail: "AI drafts a full deal brief per property. Skip trace pulled. Owner contact attached.",
    startMin: 271,
    endMin: 361,
  },
  {
    idx: 6,
    time: "6:00 AM",
    title: "Deals in your inbox",
    detail: "Before your first coffee. Ready to read, mark Hot or Not Relevant, and call.",
    startMin: 361,
    endMin: 361,
    milestone: true,
    Icon: Inbox,
  },
]

const hourMarkers = [
  { label: "12 AM", min: 1 },
  { label: "1 AM", min: 61 },
  { label: "2 AM", min: 121 },
  { label: "3 AM", min: 181 },
  { label: "4 AM", min: 241 },
  { label: "5 AM", min: 301 },
  { label: "6 AM", min: 361 },
]

const pct = (min: number) => `${(min / TOTAL_MINUTES) * 100}%`

export function MidnightRunSection() {
  return (
    <section className="w-full px-5 py-12 md:py-20 flex flex-col items-center">
      <div className="max-w-[1080px] w-full flex flex-col items-center gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-foreground/80 text-xs md:text-sm font-medium uppercase tracking-wide">
            The Midnight Run
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight max-w-[680px]">
            While everyone else sleeps, your agent is working.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-[640px]">
            Every subscriber's buy box is different. Every run produces a unique set of deals. No two inboxes look the same.
          </p>
        </div>

        {/* Desktop Gantt */}
        <div className="hidden md:grid w-full md:grid-cols-[minmax(0,38%)_minmax(0,62%)] gap-x-6">
          {/* Hour axis */}
          <div aria-hidden="true" />
          <div className="relative h-7 mb-2">
            {hourMarkers.map((h) => (
              <div
                key={h.label}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center gap-1"
                style={{ left: pct(h.min) }}
              >
                <span className="text-muted-foreground text-[11px] font-medium tabular-nums tracking-wide whitespace-nowrap">
                  {h.label}
                </span>
                <div className="w-px h-2 bg-white/15" />
              </div>
            ))}
          </div>

          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            const borderClass = isLast ? "" : "border-b border-white/[0.04]"
            return (
              <Fragment key={step.idx}>
                {/* Left: badge + time + title */}
                <div className="flex items-center gap-3 pt-4 pb-2 pr-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 ring-1 ring-white/15 flex items-center justify-center text-foreground text-[10px] font-semibold tabular-nums flex-shrink-0">
                    {String(step.idx).padStart(2, "0")}
                  </div>
                  <div className="text-primary text-sm font-semibold tabular-nums tracking-wide flex-shrink-0 w-[68px]">
                    {step.time}
                  </div>
                  <h3 className="text-foreground text-sm font-semibold leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Right: Gantt track */}
                <div className="relative pt-4 pb-2">
                  {/* Hour grid lines */}
                  {hourMarkers.map((h) => (
                    <div
                      key={h.label}
                      className="absolute top-3 bottom-1 w-px bg-white/[0.025]"
                      style={{ left: pct(h.min) }}
                      aria-hidden="true"
                    />
                  ))}
                  {/* Track baseline */}
                  <div
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 mt-1 h-px bg-white/[0.08]"
                    aria-hidden="true"
                  />
                  {/* Bar or milestone */}
                  {step.milestone && step.Icon ? (
                    <div
                      className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 w-6 h-6 rounded-full flex items-center justify-center ${
                        step.accent === "orange"
                          ? "bg-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.20)]"
                          : "bg-primary shadow-[0_0_0_4px_rgba(91,204,72,0.18)]"
                      }`}
                      style={{ left: pct(step.startMin) }}
                      aria-hidden="true"
                    >
                      <step.Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 mt-1 h-2.5 rounded-full bg-primary/70 ring-1 ring-primary/20 shadow-[0_0_24px_-4px_rgba(91,204,72,0.35)]"
                      style={{
                        left: pct(step.startMin),
                        width: `calc(${pct(step.endMin)} - ${pct(step.startMin)})`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Detail spans both columns, owns the row's bottom border */}
                <p
                  className={`col-span-2 pt-0 pb-4 pl-12 text-muted-foreground text-sm leading-relaxed ${borderClass}`}
                >
                  {step.detail}
                </p>
              </Fragment>
            )
          })}
        </div>

        {/* Mobile stacked list */}
        <ol className="md:hidden w-full flex flex-col gap-3">
          {steps.map((step) => (
            <li
              key={step.idx}
              className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/5 ring-1 ring-white/15 flex items-center justify-center text-foreground text-[10px] font-semibold tabular-nums flex-shrink-0">
                  {String(step.idx).padStart(2, "0")}
                </div>
                <span className="text-primary text-sm font-semibold tabular-nums flex-shrink-0">
                  {step.time}
                </span>
                <h3 className="text-foreground text-sm font-semibold leading-tight flex-1">
                  {step.title}
                </h3>
              </div>
              <div
                className="relative h-1.5 rounded-full bg-white/[0.08]"
                aria-hidden="true"
              >
                {step.milestone && step.Icon ? (
                  <div
                    className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center ${
                      step.accent === "orange" ? "bg-orange-500" : "bg-primary"
                    }`}
                    style={{ left: pct(step.startMin) }}
                  >
                    <step.Icon className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-primary/70"
                    style={{
                      left: pct(step.startMin),
                      width: `calc(${pct(step.endMin)} - ${pct(step.startMin)})`,
                    }}
                  />
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
