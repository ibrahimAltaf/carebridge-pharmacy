import { useSearchParams } from "react-router-dom"
import { selectedIds } from "../utils/catalog"

const defaultValue = {
  q: "",
  category: "all",
  sort: "featured",
  availability: "all",
  price: "all",
}

export function useCatalogQuery() {
  const [params, setParams] = useSearchParams()

  const query = {
    q: params.get("q") ?? "",
    category: params.get("category") ?? "all",
    sort: params.get("sort") ?? "featured",
    availability: params.get("availability") ?? "all",
    price: params.get("price") ?? "all",
  }

  function update(partial) {
    const next = new URLSearchParams(params)
    Object.entries(partial).forEach(([key, value]) => {
      if (!value || value === defaultValue[key]) next.delete(key)
      else next.set(key, value)
    })
    setParams(next, { replace: true })
  }

  function clearAll() {
    setParams(new URLSearchParams(), { replace: true })
  }

  const filterCount =
    selectedIds(query.category).length +
    selectedIds(query.availability).length +
    (query.price !== "all" ? 1 : 0)

  return { query, update, clearAll, filterCount }
}
