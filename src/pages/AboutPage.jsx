import { Link } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"

export default function AboutPage() {
  usePageTitle("About")

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.16em] text-pine uppercase">About</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">A pharmacy counter, designed to feel calm.</h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        CareBridge Pharmacy is an original fictional brand for a US shopping demonstration. The interface is meant to feel trustworthy and practical: clear type, a short catalog, and a cart you can review before a preview checkout.
      </p>
      <div className="mt-8 space-y-4 text-base leading-7 text-ink">
        <p>
          The six products are representative over-the-counter items: pain relievers, a vitamin, an allergy tablet, an antacid, and adhesive bandages. Illustrations stand in for private-label packaging so the demo does not rely on another company&apos;s branding.
        </p>
        <p>
          Nothing on this site is a recommendation, a treatment claim, or an offer to dispense medication. A real pharmacy visit, a licensed pharmacist, or a clinician is the right place for health decisions.
        </p>
      </div>
      <dl className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["Catalog", "Six OTC products"],
          ["Currency", "US dollars"],
          ["Checkout", "Preview only"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-line">
            <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{label}</dt>
            <dd className="mt-2 font-display text-2xl">{value}</dd>
          </div>
        ))}
      </dl>
      <Link to="/shop" className="mt-8 inline-flex h-11 items-center rounded-full bg-pine px-5 text-sm font-semibold text-white">
        View the catalog
      </Link>
    </article>
  )
}
