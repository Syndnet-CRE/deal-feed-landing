import {
  Building2,
  Clock,
  Database,
  Droplets,
  FileText,
  FileWarning,
  Gavel,
  LayoutGrid,
  MapPin,
  MapPinOff,
  Maximize2,
  Scale,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface DistressSignal {
  name: string
  detail: string
  Icon: LucideIcon
}

interface StackableSignal {
  name: string
  Icon: LucideIcon
}

const distressSignals: DistressSignal[] = [
  {
    name: "Tax Delinquency",
    detail: "Active delinquent tax record on file.",
    Icon: ShieldAlert,
  },
  {
    name: "Pre-Foreclosure",
    detail: "Notice of Default or Lis Pendens filed.",
    Icon: FileWarning,
  },
  {
    name: "Active Foreclosure",
    detail: "Notice of Trustee Sale on record.",
    Icon: Gavel,
  },
  {
    name: "Auction Scheduled",
    detail: "Confirmed courthouse or online auction date.",
    Icon: Scale,
  },
]

const stackableSignals: StackableSignal[] = [
  { name: "Hold length", Icon: Clock },
  { name: "Absentee owner", Icon: MapPinOff },
  { name: "Lot size", Icon: Maximize2 },
  { name: "Asset class", Icon: Building2 },
  { name: "LLC complexity", Icon: Users },
  { name: "No recent permits", Icon: FileText },
  { name: "Mailing distance", Icon: MapPin },
  { name: "Comp velocity", Icon: TrendingUp },
  { name: "Opportunity Zone", Icon: Sparkles },
  { name: "Flood zone", Icon: Droplets },
  { name: "Zoning", Icon: LayoutGrid },
  { name: "+ 900 attributes", Icon: Database },
]

export function MethodologySection() {
  return (
    <section className="w-full px-5 py-12 md:py-20 flex flex-col items-center">
      <div className="max-w-[1100px] w-full flex flex-col items-center gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-foreground/80 text-xs md:text-sm font-medium uppercase tracking-wide">
            Our Methodology
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight max-w-[820px]">
            175B data points. Distress is the hard gate. The rest is up to you.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-[720px]">
            Our agents train continuously on 160M+ parcels and ~900 attributes per property. We score every property against the distress signals you require and any other criteria you stack on top.
          </p>
        </div>

        {/* Distress signals — the hard gate */}
        <div className="w-full flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-xs md:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
              Distress signals — the hard gate
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {distressSignals.map(({ name, detail, Icon }) => (
              <div
                key={name}
                className="rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm p-5 md:p-6 flex flex-col gap-3 transition-colors hover:border-primary/30"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-foreground text-lg font-semibold leading-tight">{name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack any of these on top */}
        <div className="w-full flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-xs md:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
              Stack any of these on top
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {stackableSignals.map(({ name, Icon }) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/10 text-foreground/90 text-sm font-medium transition-colors hover:bg-white/[0.06] hover:ring-primary/30"
              >
                <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" strokeWidth={2} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-foreground/80 text-sm md:text-base font-medium text-center max-w-[720px] leading-relaxed">
          Distress sets the floor. Your buy box sets the ceiling. The agent scores the rest.
        </p>
      </div>
    </section>
  )
}
