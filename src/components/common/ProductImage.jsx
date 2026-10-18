import { useState } from "react"
import { PillBottle } from "lucide-react"
import { cn } from "../../utils/cn"

export default function ProductImage({ product, className, priority = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={cn("grid place-items-center gap-2 bg-pine-soft text-pine", className)}>
        <PillBottle className="h-10 w-10" aria-hidden="true" />
        <span className="px-4 text-center text-sm font-medium">{product.name}</span>
      </div>
    )
  }

  return (
    <img
      src={product.image}
      alt={product.imageAlt}
      width="800"
      height="800"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-contain", className)}
    />
  )
}
