import { Link } from "react-router-dom"
import { cn } from "../../utils/cn"

const steps = [
  { id: "cart", label: "Cart", to: "/cart" },
  { id: "information", label: "Information", to: "/checkout" },
  { id: "review", label: "Review" },
  { id: "confirmation", label: "Confirmation" },
]

export default function CheckoutProgress({ current }) {
  const currentIndex = steps.findIndex((step) => step.id === current)

  return (
    <ol className="flex items-center gap-2 overflow-x-auto text-sm scrollbar-hide">
      {steps.map((step, index) => {
        const reached = index <= currentIndex
        const active = index === currentIndex
        const content = (
          <span
            className={cn(
              "whitespace-nowrap",
              active ? "font-semibold text-pine" : reached ? "font-medium text-ink" : "text-muted",
            )}
            aria-current={active ? "step" : undefined}
          >
            {step.label}
          </span>
        )
        return (
          <li key={step.id} className="flex items-center gap-2">
            {index > 0 ? <span className={cn("text-muted", reached && "text-pine")} aria-hidden="true">/</span> : null}
            {step.to && index < currentIndex ? (
              <Link to={step.to} className="text-pine hover:text-pine-deep">
                {step.label}
              </Link>
            ) : (
              content
            )}
          </li>
        )
      })}
    </ol>
  )
}
