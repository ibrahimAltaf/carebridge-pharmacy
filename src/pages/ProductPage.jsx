import { useState } from "react"
import { Check, ChevronRight, Heart, Plus, RotateCcw, Truck } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import Availability from "../components/common/Availability"
import Price from "../components/common/Price"
import ProductImage from "../components/common/ProductImage"
import QuantityStepper from "../components/common/QuantityStepper"
import Rating from "../components/common/Rating"
import ProductCard from "../components/products/ProductCard"
import { getProductById, products } from "../data/products"
import { useAddedFlash } from "../hooks/useAddedFlash"
import { usePageTitle } from "../hooks/usePageTitle"
import { useCartStore } from "../store/useCartStore"
import { useSavedStore } from "../store/useSavedStore"

export default function ProductPage() {
  const { productId } = useParams()
  return <ProductScreen key={productId ?? "missing"} />
}

function ProductScreen() {
  const { productId } = useParams()
  const product = getProductById(productId)
  const addToCart = useCartStore((state) => state.addToCart)
  const saved = useSavedStore((state) => (product ? state.ids.includes(product.id) : false))
  const toggleSaved = useSavedStore((state) => state.toggleSaved)
  const [quantity, setQuantity] = useState(1)
  const [added, flash] = useAddedFlash()

  usePageTitle(product ? product.name : "Product not found")

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Product not found</h1>
        <p className="mt-3 text-muted">That item is not in the CareBridge catalog.</p>
        <Link to="/shop" className="mt-6 inline-flex h-11 items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white hover:bg-pine-deep">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = [
    ...products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id),
    ...products.filter((item) => item.categoryId !== product.categoryId && item.id !== product.id),
  ].slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link to="/" className="hover:text-ink">Home</Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <Link to="/shop" className="hover:text-ink">Shop</Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <Link to={`/shop?category=${product.categoryId}`} className="hover:text-ink">{product.category}</Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-lg border border-line bg-white">
          <ProductImage product={product} priority className="aspect-square p-6 sm:p-10" />
        </div>
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">{product.category}</p>
            <button
              type="button"
              aria-pressed={saved}
              aria-label={saved ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
              onClick={() => toggleSaved(product.id)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink hover:border-pine"
            >
              <Heart className={saved ? "h-4 w-4 fill-pine text-pine" : "h-4 w-4"} aria-hidden="true" />
            </button>
          </div>
          <h1 className="mt-2 text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">{product.name}</h1>
          <div className="mt-3">
            <Rating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Price price={product.price} originalPrice={product.originalPrice} size="lg" />
            <Availability availability={product.availability} />
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">{product.description}</p>

          <dl className="mt-6 divide-y divide-line border-y border-line">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 py-3 text-sm sm:grid-cols-[9rem_minmax(0,1fr)]">
                <dt className="text-muted">{spec.label}</dt>
                <dd className="font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantityStepper
              quantity={quantity}
              onDecrement={() => setQuantity((current) => Math.max(1, current - 1))}
              onIncrement={() => setQuantity((current) => Math.min(99, current + 1))}
              decrementLabel="Decrease quantity"
              incrementLabel="Increase quantity"
            />
            <button
              type="button"
              onClick={() => {
                addToCart(product, quantity)
                flash()
              }}
              className={`press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition duration-200 ${
                added ? "bg-pine-soft text-pine-deep" : "bg-pine text-white hover:bg-pine-deep"
              }`}
            >
              {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
              {added ? "Added" : "Add to cart"}
            </button>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
              <span>Shipping options appear at checkout. This preview does not place an order.</span>
            </li>
            <li className="flex items-start gap-2">
              <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
              <span>Unopened items can be reviewed for return in a live store. Returns are not processed here.</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="text-xl font-bold tracking-tight text-ink">You may also like</h2>
        <ul className="mt-5 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <li key={item.id} className="min-w-0">
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
