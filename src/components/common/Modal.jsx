import { useEffect, useId, useRef } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

function getFocusable(container) {
  return [...container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
    (element) => !element.hasAttribute("disabled"),
  )
}

export default function Modal({ open, title, onClose, children }) {
  const titleId = useId()
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined
    const previouslyFocused = document.activeElement
    const panel = panelRef.current
    const focusable = panel ? getFocusable(panel) : []
    ;(focusable[0] ?? panel)?.focus()

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== "Tab" || !panel) return
      const items = getFocusable(panel)
      if (items.length === 0) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener("keydown", onKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[80] grid place-items-end p-0 sm:place-items-center sm:p-6">
      <button type="button" aria-label="Close dialog" className="absolute inset-0 bg-ink/45" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-foam p-5 shadow-2xl outline-none sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-3xl text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-sand"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
