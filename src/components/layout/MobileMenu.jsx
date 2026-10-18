import { NavLink } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import Drawer from "../common/Drawer"
import { cn } from "../../utils/cn"

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" },
  { to: "/account", label: "Account" },
  { to: "/contact", label: "Contact" },
]

export default function MobileMenu({ open, onClose }) {
  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="left">
      <nav id="mobile-menu" aria-label="Mobile" className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex min-h-12 items-center justify-between rounded-2xl px-3 text-base font-medium",
                isActive ? "bg-pine-soft text-pine" : "text-ink hover:bg-sand",
              )
            }
          >
            {link.label}
            <ChevronRight className="h-4 w-4 text-muted" aria-hidden="true" />
          </NavLink>
        ))}
      </nav>
    </Drawer>
  )
}
