import { Headset, Lock, ShieldCheck, ShoppingBag } from "lucide-react"

const benefits = [
  { title: "Easy Shopping", icon: ShoppingBag },
  { title: "Trusted Everyday Products", icon: ShieldCheck },
  { title: "Secure Experience", icon: Lock },
  { title: "Customer Support", icon: Headset },
]

export default function TrustStrip() {
  return (
    <section className="border-b border-line bg-white" aria-label="Shopping benefits">
      <ul className="scrollbar-hide mx-auto flex max-w-7xl gap-x-8 gap-y-3 overflow-x-auto px-4 py-3 sm:px-6 lg:justify-between">
        {benefits.map((benefit) => {
          const Icon = benefit.icon
          return (
            <li key={benefit.title} className="flex shrink-0 items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4 text-pine" aria-hidden="true" />
              {benefit.title}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
