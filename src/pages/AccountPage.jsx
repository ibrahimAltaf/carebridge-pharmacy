import { UserRound } from "lucide-react"
import { Link } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"

export default function AccountPage() {
  usePageTitle("Account")

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-pine-soft text-pine">
        <UserRound className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-display text-4xl">Accounts are not part of this demo</h1>
      <p className="mt-3 text-base leading-7 text-muted">
        You can shop, filter, and keep a cart in this browser without signing in. No profile or health record is created.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/shop" className="inline-flex h-11 items-center justify-center rounded-full bg-pine px-5 text-sm font-semibold text-white">
          Continue shopping
        </Link>
        <Link to="/help" className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold ring-1 ring-line">
          Read help
        </Link>
      </div>
    </div>
  )
}
