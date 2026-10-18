import { Check } from "lucide-react"
import { useCartStore } from "../../store/useCartStore"

export default function CartToast() {
  const toast = useCartStore((state) => state.toast)
  const openCart = useCartStore((state) => state.openCart)
  const dismissToast = useCartStore((state) => state.dismissToast)

  if (!toast) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4">
      <div
        role="status"
        className="toast-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-4 text-sm text-foam shadow-xl"
      >
        <Check className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
        <p className="min-w-0 flex-1 font-medium">{toast.message}</p>
        <button
          type="button"
          onClick={() => {
            dismissToast()
            openCart()
          }}
          className="inline-flex h-9 items-center rounded-full bg-foam px-3 text-sm font-semibold text-ink"
        >
          View
        </button>
      </div>
    </div>
  )
}
