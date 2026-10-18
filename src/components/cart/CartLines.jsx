import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartDetails } from "../../hooks/useCartDetails"
import { useCartStore } from "../../store/useCartStore"
import { formatPrice } from "../../utils/format"
import ProductImage from "../common/ProductImage"
import QuantityStepper from "../common/QuantityStepper"

export default function CartLines({ onNavigate }) {
  const lines = useCartDetails().lines
  const incrementQuantity = useCartStore((state) => state.incrementQuantity)
  const decrementQuantity = useCartStore((state) => state.decrementQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const [leavingId, setLeavingId] = useState(null)

  function remove(productId) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      removeFromCart(productId)
      return
    }
    setLeavingId(productId)
    window.setTimeout(() => {
      removeFromCart(productId)
      setLeavingId(null)
    }, 180)
  }

  return (
    <ul className="space-y-4">
      {lines.map((line, index) => (
        <li
          key={line.productId}
          className={`flex gap-3 border-b border-line pb-4 ${leavingId === line.productId ? "cart-line-leave" : "cart-line"}`}
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <Link
            to={`/product/${line.product.id}`}
            onClick={onNavigate}
            className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-white"
          >
            <ProductImage product={line.product} className="p-1" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <Link
                to={`/product/${line.product.id}`}
                onClick={onNavigate}
                className="line-clamp-2 text-sm font-semibold hover:text-pine-deep"
              >
                {line.product.name}
              </Link>
              <button
                type="button"
                onClick={() => remove(line.productId)}
                aria-label={`Remove ${line.product.name}`}
                className="press grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-sand hover:text-ink"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-sm text-muted tabular-nums">{formatPrice(line.product.price)} each</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <QuantityStepper
                quantity={line.quantity}
                onDecrement={() => decrementQuantity(line.productId)}
                onIncrement={() => incrementQuantity(line.productId)}
                decrementLabel={`Decrease quantity of ${line.product.name}`}
                incrementLabel={`Increase quantity of ${line.product.name}`}
              />
              <p key={line.quantity} className="qty-pop text-sm font-semibold tabular-nums">
                {formatPrice(line.total)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
