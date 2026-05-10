import { MapPin, Phone, Star } from "lucide-react"

export function SampleDealBriefSection() {
  return (
    <section className="w-full px-5 py-12 md:py-20 flex flex-col items-center">
      <div className="max-w-[900px] w-full flex flex-col items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-foreground/80 text-xs md:text-sm font-medium uppercase tracking-wide">
            What you receive
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight max-w-[600px]">
            Not a spreadsheet. A finished decision.
          </h2>
        </div>

        <article className="w-full rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] overflow-hidden">
          <header className="px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6 border-b border-white/10 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-foreground text-xl md:text-2xl font-semibold leading-tight">
                  4711 Ridgeline Dr
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                  Round Rock, TX
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 ring-1 ring-primary/30">
                <Star className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} fill="currentColor" />
                <span className="text-primary text-xs md:text-sm font-semibold tracking-tight">
                  Match score: 9.1 / 10
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Self-storage parcel", "1.4 acres", "Tax delinquent", "Absentee owner", "20+ year hold"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-foreground/80 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </header>

          <div className="px-6 md:px-8 py-6 md:py-7 flex flex-col gap-5 md:gap-6">
            <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
              Mike Jones has held this property for 22 years. Tax delinquent since 2023 with two years of unpaid property taxes on file. Mailing address is 214 miles from the property — classic absentee profile. Last permit on file is from 2008, suggesting deferred capex. Assessed value $412K. Last sale price $187K (2003).
            </p>

            <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-4 md:p-5 flex flex-col gap-2">
              <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                Why this matched your buy box
              </div>
              <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                Texas commercial parcel between 1–2 acres, 20+ year hold, active tax delinquency, absentee owner. Hits every criterion.
              </p>
            </div>

            <div className="rounded-xl bg-primary/[0.08] ring-1 ring-primary/20 p-4 md:p-5 flex flex-col gap-2">
              <div className="text-primary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
                Owner contact
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-foreground/90 text-sm md:text-base">
                <span className="font-semibold">Mike Jones</span>
                <span className="tabular-nums">(281) 330-8004</span>
                <span className="text-muted-foreground text-xs md:text-sm">87% confidence</span>
                <span className="text-muted-foreground text-xs md:text-sm">Email attached</span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm italic">Verify before outreach.</p>
            </div>
          </div>
        </article>

        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed text-center max-w-[680px]">
          Every deal in your inbox reads like this. Distress signals explained. Owner profile. Match rationale. Contact info. Aerial map. Ready to call.
        </p>
      </div>
    </section>
  )
}
