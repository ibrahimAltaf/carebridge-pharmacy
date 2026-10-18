import { useState } from "react"
import { ChevronDown, SearchX, SlidersHorizontal, X } from "lucide-react"
import { getCategoryById } from "../../data/products"
import { useCatalogQuery } from "../../hooks/useCatalogQuery"
import { useReveal } from "../../hooks/useReveal"
import { availabilityFilters, filterProducts, priceFilters, selectedIds, sortOptions, toggleId } from "../../utils/catalog"
import { cn } from "../../utils/cn"
import Drawer from "../common/Drawer"
import FilterPanel from "./FilterPanel"
import ProductCard from "./ProductCard"

function productCountLabel(count) {
  return count === 1 ? "1 product" : `${count} products`
}

function buildChips(query, update) {
  const chips = []

  if (query.q.trim()) {
    chips.push({
      id: "q",
      label: `Search: ${query.q.trim()}`,
      remove: () => update({ q: "" }),
    })
  }

  selectedIds(query.category).forEach((id) => {
    chips.push({
      id: `category-${id}`,
      label: getCategoryById(id)?.name ?? "Category",
      remove: () => update({ category: toggleId(query.category, id) }),
    })
  })

  if (query.price !== "all") {
    chips.push({
      id: "price",
      label: priceFilters.find((item) => item.id === query.price)?.label ?? "Price",
      remove: () => update({ price: "all" }),
    })
  }

  selectedIds(query.availability).forEach((id) => {
    chips.push({
      id: `availability-${id}`,
      label: availabilityFilters.find((item) => item.id === id)?.label ?? "Availability",
      remove: () => update({ availability: toggleId(query.availability, id) }),
    })
  })

  return chips
}

export default function Catalog({ heading = "Featured Products", showHeading = true }) {
  const reveal = useReveal()
  const { query, update, clearAll, filterCount } = useCatalogQuery()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const results = filterProducts(query)
  const chips = buildChips(query, update)
  const clearFacets = () => update({ category: "all", price: "all", availability: "all" })

  return (
    <section ref={reveal} id="catalog" className="reveal scroll-mt-44">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:items-start lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-36 rounded-lg border border-line bg-white p-5">
            <h2 className="mb-5 text-base font-semibold text-ink">Filters</h2>
            <FilterPanel query={query} update={update} idPrefix="sidebar" onClear={clearFacets} />
          </div>
        </aside>

        <div className="min-w-0">
          {showHeading ? (
            <h2 className="mb-4 text-xl font-bold tracking-tight text-ink sm:text-2xl">{heading}</h2>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-4">
            <p className="text-sm font-medium text-ink">{productCountLabel(results.length)}</p>
            {chips.length > 0 ? (
              <div className="order-3 flex w-full flex-wrap items-center gap-2 sm:order-none sm:w-auto sm:flex-1">
                {chips.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={chip.remove}
                    className="inline-flex h-8 max-w-full items-center gap-1.5 rounded-full bg-pine-soft px-3 text-sm font-medium text-pine-deep"
                  >
                    <span className="truncate">{chip.label}</span>
                    <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="sr-only">Remove {chip.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="h-8 px-1 text-sm font-semibold text-ink underline-offset-4 hover:underline"
                >
                  Clear all
                </button>
              </div>
            ) : null}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                aria-expanded={filtersOpen}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold lg:hidden",
                  filterCount > 0 ? "bg-pine text-white" : "border border-line bg-white text-ink",
                )}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters
                {filterCount > 0 ? <span className="tabular-nums">({filterCount})</span> : null}
              </button>
              <label className="relative">
                <span className="sr-only">Sort products</span>
                <span className="pointer-events-none absolute top-1/2 left-3 hidden -translate-y-1/2 text-sm text-muted sm:inline">
                  Sort
                </span>
                <select
                  value={query.sort}
                  onChange={(event) => update({ sort: event.target.value })}
                  aria-label="Sort products"
                  className="h-10 w-36 appearance-none rounded-lg border border-line bg-white pr-8 pl-3 text-sm text-ink sm:w-56 sm:pl-12"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              </label>
            </div>
          </div>

          {results.length > 0 ? (
            <ul className="mt-5 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3">
              {results.map((product) => (
                <li key={product.id} className="stagger-item min-w-0">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 rounded-lg border border-line bg-white px-5 py-14 text-center">
              <SearchX className="mx-auto h-8 w-8 text-muted" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-ink">No products found</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                Try adjusting your search or filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="press mt-6 inline-flex h-11 items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white transition hover:bg-pine-deep"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        side="bottom"
        footer={
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-pine text-sm font-semibold text-white hover:bg-pine-deep"
          >
            Show {productCountLabel(results.length)}
          </button>
        }
      >
        <FilterPanel query={query} update={update} idPrefix="sheet" onClear={clearFacets} />
      </Drawer>
    </section>
  )
}
