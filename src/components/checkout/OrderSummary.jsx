import { formatPrice } from "../../utils/format"

export default function OrderSummary({ lines, subtotal, shipping, tax, total }) {
  return (
    <aside className="rounded-lg border border-line bg-sand p-4 sm:p-5">
      <h2 className="text-base font-semibold text-ink">Order summary</h2>
      <ul className="mt-4 space-y-3">
        {lines.map((line) => (
          <li key={line.key} className="flex gap-3">
            <img
              src={line.image}
              alt=""
              width="64"
              height="64"
              className="h-16 w-16 shrink-0 rounded-md border border-line bg-white object-contain p-1"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-ink">{line.name}</p>
              <p className="text-xs text-muted">Qty {line.quantity}</p>
            </div>
            <p className="text-sm font-semibold tabular-nums">{formatPrice(line.total)}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Shipping</dt>
          <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Estimated tax</dt>
          <dd className="tabular-nums">{formatPrice(tax)}</dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-line pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs leading-5 text-muted">Tax is a demo estimate. No payment is processed.</p>
    </aside>
  )
}
