import { formatPrice } from "../../utils/format"
import { cn } from "../../utils/cn"

export default function Price({ price, originalPrice, size = "md" }) {
  const onSale = typeof originalPrice === "number" && originalPrice > price

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span
        className={cn(
          "font-semibold tabular-nums text-ink",
          size === "lg" ? "text-3xl" : "text-lg",
        )}
      >
        {formatPrice(price)}
      </span>
      {onSale ? (
        <span className="text-sm text-muted line-through tabular-nums">{formatPrice(originalPrice)}</span>
      ) : null}
    </p>
  )
}
