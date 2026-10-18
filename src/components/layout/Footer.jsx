import { HeartPulse } from "lucide-react"
import { Link } from "react-router-dom"

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Pain Relief", to: "/shop?category=pain-relief" },
      { label: "Vitamins", to: "/shop?category=vitamins" },
      { label: "First Aid", to: "/shop?category=first-aid" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help center", to: "/help" },
      { label: "Contact", to: "/contact" },
      { label: "Account", to: "/account" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About CareBridge", to: "/about" },
      { label: "Categories", to: "/categories" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-12 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-pine">
              <HeartPulse className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base leading-none font-bold">CareBridge</span>
              <span className="mt-1 block text-xs text-white/70">Pharmacy</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">Everyday health essentials, ready to shop.</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold">{column.title}</h2>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs leading-5 text-white/65 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 CareBridge Pharmacy.</p>
          <p className="max-w-xl md:text-right">
            Demonstration storefront. Not a licensed pharmacy. No payment is processed and no medical advice is provided.
          </p>
        </div>
      </div>
    </footer>
  )
}
