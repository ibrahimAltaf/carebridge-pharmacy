import { useState } from "react"
import { Menu, ShoppingBag, UserRound } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Logo from "../common/Logo"
import SearchField from "../common/SearchField"
import { selectTotalQuantity, useCartStore } from "../../store/useCartStore"
import { cn } from "../../utils/cn"
import MobileMenu from "./MobileMenu"

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" },
]

function navClass(isActive) {
  return cn(
    "relative px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200",
    "after:absolute after:right-3 after:bottom-0 after:left-3 after:h-0.5 after:origin-left after:bg-pine after:transition-transform after:duration-300",
    isActive ? "text-pine after:scale-x-100" : "text-ink after:scale-x-0 hover:text-pine hover:after:scale-x-100",
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onCatalog = location.pathname === "/" || location.pathname === "/shop"
  const params = new URLSearchParams(location.search)
  const query = onCatalog ? (params.get("q") ?? "") : ""
  const totalQuantity = useCartStore(selectTotalQuantity)
  const openCart = useCartStore((state) => state.openCart)

  function writeQuery(value) {
    if (onCatalog) {
      const next = new URLSearchParams(location.search)
      if (value) next.set("q", value)
      else next.delete("q")
      navigate({ pathname: location.pathname, search: next.toString() }, { replace: true })
      return
    }

    const next = new URLSearchParams()
    if (value) next.set("q", value)
    navigate({ pathname: "/shop", search: next.toString() })
  }

  function submitSearch() {
    if (!onCatalog) {
      const next = new URLSearchParams()
      if (query) next.set("q", query)
      navigate({ pathname: "/shop", search: next.toString() })
      return
    }
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex h-16 items-center gap-2 sm:gap-4">
          <Logo />
          <div className="hidden min-w-0 flex-1 md:block">
            <SearchField
              id="desktop-search"
              value={query}
              onChange={writeQuery}
              onClear={() => writeQuery("")}
              onSubmit={submitSearch}
              prominent
            />
          </div>
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <NavLink
              to="/account"
              aria-label="Account"
              className="hidden h-11 w-11 place-items-center rounded-full text-ink hover:bg-sand min-[380px]:grid"
            >
              <UserRound className="h-5 w-5" aria-hidden="true" />
            </NavLink>
            <button
              type="button"
              onClick={openCart}
              aria-label={
                totalQuantity === 0
                  ? "Open cart"
                  : `Open cart, ${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`
              }
              className="relative grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-sand"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {totalQuantity > 0 ? (
                <span
                  key={totalQuantity}
                  className="badge-pop absolute top-1 right-1 grid h-5 min-w-5 place-items-center rounded-full bg-pine px-1 text-[11px] font-semibold text-white"
                >
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-sand lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="pb-3 md:hidden">
          <SearchField
            id="mobile-search"
            value={query}
            onChange={writeQuery}
            onClear={() => writeQuery("")}
            onSubmit={submitSearch}
            prominent
          />
        </div>
        <nav className="hidden items-center gap-1 border-t border-line lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => navClass(isActive)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
