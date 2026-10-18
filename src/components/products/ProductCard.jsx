import { memo } from "react"
import { Check, Heart, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import Availability from "../common/Availability"
import Price from "../common/Price"
import ProductImage from "../common/ProductImage"
import Rating from "../common/Rating"
import { useAddedFlash } from "../../hooks/useAddedFlash"
import { useCartStore } from "../../store/useCartStore"
import { useSavedStore } from "../../store/useSavedStore"

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const saved = useSavedStore((state) => state.ids.includes(product.id))
  const toggleSaved = useSavedStore((state) => state.toggleSaved)
  const [added, flash] = useAddedFlash()

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
        onClick={() => toggleSaved(product.id)}
        className="press absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-black/5 transition duration-200 hover:scale-105"
      >
        <Heart className={saved ? "h-4 w-4 fill-pine text-pine" : "h-4 w-4"} aria-hidden="true" />
      </button>
      <Link to={`/product/${product.id}`} aria-label={product.name} className="block aspect-square overflow-hidden bg-white">
        <ProductImage
          product={product}
          className="p-5 transition duration-300 group-hover:scale-[1.03] sm:p-6"
        />
      </Link>
      <div className="flex flex-1 flex-col px-3 pt-1 pb-3 sm:px-4 sm:pb-4">
        <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 font-semibold text-ink">
          <Link to={`/product/${product.id}`} className="hover:text-pine-deep">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2">
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="mt-3">
          <Price price={product.price} originalPrice={product.originalPrice} />
        </div>
        <div className="mt-1">
          <Availability availability={product.availability} />
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(product)
            flash()
          }}
          className={`press mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition duration-200 ${
            added ? "bg-pine-soft text-pine-deep" : "bg-pine text-white hover:bg-pine-deep"
          }`}
        >
          {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  )
}

export default memo(ProductCard)
