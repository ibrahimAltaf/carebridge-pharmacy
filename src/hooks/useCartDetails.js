import { getProductById } from "../data/products"
import { useCartStore } from "../store/useCartStore"
import { lineTotal } from "../utils/format"

export function useCartDetails() {
  const lines = useCartStore((state) => state.lines)

  const detailed = lines
    .map((line) => {
      const product = getProductById(line.productId)
      if (!product || !Number.isInteger(line.quantity) || line.quantity < 1) return null
      return {
        productId: line.productId,
        quantity: line.quantity,
        product,
        total: lineTotal(product.price, line.quantity),
      }
    })
    .filter(Boolean)

  const totalQuantity = detailed.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = detailed.reduce((sum, line) => sum + line.total, 0)

  return { lines: detailed, totalQuantity, subtotal }
}
