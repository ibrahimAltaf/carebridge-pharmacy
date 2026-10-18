import { Sparkles, Sun } from "lucide-react"

const messages = [
  { icon: Sparkles, text: "Everyday wellness essentials" },
  { icon: null, text: "Free standard delivery on demo orders over $35" },
  { icon: Sun, text: "Simple shopping for everyday care" },
  { icon: Sparkles, text: "Explore vitamins, first aid & wellness" },
]

function TickerRow({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {messages.map((message) => {
        const Icon = message.icon
        return (
          <span key={message.text} className="flex items-center">
            <span className="inline-flex items-center gap-2 px-6 text-[13px] font-medium">
              {Icon ? <Icon className="h-3.5 w-3.5 text-pine" aria-hidden="true" /> : null}
              {message.text}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
          </span>
        )
      })}
    </div>
  )
}

export default function PromoTicker() {
  return (
    <div className="ticker border-b border-white/10 bg-ink text-white">
      <p className="hidden px-4 py-2 text-center text-xs font-medium motion-reduce:block">
        Everyday wellness essentials
      </p>
      <div className="overflow-hidden motion-reduce:hidden">
        <div className="ticker-track flex w-max py-2">
          <TickerRow />
          <TickerRow hidden />
        </div>
      </div>
    </div>
  )
}
