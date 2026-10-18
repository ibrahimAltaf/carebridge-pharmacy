import { Minus, Plus } from "lucide-react"

export default function QuantityStepper({
  quantity,
  onDecrement,
  onIncrement,
  decrementLabel,
  incrementLabel,
}) {
  return (
    <div className="inline-flex items-center rounded-full bg-white ring-1 ring-line">
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= 1}
        aria-label={decrementLabel}
        className="grid h-11 w-11 place-items-center rounded-full text-ink disabled:cursor-not-allowed disabled:text-muted/50"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= 99}
        aria-label={incrementLabel}
        className="grid h-11 w-11 place-items-center rounded-full text-ink disabled:cursor-not-allowed disabled:text-muted/50"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
