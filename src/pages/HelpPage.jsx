import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"
import { cn } from "../utils/cn"

const faqs = [
  {
    question: "Is CareBridge a real pharmacy?",
    answer:
      "No. CareBridge Pharmacy is a fictional storefront created for a frontend demonstration. It is not licensed to dispense medication.",
  },
  {
    question: "Can I order a prescription?",
    answer:
      "No. The catalog is limited to six representative over-the-counter style products. Prescription ordering is not available.",
  },
  {
    question: "How does search work?",
    answer:
      "Search checks product names, categories, descriptions, and related words. It is case-insensitive and updates as you type. Filters and sorting stay applied.",
  },
  {
    question: "Where is my cart stored?",
    answer:
      "The cart is saved in this browser with local storage. Refreshing the page keeps the items. Clearing the browser storage, or using a private window, starts a new cart.",
  },
  {
    question: "What happens if I preview checkout?",
    answer:
      "You will see a summary of the cart and the subtotal. No payment is taken and no order is sent anywhere.",
  },
  {
    question: "Do you collect health information?",
    answer:
      "No. There is no account health profile, no symptom checker, and the contact form does not transmit what you type.",
  },
]

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(0)
  usePageTitle("Help")

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.16em] text-pine uppercase">Help</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">How this demonstration works</h1>
      <p className="mt-4 text-base leading-7 text-muted">
        These answers cover the shopping interactions in the demo. They are not medical guidance.
      </p>
      <div className="mt-8 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
        {faqs.map((faq, index) => {
          const open = openIndex === index
          return (
            <div key={faq.question}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition", open && "rotate-180")} aria-hidden="true" />
              </button>
              {open ? <p className="px-5 pb-5 text-sm leading-6 text-muted">{faq.answer}</p> : null}
            </div>
          )
        })}
      </div>
      <p className="mt-6 text-sm text-muted">
        Still looking? <Link to="/contact" className="font-semibold text-pine">Contact the demo desk</Link>.
      </p>
    </div>
  )
}
