"use client"

import { useEffect, useRef, useState } from "react"

function useCountUp(target: number, duration: number, delay: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let timeout: ReturnType<typeof setTimeout>
    let raf: number

    timeout = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        setValue(progress === 1 ? target : target * progress)
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [active, target, duration, delay])

  return value
}

export function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const trillions = useCountUp(2.3, 2000, 0, active)
  const percent = useCountUp(70, 2000, 500, active)
  const hours = useCountUp(12, 2000, 1000, active)

  return (
    <section ref={sectionRef} className="self-stretch py-16 flex flex-col justify-center items-center gap-10 overflow-hidden">
      <div className="text-center text-gray-300 text-[48px] font-semibold leading-tight">
        <span className="block">The off-market opportunity</span>
        <span className="block">is massive</span>
      </div>
      <div className="self-stretch grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-16 justify-items-center max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-primary text-7xl font-semibold leading-tight">
            ${trillions.toFixed(1)}T
          </div>
          <div className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[220px]">
            Estimated annual off-market CRE transaction volume
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-primary text-7xl font-semibold leading-tight">
            {Math.round(percent)}%+
          </div>
          <div className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[220px]">
            Of institutional acquisitions start with off-market sourcing
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-primary text-7xl font-semibold leading-tight">
            {Math.max(1, Math.round(hours))}hrs
          </div>
          <div className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[220px]">
            Average investor time spent weekly on deal sourcing that could be automated
          </div>
        </div>
      </div>
    </section>
  )
}
