import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { products } from "../../data/products"
import { useReveal } from "../../hooks/useReveal"
import ProductCard from "../products/ProductCard"

export default function EssentialsCarousel() {
  const ref = useReveal()
  const scroller = useRef(null)

  function scrollBy(direction) {
    const node = scroller.current
    if (!node) return
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior })
  }

  return (
    <section ref={ref} className="reveal mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Everyday Essentials</h2>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll essentials left"
            onClick={() => scrollBy(-1)}
            className="press grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-pine"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll essentials right"
            onClick={() => scrollBy(1)}
            className="press grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-pine"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        ref={scroller}
        className="scrollbar-hide mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 pb-2"
      >
        {products.map((product) => (
          <li key={product.id} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[32%] xl:w-[24%]">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
