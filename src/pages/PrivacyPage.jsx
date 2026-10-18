import { usePageTitle } from "../hooks/usePageTitle"

export default function PrivacyPage() {
  usePageTitle("Privacy")

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.16em] text-pine uppercase">Privacy</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">Privacy for this demonstration</h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-ink">
        <p>
          CareBridge does not operate an account system and does not ask for health information. Product browsing happens in your browser.
        </p>
        <p>
          The shopping cart is stored locally under the key <span className="font-medium">carebridge-cart</span>. That data stays on your device until you clear the cart, clear site data, or use a browser that does not keep storage.
        </p>
        <p>
          The contact form does not send messages to a server. Anything typed there remains in the page until you leave it.
        </p>
        <p>
          This page is a demonstration notice, not a privacy policy for a licensed pharmacy or a covered health service.
        </p>
      </div>
    </article>
  )
}
