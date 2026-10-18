import { useEffect, useRef } from "react"

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const show = () => node.classList.add("is-visible")

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        show()
        observer.disconnect()
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return ref
}
