import { Link } from "react-router-dom"
import { useReveal } from "../../hooks/useReveal"

export default function PromoBanner() {
  const ref = useReveal()

  return (
    <section ref={ref} className="reveal mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8">
      <div className="grid overflow-hidden rounded-lg border border-line bg-white lg:min-h-[280px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-8 sm:px-10 lg:px-12">
          <h2 className="max-w-md text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Everyday wellness, made easier.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted sm:text-base">
            Vitamins and cabinet staples, gathered in one calm aisle.
          </p>
          <Link
            to="/?category=vitamins#catalog"
            className="press mt-6 inline-flex h-11 w-fit items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white transition hover:bg-pine-deep"
          >
            Explore Wellness
          </Link>
        </div>
        <div className="relative min-h-[200px] bg-sand">
          <img
            src="/images/hero-wellness.jpg"
            alt="Vitamin bottles and oranges on a marble surface"
            className="absolute inset-0 h-full w-full object-cover"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
