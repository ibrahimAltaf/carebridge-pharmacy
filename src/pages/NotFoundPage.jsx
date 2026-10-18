import { Link } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"

export default function NotFoundPage() {
  usePageTitle("Page not found")

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-xs font-semibold tracking-[0.16em] text-pine uppercase">404</p>
      <h1 className="mt-2 font-display text-4xl">That page is not on the shelf.</h1>
      <p className="mt-3 text-muted">The link may be mistyped. The catalog is still available.</p>
      <Link to="/" className="mt-6 inline-flex h-11 items-center rounded-full bg-pine px-5 text-sm font-semibold text-white">
        Back home
      </Link>
    </div>
  )
}
