import { useState } from "react"
import { ShoppingBag, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCartDetails } from "../../hooks/useCartDetails"
import { useCartStore } from "../../store/useCartStore"
import { formatPrice } from "../../utils/format"
import CartLines from "./CartLines"
import Drawer from "../common/Drawer"

export default function CartDrawer() {
  const open = useCartStore((state) => state.isCartOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()
  const { lines, subtotal, totalQuantity } = useCartDetails()
  const [confirmClear, setConfirmClear] = useState(false)

  function handleClose() {
    setConfirmClear(false)
    closeCart()
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title="Your cart"
      footer={
        lines.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted">
                Subtotal · {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </span>
              <span className="text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs leading-5 text-muted">Demo checkout only. No payment is processed.</p>
            {confirmClear ? (
              <div className="rounded-2xl bg-sand p-3">
                <p className="text-sm font-medium">Remove every item from the cart?</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearCart()
                      setConfirmClear(false)
                    }}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-ink text-sm font-semibold text-white"
                  >
                    Clear cart
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-line bg-white text-sm font-semibold"
                  >
                    Keep items
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-clay-deep"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Clear cart
              </button>
            )}
            <Link
              to="/shop"
              onClick={handleClose}
              className="press inline-flex h-11 w-full items-center justify-center rounded-lg border border-line text-sm font-semibold text-ink transition hover:border-slate-300"
            >
              Continue shopping
            </Link>
            <button
              type="button"
              onClick={() => {
                handleClose()
                navigate("/checkout")
              }}
              className="press inline-flex h-12 w-full items-center justify-center rounded-lg bg-pine text-sm font-semibold text-white transition hover:bg-pine-deep"
            >
              Proceed to checkout
            </button>
          </div>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="px-2 py-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-pine-soft text-pine">
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-xl font-bold">Your cart is empty</h3>
          <p className="mt-2 text-sm leading-6 text-muted">Add a product to get started.</p>
          <Link
            to="/shop"
            onClick={handleClose}
            className="press mt-6 inline-flex h-11 items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white transition hover:bg-pine-deep"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <CartLines onNavigate={handleClose} />
      )}
    </Drawer>
  )
}
