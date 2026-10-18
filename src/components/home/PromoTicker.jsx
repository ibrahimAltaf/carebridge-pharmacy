const messages = [
  "Everyday wellness essentials",
  "Free standard delivery on demo orders over $35",
  "Simple shopping for everyday care",
  "Explore vitamins, first aid & wellness",
]

function TickerRow({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {messages.map((text) => (
        <span key={text} className="flex items-center">
          <span className="px-6 text-[13px] font-medium">{text}</span>
          <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
        </span>
      ))}
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
