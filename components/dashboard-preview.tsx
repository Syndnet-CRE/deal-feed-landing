export function DashboardPreview() {
  return (
    <div className="w-full md:w-[1010px] mx-auto">
      <div className="relative">
        {/* Back glass — 16px ring, lightest */}
        <div className="absolute -inset-4 rounded-[24px] bg-primary-light/30 shadow-2xl ring-1 ring-white/[0.08]" />
        {/* Mid glass — 8px ring, slightly stronger */}
        <div className="absolute -inset-2 rounded-2xl bg-primary-light/55 ring-1 ring-white/10" />
        {/* Image — transparent SVG zones cropped flush so all four gaps are uniform */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="/images/dashboard-preview.svg"
            alt="Dashboard preview"
            className="block w-full h-auto -mt-4 -mb-4 md:-mt-12 md:-mb-12"
          />
        </div>
      </div>
    </div>
  )
}
