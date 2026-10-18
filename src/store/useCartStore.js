import { create } from "zustand"
import { persist } from "zustand/middleware"

function isValidLine(line) {
  return (
    line &&
    typeof line.productId === "string" &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= 99
  )
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      lines: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      toast: null,

      openCart: () => set({ isCartOpen: true, toast: null }),
      closeCart: () => set({ isCartOpen: false }),
      openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      dismissToast: () => set({ toast: null }),

      showToast: (message) => {
        const id = Date.now()
        set({ toast: { id, message } })
        window.setTimeout(() => {
          if (get().toast?.id === id) set({ toast: null })
        }, 2800)
      },

      addToCart: (product, quantity = 1) => {
        const qty = Math.min(99, Math.max(1, quantity))
        const lines = get().lines.filter(isValidLine)
        const existing = lines.find((line) => line.productId === product.id)
        const next = existing
          ? lines.map((line) =>
              line.productId === product.id
                ? { ...line, quantity: Math.min(99, line.quantity + qty) }
                : line,
            )
          : [...lines, { productId: product.id, quantity: qty }]

        set({ lines: next })
        get().showToast("Added to cart")
      },

      removeFromCart: (productId) =>
        set({ lines: get().lines.filter((line) => line.productId !== productId) }),

      incrementQuantity: (productId) =>
        set({
          lines: get().lines.map((line) =>
            line.productId === productId
              ? { ...line, quantity: Math.min(99, line.quantity + 1) }
              : line,
          ),
        }),

      decrementQuantity: (productId) =>
        set({
          lines: get().lines.map((line) =>
            line.productId === productId
              ? { ...line, quantity: Math.max(1, line.quantity - 1) }
              : line,
          ),
        }),

      clearCart: () => set({ lines: [] }),
    }),
    {
      name: "carebridge-cart",
      version: 1,
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
)

export function selectTotalQuantity(state) {
  return state.lines.reduce((sum, line) => {
    if (!isValidLine(line)) return sum
    return sum + line.quantity
  }, 0)
}
