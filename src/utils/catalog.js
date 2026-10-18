import { products } from "../data/products"

export const priceFilters = [
  { id: "all", label: "All prices" },
  { id: "under-10", label: "Under $10" },
  { id: "10-15", label: "$10 – $15" },
  { id: "over-15", label: "$15+" },
]

export const availabilityFilters = [
  { id: "in-stock", label: "In Stock" },
  { id: "low-stock", label: "Low Stock" },
]

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Rating" },
  { id: "name", label: "Name: A to Z" },
]

export function selectedIds(value) {
  if (!value || value === "all") return []
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function toggleId(value, id) {
  const current = selectedIds(value)
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  return next.length ? next.join(",") : "all"
}

function matchesPrice(price, filter) {
  if (filter === "under-10") return price < 10
  if (filter === "10-15") return price >= 10 && price <= 15
  if (filter === "over-15") return price > 15
  return true
}

export function filterProducts(query) {
  const term = query.q.trim().toLowerCase()
  const categories = selectedIds(query.category)
  const availability = selectedIds(query.availability)

  const matched = products.filter((product) => {
    if (categories.length > 0 && !categories.includes(product.categoryId)) return false
    if (availability.length > 0 && !availability.includes(product.availability)) return false
    if (!matchesPrice(product.price, query.price)) return false
    if (!term) return true

    const haystack = [
      product.name,
      product.category,
      product.description,
      product.sizeLabel,
      product.badge ?? "",
      product.keywords.join(" "),
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(term)
  })

  const sorted = [...matched]

  if (query.sort === "price-asc") {
    sorted.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name))
  } else if (query.sort === "price-desc") {
    sorted.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name))
  } else if (query.sort === "rating") {
    sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  } else if (query.sort === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  }

  return sorted
}
