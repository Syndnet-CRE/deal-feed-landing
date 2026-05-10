import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SIGNUP_URL } from "@/lib/config"

interface PricingPlan {
  name: string
  price: string
  priceSuffix: string
  tagline: string
  description: string
  features: string[]
  trial: string | null
  buttonText: string
  buttonHref: string
  buttonClass: string
  popular?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$149",
    priceSuffix: "/month",
    tagline: "~$1 per deal",
    description: "One buy box. Up to 5 deals every morning.",
    features: [
      "1 active buy box",
      "Up to 5 deals per night",
      "Add'l buy box +$50/mo",
      "AI-written deal briefs",
      "Distress signals + match threshold",
      "Skip-traced owner contacts",
      "Cancel anytime",
    ],
    trial: "3-day free trial · 3 buy boxes · 15 deals",
    buttonText: "Start your trial",
    buttonHref: SIGNUP_URL,
    buttonClass:
      "bg-zinc-300 shadow-[0px_1px_1px_-0.5px_rgba(16,24,40,0.20)] outline outline-0.5 outline-[#1e29391f] outline-offset-[-0.5px] text-gray-800 text-shadow-[0px_1px_1px_rgba(16,24,40,0.08)] hover:bg-zinc-400",
  },
  {
    name: "Operator",
    price: "$249",
    priceSuffix: "/month",
    tagline: "Multi-market coverage",
    description: "Up to 5 buy boxes. More markets, more deals every morning.",
    features: [
      "Up to 5 active buy boxes",
      "Up to 25 deals per night (5 per box)",
      "Everything in Starter",
      "Multi-market dashboard",
      "Priority support",
      "Cancel anytime",
    ],
    trial: "3-day free trial · 5 buy boxes · 75 deals",
    buttonText: "Start your trial",
    buttonHref: SIGNUP_URL,
    buttonClass:
      "bg-primary-foreground shadow-[0px_1px_1px_-0.5px_rgba(16,24,40,0.20)] text-primary text-shadow-[0px_1px_1px_rgba(16,24,40,0.08)] hover:bg-primary-foreground/90",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "",
    tagline: "Talk to us",
    description: "More than 5 buy boxes or custom deal volume.",
    features: [
      "Unlimited buy boxes",
      "Custom deal volume per night",
      "Dedicated account support",
      "Custom data and coverage SLAs",
      "API access",
    ],
    trial: null,
    buttonText: "Contact us",
    buttonHref: "#",
    buttonClass:
      "bg-secondary shadow-[0px_1px_1px_-0.5px_rgba(16,24,40,0.20)] text-secondary-foreground text-shadow-[0px_1px_1px_rgba(16,24,40,0.08)] hover:bg-secondary/90",
  },
]

export function PricingSection() {
  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start items-center my-0 py-8 md:py-14">
      <div className="self-stretch relative flex flex-col justify-center items-center gap-2 py-0">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-4xl md:text-5xl font-semibold leading-tight md:leading-[40px]">
            Pricing built for active investors
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-tight">
            No contracts. Cancel anytime. Card required to start your trial.
          </p>
        </div>
      </div>
      <div className="self-stretch px-5 flex flex-col lg:flex-row justify-start items-stretch gap-4 lg:gap-6 mt-8 max-w-[1100px] mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`flex-1 p-4 overflow-hidden rounded-xl flex flex-col justify-between gap-6 ${plan.popular ? "bg-primary shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.10)]" : "bg-gradient-to-b from-gray-50/5 to-gray-50/0"}`}
            style={plan.popular ? {} : { outline: "1px solid hsl(var(--border))", outlineOffset: "-1px" }}
          >
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div
                  className={`w-full h-5 text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground" : "text-zinc-200"}`}
                >
                  {plan.name}
                  {plan.popular && (
                    <div className="ml-2 px-2 overflow-hidden rounded-full justify-center items-center gap-2.5 inline-flex mt-0 py-0.5 bg-gradient-to-b from-primary-light/50 to-primary-light bg-white">
                      <div className="text-center text-primary-foreground text-xs font-normal leading-tight break-words">
                        Popular
                      </div>
                    </div>
                  )}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                  <div className="flex justify-start items-baseline gap-1.5">
                    <div
                      className={`text-3xl md:text-4xl font-medium leading-10 ${plan.popular ? "text-primary-foreground" : "text-zinc-50"}`}
                    >
                      {plan.price}
                    </div>
                    {plan.priceSuffix && (
                      <div
                        className={`text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground/70" : "text-zinc-400"}`}
                      >
                        {plan.priceSuffix}
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-xs font-medium leading-tight ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {plan.tagline}
                  </div>
                  <div
                    className={`self-stretch mt-2 text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground/70" : "text-zinc-400"}`}
                  >
                    {plan.description}
                  </div>
                </div>
              </div>
              <Link href={plan.buttonHref} className="self-stretch">
                <Button
                  className={`self-stretch w-full px-5 py-2 rounded-[40px] flex justify-center items-center ${plan.buttonClass}`}
                >
                  <span className="text-center text-sm font-medium leading-tight">{plan.buttonText}</span>
                </Button>
              </Link>
              {plan.trial && (
                <p
                  className={`self-stretch text-center text-xs font-medium leading-tight ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {plan.trial}
                </p>
              )}
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="self-stretch flex justify-start items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <Check
                        className={`w-full h-full ${plan.popular ? "text-primary-foreground" : "text-muted-foreground"}`}
                        strokeWidth={2}
                      />
                    </div>
                    <div
                      className={`leading-tight font-normal text-sm text-left ${plan.popular ? "text-primary-foreground" : "text-muted-foreground"}`}
                    >
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-muted-foreground text-xs font-medium leading-relaxed max-w-2xl mx-auto px-4">
        No refunds — you're paying for nightly infrastructure, data access, and compute. Cancel anytime. Runs through the end of your billing period.
      </p>
    </section>
  )
}
