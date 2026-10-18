import { Package, ShieldCheck, Truck } from "lucide-react"
import { useReveal } from "../../hooks/useReveal"

const notes = [
  { icon: Truck, title: "Delivery options at checkout", copy: "Standard or express, shown before you review." },
  { icon: Package, title: "A short everyday aisle", copy: "Pain relief, vitamins, allergy, and first aid." },
  { icon: ShieldCheck, title: "Demo checkout", copy: "You can place a sample order. No card is charged." },
]

export default function InfoBand() {
  const ref = useReveal()

  return (
    <section ref={ref} className="reveal mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <ul className="grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
        {notes.map((note, index) => {
          const Icon = note.icon
          return (
            <li key={note.title} className="stagger-item flex gap-3" style={{ animationDelay: `${index * 60}ms` }}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sand text-ink">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{note.title}</span>
                <span className="mt-1 block text-sm leading-5 text-muted">{note.copy}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
