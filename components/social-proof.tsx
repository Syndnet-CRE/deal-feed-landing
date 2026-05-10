export function SocialProof() {
  return (
    <section className="self-stretch py-16 flex flex-col justify-center items-center gap-10 overflow-hidden">
      <div className="text-center text-gray-300 text-sm font-medium leading-tight uppercase tracking-widest">
        The off-market opportunity is massive
      </div>
      <div className="self-stretch grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8 justify-items-center max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-primary text-5xl font-semibold leading-tight">$2.3T</div>
          <div className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[220px]">
            Estimated annual off-market CRE transaction volume
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-primary text-5xl font-semibold leading-tight">70%+</div>
          <div className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[220px]">
            Of institutional acquisitions start with off-market sourcing
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-primary text-5xl font-semibold leading-tight">12hrs</div>
          <div className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[220px]">
            Average investor time spent weekly on deal sourcing that could be automated
          </div>
        </div>
      </div>
    </section>
  )
}
