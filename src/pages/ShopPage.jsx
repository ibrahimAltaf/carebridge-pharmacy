import Catalog from "../components/products/Catalog"
import { usePageTitle } from "../hooks/usePageTitle"

export default function ShopPage() {
  usePageTitle("Shop")

  return (
    <div className="mx-auto max-w-7xl bg-white px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Shop</h1>
      <div className="mt-5">
        <Catalog showHeading={false} />
      </div>
    </div>
  )
}
