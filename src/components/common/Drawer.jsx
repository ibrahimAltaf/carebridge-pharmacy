import { useEffect, useId, useRef } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

function getFocusable(container) {
  return [...container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
  )
}

export default function Drawer({ open, title, onClose, side = "right", children, footer = null }) {
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

  const isBottom = side === "bottom"
  const panelClass = isBottom
    ? "inset-x-0 bottom-0 max-h-[min(88vh,40rem)] rounded-t-2xl drawer-up"
    : `top-0 ${side === "left" ? "left-0 drawer-left" : "right-0 drawer-right"} h-full w-full max-w-full sm:max-w-md`

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close panel"
        className="backdrop-fade absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`absolute flex w-full flex-col overflow-hidden bg-white shadow-2xl outline-none ${panelClass}`}
      >
        <div className={`flex items-center justify-between gap-4 border-b border-line px-4 sm:px-5 ${isBottom ? "pt-6 pb-3" : "py-4"}`}>
          {isBottom ? <span className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-line" aria-hidden="true" /> : null}
          <h2 id={titleId} className="text-lg font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-sand"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">{children}</div>
        {footer ? (
          <div className="border-t border-line px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
