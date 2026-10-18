import { useCartDetails } from "../../hooks/useCartDetails"
import { useCartStore } from "../../store/useCartStore"
import { formatPrice } from "../../utils/format"
import Modal from "../common/Modal"

export default function CheckoutDialog() {
  const open = useCartStore((state) => state.isCheckoutOpen)
  const closeCheckout = useCartStore((state) => state.closeCheckout)
  const openCart = useCartStore((state) => state.openCart)
  const { lines, subtotal, totalQuantity } = useCartDetails()

  return (
    <Modal open={open} onClose={closeCheckout} title="Checkout preview">
      <p className="text-sm leading-6 text-muted">
        This is a demonstration summary. No payment will be processed, no order will be placed, and no personal or health information is requested.
      </p>
      {lines.length === 0 ? (
        <p className="mt-4 text-sm">Your cart is empty, so there is nothing to preview.</p>
      ) : (
        <ul className="mt-5 divide-y divide-line rounded-2xl bg-paper px-4">
          {lines.map((line) => (
            <li key={line.productId} className="flex items-start justify-between gap-3 py-3 text-sm">
              <span>
                <span className="block font-medium">{line.product.name}</span>
                <span className="text-muted">Qty {line.quantity}</span>
              </span>
              <span className="font-semibold tabular-nums">{formatPrice(line.total)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted">{totalQuantity} items</span>
        <span className="text-lg font-semibold tabular-nums">{formatPrice(subtotal)}</span>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={closeCheckout}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-lg bg-pine text-sm font-semibold text-white"
        >
          Close preview
        </button>
        <button
          type="button"
          onClick={() => {
            closeCheckout()
            openCart()
          }}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-lg border border-line bg-white text-sm font-semibold"
        >
          Return to cart
        </button>
      </div>
    </Modal>
  )
}
