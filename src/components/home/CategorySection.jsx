import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import { categories } from "../../data/products"
import { useReveal } from "../../hooks/useReveal"
import { selectedIds } from "../../utils/catalog"
import { cn } from "../../utils/cn"
import { categoryIcons } from "../products/categoryIcons"

export default function CategorySection({
  heading = "Shop by Category",
  lede = "",
  hrefFor = (id) => `/?category=${id}#catalog`,
  id = "categories",
}) {
  const [params] = useSearchParams()
  const active = selectedIds(params.get("category") ?? "")
  const reveal = useReveal()
  const scroller = useRef(null)

  function scrollBy(direction) {
    const node = scroller.current
    if (!node) return
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    node.scrollBy({ left: direction * 220, behavior })
  }

  return (
    <section ref={reveal} id={id} className="reveal mx-auto max-w-7xl scroll-mt-44 bg-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{heading}</h2>
        <div className="hidden gap-2 sm:flex lg:hidden">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollBy(-1)}
            className="press grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-pine"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollBy(1)}
            className="press grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-pine"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      {lede ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{lede}</p> : null}
      <ul
        ref={scroller}
        className="scrollbar-hide mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-6 lg:overflow-visible"
      >
        {categories.map((category) => {
          const Icon = categoryIcons[category.icon]
          const selected = active.includes(category.id)
          return (
            <li key={category.id} className="stagger-item w-[68%] max-w-[11rem] shrink-0 snap-start sm:w-44 lg:w-auto">
              <Link
                to={hrefFor(category.id)}
                aria-current={selected ? "true" : undefined}
                onClick={() => {
                  window.setTimeout(() => {
                    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }, 60)
                }}
                className={cn(
                  "group flex h-full flex-col items-center gap-3 rounded-lg border border-line bg-white px-3 py-4 text-center transition duration-300 hover:-translate-y-0.5 hover:border-pine",
                  selected && "border-pine bg-pine-soft",
                )}
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-sand text-ink transition duration-300 group-hover:bg-pine group-hover:text-white">
                  <Icon className="h-5 w-5 transition duration-300 group-hover:scale-110" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-ink">{category.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
