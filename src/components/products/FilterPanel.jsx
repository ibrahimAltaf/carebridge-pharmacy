import { categories, products } from "../../data/products"
import { availabilityFilters, priceFilters, selectedIds, toggleId } from "../../utils/catalog"

const categoryCounts = Object.fromEntries(
  categories.map((category) => [
    category.id,
    products.filter((product) => product.categoryId === category.id).length,
  ]),
)

function SectionTitle({ children }) {
  return <legend className="text-xs font-semibold tracking-wide text-ink uppercase">{children}</legend>
}

export default function FilterPanel({ query, update, idPrefix, onClear }) {
  const categoryIds = selectedIds(query.category)
  const availabilityIds = selectedIds(query.availability)

  return (
    <div className="space-y-7">
      <fieldset>
        <SectionTitle>Category</SectionTitle>
        <div className="mt-3 space-y-0.5">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-1 py-2 text-sm hover:bg-sand"
            >
              <span className="flex min-w-0 items-center gap-2.5 text-ink">
                <input
                  type="checkbox"
                  className="h-4 w-4 shrink-0 accent-pine"
                  checked={categoryIds.includes(category.id)}
                  onChange={() => update({ category: toggleId(query.category, category.id) })}
                />
                <span className="truncate">{category.name}</span>
              </span>
              <span className="text-xs tabular-nums text-muted">({categoryCounts[category.id]})</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <SectionTitle>Price</SectionTitle>
        <div className="mt-3 space-y-0.5">
          {priceFilters.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-2 text-sm text-ink hover:bg-sand"
            >
              <input
                type="radio"
                name={`${idPrefix}-price`}
                className="h-4 w-4 shrink-0 accent-pine"
                checked={query.price === option.id}
                onChange={() => update({ price: option.id })}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <SectionTitle>Availability</SectionTitle>
        <div className="mt-3 space-y-0.5">
          {availabilityFilters.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-2 text-sm text-ink hover:bg-sand"
            >
              <input
                type="checkbox"
                className="h-4 w-4 shrink-0 accent-pine"
                checked={availabilityIds.includes(option.id)}
                onChange={() => update({ availability: toggleId(query.availability, option.id) })}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onClear}
        className="text-sm font-semibold text-ink underline-offset-4 hover:text-pine hover:underline"
      >
        Clear filters
      </button>
    </div>
  )
}
