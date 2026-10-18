import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import PromoTicker from "../home/PromoTicker"
import CartDrawer from "../cart/CartDrawer"
import CartToast from "../cart/CartToast"
import { cn } from "../../utils/cn"

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function StickyChrome() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className={cn("sticky top-0 z-40 bg-white transition-shadow duration-300", scrolled && "shadow-[0_8px_24px_rgba(15,23,42,0.06)]")}>
      <PromoTicker />
      <Header />
    </div>
  )
}

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-foam focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <StickyChrome />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <CartToast />
    </div>
  )
}
