import { Search, X } from "lucide-react"
import { cn } from "../../utils/cn"

export default function SearchField({ id, value, onChange, onClear, onSubmit, prominent = false }) {
  return (
    <form
      role="search"
      className="relative min-w-0 flex-1"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted",
          prominent ? "left-4 h-5 w-5" : "left-3 h-4 w-4",
        )}
        aria-hidden="true"
      />
      <input
        id={id}
        type="text"
        inputMode="search"
        enterKeyHint="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search medicines, vitamins, and essentials"
        autoComplete="off"
        className={cn(
          "w-full border border-line bg-sand text-ink outline-none placeholder:text-muted/80 focus:border-pine focus:bg-white",
          prominent ? "h-12 rounded-lg pr-12 pl-11 text-[15px]" : "h-11 rounded-lg pr-11 pl-10 text-sm",
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-white hover:text-ink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </form>
  )
}
