import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const slides = [
  {
    id: "essentials",
    title: "Everyday Health Essentials",
    copy: "Pain relief, allergy care, and cabinet staples, ready when you need them.",
    cta: "Shop now",
    href: "/#catalog",
    image: "/images/hero-essentials.jpg",
    alt: "Pharmacy bottles arranged on a bright white counter",
  },
  {
    id: "wellness",
    title: "Vitamins & Wellness",
    copy: "A daily vitamin, kept simple and easy to add to the cart.",
    cta: "Shop vitamins",
    href: "/?category=vitamins#catalog",
    image: "/images/hero-wellness.jpg",
    alt: "Amber vitamin bottles beside sliced oranges on marble",
  },
  {
    id: "first-aid",
    title: "First Aid & Everyday Care",
    copy: "Bandages and everyday care for minor cuts and scrapes.",
    cta: "Shop first aid",
    href: "/?category=first-aid#catalog",
    image: "/images/hero-first-aid.jpg",
    alt: "A first-aid box, gauze roll, and bottle on a white surface",
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    const timer = window.setInterval(() => {
      if (document.hidden) return
      setIndex((current) => (current + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [paused, index])

  function goTo(next) {
    setIndex((next + slides.length) % slides.length)
  }

  function onTouchStart(event) {
    event.currentTarget.dataset.startX = String(event.changedTouches[0].clientX)
  }

  function onTouchEnd(event) {
    const start = Number(event.currentTarget.dataset.startX || 0)
    const delta = event.changedTouches[0].clientX - start
    if (delta > 48) goTo(index - 1)
    if (delta < -48) goTo(index + 1)
  }

  return (
    <section className="bg-white" aria-roledescription="carousel" aria-label="Promotions">
      <div
        className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
        }}
      >
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-line" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="carousel-track flex" style={{ transform: `translateX(-${index * 100}%)` }}>
              {slides.map((slide, slideIndex) => (
                <article
                  key={slide.id}
                  className="grid w-full shrink-0 bg-white lg:min-h-[440px] lg:grid-cols-2"
                  aria-hidden={slideIndex !== index}
                  inert={slideIndex === index ? undefined : true}
                >
                  <div key={slideIndex === index ? `copy-${index}` : slide.id} className={`order-2 flex flex-col justify-center px-5 py-8 sm:px-10 lg:order-1 lg:px-14 lg:py-16 ${slideIndex === index ? "hero-in" : ""}`}>
                    {slideIndex === index ? (
                      <h1 className="max-w-md text-[1.75rem] leading-tight font-bold tracking-tight text-ink min-[380px]:text-4xl lg:text-[2.75rem]">
                        {slide.title}
                      </h1>
                    ) : (
                      <p className="max-w-md text-[1.75rem] leading-tight font-bold tracking-tight text-ink min-[380px]:text-4xl lg:text-[2.75rem]">
                        {slide.title}
                      </p>
                    )}
                    <p className="mt-3 max-w-sm text-sm leading-6 text-muted sm:text-base">{slide.copy}</p>
                    <Link
                      to={slide.href}
                      className="mt-6 inline-flex h-11 w-fit items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white hover:bg-pine-deep"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                  <div className="relative order-1 min-h-[210px] bg-sand sm:min-h-[280px] lg:order-2 lg:min-h-full">
                    <img
                      src={slide.image}
                      alt={slideIndex === index ? slide.alt : ""}
                      className={`absolute inset-0 h-full w-full object-cover ${slideIndex === index ? "hero-in" : ""}`}
                      width="1280"
                      height="720"
                      loading={slideIndex === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous promotion"
            className="absolute top-[88px] left-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-md ring-1 ring-black/5 sm:top-[120px] lg:top-1/2 lg:left-[calc(50%+0.75rem)] lg:-translate-y-1/2"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next promotion"
            className="absolute top-[88px] right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-md ring-1 ring-black/5 sm:top-[120px] lg:top-1/2 lg:-translate-y-1/2"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show promotion ${slideIndex + 1}: ${slide.title}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => goTo(slideIndex)}
              className={`h-2 rounded-full transition-all duration-300 ${slideIndex === index ? "w-6 bg-pine" : "w-2 bg-line hover:bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
