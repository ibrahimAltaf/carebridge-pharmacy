import { useState } from "react"
import { ShoppingBag, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import CartLines from "../components/cart/CartLines"
import CheckoutProgress from "../components/checkout/CheckoutProgress"
import { useCartDetails } from "../hooks/useCartDetails"
import { usePageTitle } from "../hooks/usePageTitle"
import { useCartStore } from "../store/useCartStore"
import { formatPrice } from "../utils/format"

export default function CartPage() {
  usePageTitle("Cart")
  const navigate = useNavigate()
  const { lines, subtotal, totalQuantity } = useCartDetails()
  const clearCart = useCartStore((state) => state.clearCart)
  const [confirmClear, setConfirmClear] = useState(false)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <CheckoutProgress current="cart" />
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Your cart</h1>
      {lines.length === 0 ? (
        <div className="mt-10 rounded-lg border border-line px-5 py-14 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-pine-soft text-pine">
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted">Add a product to get started.</p>
          <Link
            to="/shop"
            className="press mt-6 inline-flex h-11 items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white hover:bg-pine-deep"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <CartLines />
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-muted">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
            <span className="text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted">Shipping and tax are added at checkout. This is a demo cart.</p>
          {confirmClear ? (
            <div className="mt-4 rounded-lg bg-sand p-3">
              <p className="text-sm font-medium">Remove every item from the cart?</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    clearCart()
                    setConfirmClear(false)
                  }}
                  className="press inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-ink text-sm font-semibold text-white"
                >
                  Clear cart
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="press inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-line bg-white text-sm font-semibold"
                >
                  Keep items
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="mt-4 inline-flex h-11 items-center gap-2 text-sm font-semibold text-clay-deep"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Clear cart
            </button>
          )}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="press inline-flex h-12 items-center justify-center rounded-lg border border-line px-5 text-sm font-semibold text-ink transition hover:border-slate-300"
            >
              Continue shopping
            </Link>
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="press inline-flex h-12 flex-1 items-center justify-center rounded-lg bg-pine px-5 text-sm font-semibold text-white transition hover:bg-pine-deep"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
