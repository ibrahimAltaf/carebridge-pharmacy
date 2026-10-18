import { HeartPulse } from "lucide-react"
import { Link } from "react-router-dom"

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5 rounded-lg" aria-label="CareBridge Pharmacy, home">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-pine text-white">
        <HeartPulse className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[1.05rem] font-bold tracking-tight text-ink">CareBridge</span>
        {compact ? null : (
          <span className="block text-[11px] font-medium text-muted">Pharmacy</span>
        )}
      </span>
    </Link>
  )
}
