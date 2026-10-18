import { usePageTitle } from "../hooks/usePageTitle"

export default function TermsPage() {
  usePageTitle("Terms")

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.16em] text-pine uppercase">Terms</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">Demonstration terms</h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-ink">
        <p>
          CareBridge Pharmacy is a fictional interface. Product names, prices, ratings, and illustrations are sample content for reviewing the shopping experience.
        </p>
        <p>
          Adding an item to the cart, changing a quantity, or opening checkout does not create a purchase, a reservation, or a professional relationship.
        </p>
        <p>
          Do not use this site for medical decisions. Labels here are shortened for the demo and are not a substitute for a packaged drug facts label.
        </p>
        <p>Prices are sample US dollar amounts and can differ from any real retailer.</p>
      </div>
    </article>
  )
}
