import { Circle } from "lucide-react"

const labels = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
}

export default function Availability({ availability }) {
  const low = availability === "low-stock"

  return (
    <p className={`inline-flex items-center gap-1.5 text-sm font-medium ${low ? "text-clay-deep" : "text-emerald-700"}`}>
      <Circle className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
      {labels[availability] ?? "Availability unavailable"}
    </p>
  )
}
