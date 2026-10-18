import { Link } from "react-router-dom"
import CheckoutProgress from "../components/checkout/CheckoutProgress"
import { usePageTitle } from "../hooks/usePageTitle"
import { useCheckoutStore } from "../store/useCheckoutStore"
import { formatPrice } from "../utils/format"

export default function OrderSuccessPage() {
  usePageTitle("Order confirmed")
  const order = useCheckoutStore((state) => state.lastOrder)

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-ink">No demo order to show</h1>
        <p className="mt-3 text-sm text-muted">Place a demo order from checkout to see a confirmation.</p>
        <Link
          to="/shop"
          className="press mt-6 inline-flex h-11 items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white hover:bg-pine-deep"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  const destination = order.destination

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <CheckoutProgress current="confirmation" />
      <p className="mt-8 text-sm font-semibold tracking-wide text-pine uppercase">Demo order {order.number}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Order confirmed</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
        Thank you for your demo order. Nothing was charged, and no order was sent to a pharmacy.
      </p>

      <div className="mt-8 rounded-lg border border-line p-4 sm:p-5">
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Shipping to</h2>
        <p className="mt-2 text-sm leading-6 text-ink">
          {destination.firstName} {destination.lastName}
          <br />
          {destination.address}
          {destination.apartment ? `, ${destination.apartment}` : ""}
          <br />
          {destination.city}, {destination.state} {destination.zip}
        </p>
        <p className="mt-3 text-sm text-muted">
          {order.shippingMethod.name} · Estimated demo delivery {order.shippingMethod.eta}
        </p>
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {order.lines.map((line) => (
          <li key={line.id} className="flex items-center gap-3 py-3">
            <img src={line.image} alt="" width="56" height="56" className="h-14 w-14 rounded-md border border-line bg-white object-contain p-1" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{line.name}</span>
              <span className="text-xs text-muted">Qty {line.quantity}</span>
            </span>
            <span className="text-sm font-semibold tabular-nums">{formatPrice(line.total)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(order.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className="tabular-nums">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Estimated tax</dt>
          <dd className="tabular-nums">{formatPrice(order.tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(order.total)}</dd>
        </div>
      </dl>

      <Link
        to="/shop"
        className="press mt-8 inline-flex h-12 items-center rounded-lg bg-pine px-6 text-sm font-semibold text-white transition hover:bg-pine-deep"
      >
        Continue shopping
      </Link>
    </div>
  )
}
