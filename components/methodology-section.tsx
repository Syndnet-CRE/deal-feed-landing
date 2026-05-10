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

const stackableSignalRows: StackableSignal[][] = [
  [
    { name: "Asset class", Icon: Building2 },
    { name: "Hold length", Icon: Clock },
    { name: "Absentee owner", Icon: MapPinOff },
    { name: "Lot size", Icon: Maximize2 },
    { name: "LLC complexity", Icon: Users },
  ],
  [
    { name: "Mailing distance", Icon: MapPin },
    { name: "No recent permits", Icon: FileText },
    { name: "Comp velocity", Icon: TrendingUp },
    { name: "Zoning", Icon: LayoutGrid },
  ],
  [
    { name: "Opportunity Zone", Icon: Sparkles },
    { name: "Flood zone", Icon: Droplets },
    { name: "+ 900 attributes", Icon: Database },
  ],
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="h-px flex-1 max-w-[120px] bg-white/15" />
      <span className="text-primary text-sm md:text-base font-semibold uppercase tracking-[0.18em] whitespace-nowrap">
        {children}
      </span>
      <div className="h-px flex-1 max-w-[120px] bg-white/15" />
    </div>
  )
}

export function MethodologySection() {
  return (
    <section className="w-full px-5 py-12 md:py-20 flex flex-col items-center">
      <div className="max-w-[1100px] w-full flex flex-col items-center gap-12 md:gap-16">
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
        <div className="w-full flex flex-col gap-6 md:gap-8">
          <SectionLabel>Distress signals — the hard gate</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {distressSignals.map(({ name, detail, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center text-center gap-4 px-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-[0_0_28px_-6px_rgba(91,204,72,0.45)]">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-foreground text-lg md:text-xl font-semibold leading-tight">
                  {name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack any of these on top — triangle layout 5 / 4 / 3 */}
        <div className="w-full flex flex-col gap-6 md:gap-8">
          <SectionLabel>Stack any of these on top</SectionLabel>
          {/* Mobile: flat flex-wrap, constrained width for predictable wrapping */}
          <div className="md:hidden flex flex-wrap justify-center gap-2 max-w-[360px] mx-auto">
            {stackableSignalRows.flat().map(({ name, Icon }) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/10 text-foreground/90 text-sm font-medium"
              >
                <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" strokeWidth={2} />
                <span>{name}</span>
              </div>
            ))}
          </div>

          {/* Desktop: 5/4/3 downward triangle */}
          <div className="hidden md:flex flex-col items-center gap-3">
            {stackableSignalRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap justify-center gap-3">
                {row.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] ring-1 ring-white/10 text-foreground/90 text-sm font-medium transition-colors hover:bg-white/[0.06] hover:ring-primary/30"
                  >
                    <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" strokeWidth={2} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Closing punchline */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-foreground text-3xl md:text-4xl font-semibold leading-tight">
            Distress sets the <span className="text-primary">floor</span>.
          </p>
          <p className="text-foreground text-3xl md:text-4xl font-semibold leading-tight">
            Your buy box sets the <span className="text-primary">ceiling</span>.
          </p>
          <p className="text-muted-foreground text-lg md:text-xl font-medium leading-tight mt-2">
            The agent scores the rest.
          </p>
        </div>
      </div>
    </section>
  )
}
