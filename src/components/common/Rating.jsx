import { Star } from "lucide-react"
import { formatCount } from "../../utils/format"

export default function Rating({ rating, reviewCount, compact = false }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.min(1, Math.max(0, rating - index))
          return (
            <span key={index} className="relative h-3.5 w-3.5" aria-hidden="true">
              <Star className="h-3.5 w-3.5 text-[#ddd4c6]" strokeWidth={1.75} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" strokeWidth={1.75} />
              </span>
            </span>
          )
        })}
      </div>
      <span className="text-sm font-medium text-ink">{rating.toFixed(1)}</span>
      {compact ? null : (
        <span className="text-sm text-muted">({formatCount(reviewCount)})</span>
      )}
    </div>
  )
}
