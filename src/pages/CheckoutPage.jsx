import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CheckoutProgress from "../components/checkout/CheckoutProgress"
import OrderSummary from "../components/checkout/OrderSummary"
import { US_STATES } from "../data/states"
import { useCartDetails } from "../hooks/useCartDetails"
import { usePageTitle } from "../hooks/usePageTitle"
import { useCartStore } from "../store/useCartStore"
import { useCheckoutStore } from "../store/useCheckoutStore"
import { cn } from "../utils/cn"
import {
  digitsOnly,
  formatCardNumber,
  formatExpiration,
  validateContact,
  validatePayment,
} from "../utils/checkout"
import { formatPrice } from "../utils/format"
import { createDemoOrderNumber, demoTimestamp, getShippingMethod, orderTotal, shippingMethods } from "../utils/order"

const emptyPayment = {
  method: "card",
  cardNumber: "",
  expiration: "",
  cvv: "",
  cardName: "",
}

function inputClass(invalid) {
  return cn(
    "h-11 w-full rounded-lg border bg-white px-3 text-sm text-ink transition outline-none focus:border-pine",
    invalid ? "border-red-400" : "border-line",
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error mt-1 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function CheckoutPage() {
  usePageTitle("Checkout")
  const navigate = useNavigate()
  const { lines, subtotal, totalQuantity } = useCartDetails()
  const clearCart = useCartStore((state) => state.clearCart)
  const draft = useCheckoutStore((state) => state.draft)
  const updateDraft = useCheckoutStore((state) => state.updateDraft)
  const saveOrder = useCheckoutStore((state) => state.saveOrder)
  const [step, setStep] = useState("information")
  const [payment, setPayment] = useState(emptyPayment)
  const [errors, setErrors] = useState({})

  const method = getShippingMethod(draft.shippingMethod)
  const totals = orderTotal(subtotal, method.price)
  const summaryLines = lines.map((line) => ({
    key: line.productId,
    name: line.product.name,
    quantity: line.quantity,
    total: line.total,
    image: line.product.image,
  }))

  function setField(key, value) {
    updateDraft({ [key]: value })
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function setPay(key, value) {
    setPayment((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function continueToReview(event) {
    event.preventDefault()
    const nextErrors = { ...validateContact(draft), ...validatePayment(payment) }
    setErrors(nextErrors)
    const first = Object.keys(nextErrors)[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    setStep("review")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function placeOrder() {
    saveOrder({
      number: createDemoOrderNumber(),
      placedAt: demoTimestamp(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      destination: {
        firstName: draft.firstName.trim(),
        lastName: draft.lastName.trim(),
        address: draft.address.trim(),
        apartment: draft.apartment.trim(),
        city: draft.city.trim(),
        state: draft.state,
        zip: draft.zip.trim(),
      },
      shippingMethod: method,
      paymentLabel: payment.method === "paypal" ? "PayPal (demo)" : "Credit / Debit Card (demo)",
      lines: lines.map((line) => ({
        id: line.productId,
        name: line.product.name,
        quantity: line.quantity,
        total: line.total,
        image: line.product.image,
      })),
      itemCount: totalQuantity,
      subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
    })
    clearCart()
    navigate("/order-success")
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <CheckoutProgress current="information" />
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-ink">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted">Add a product before starting demo checkout.</p>
        <Link
          to="/shop"
          className="press mt-6 inline-flex h-11 items-center rounded-lg bg-pine px-5 text-sm font-semibold text-white hover:bg-pine-deep"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <CheckoutProgress current={step === "review" ? "review" : "information"} />
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {step === "review" ? "Review order" : "Checkout"}
      </h1>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          {step === "information" ? (
            <form className="space-y-8" onSubmit={continueToReview} noValidate>
              <section>
                <h2 className="text-lg font-semibold text-ink">Contact information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field id="email" label="Email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={draft.email}
                      onChange={(event) => setField("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={inputClass(errors.email)}
                    />
                  </Field>
                  <Field id="phone" label="Phone" error={errors.phone}>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={draft.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={inputClass(errors.phone)}
                    />
                  </Field>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-ink">Shipping information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field id="firstName" label="First name" error={errors.firstName}>
                    <input
                      id="firstName"
                      autoComplete="given-name"
                      value={draft.firstName}
                      onChange={(event) => setField("firstName", event.target.value)}
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      className={inputClass(errors.firstName)}
                    />
                  </Field>
                  <Field id="lastName" label="Last name" error={errors.lastName}>
                    <input
                      id="lastName"
                      autoComplete="family-name"
                      value={draft.lastName}
                      onChange={(event) => setField("lastName", event.target.value)}
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      className={inputClass(errors.lastName)}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="address" label="Address" error={errors.address}>
                      <input
                        id="address"
                        autoComplete="address-line1"
                        value={draft.address}
                        onChange={(event) => setField("address", event.target.value)}
                        aria-invalid={Boolean(errors.address)}
                        aria-describedby={errors.address ? "address-error" : undefined}
                        className={inputClass(errors.address)}
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field id="apartment" label="Apartment / suite (optional)" error={null}>
                      <input
                        id="apartment"
                        autoComplete="address-line2"
                        value={draft.apartment}
                        onChange={(event) => setField("apartment", event.target.value)}
                        className={inputClass(false)}
                      />
                    </Field>
                  </div>
                  <Field id="city" label="City" error={errors.city}>
                    <input
                      id="city"
                      autoComplete="address-level2"
                      value={draft.city}
                      onChange={(event) => setField("city", event.target.value)}
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={errors.city ? "city-error" : undefined}
                      className={inputClass(errors.city)}
                    />
                  </Field>
                  <Field id="state" label="State" error={errors.state}>
                    <select
                      id="state"
                      autoComplete="address-level1"
                      value={draft.state}
                      onChange={(event) => setField("state", event.target.value)}
                      aria-invalid={Boolean(errors.state)}
                      aria-describedby={errors.state ? "state-error" : undefined}
                      className={inputClass(errors.state)}
                    >
                      <option value="">Select a state</option>
                      {US_STATES.map(([code, name]) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="zip" label="ZIP code" error={errors.zip}>
                    <input
                      id="zip"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      value={draft.zip}
                      onChange={(event) => setField("zip", event.target.value)}
                      aria-invalid={Boolean(errors.zip)}
                      aria-describedby={errors.zip ? "zip-error" : undefined}
                      className={inputClass(errors.zip)}
                    />
                  </Field>
                </div>
              </section>

              <fieldset>
                <legend className="text-lg font-semibold text-ink">Shipping method</legend>
                <div className="mt-4 space-y-2">
                  {shippingMethods.map((option) => {
                    const selected = draft.shippingMethod === option.id
                    return (
                      <label
                        key={option.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 transition",
                          selected ? "border-pine bg-pine-soft" : "border-line bg-white hover:border-slate-300",
                        )}
                      >
                        <span className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            className="mt-1 h-4 w-4 accent-pine"
                            checked={selected}
                            onChange={() => setField("shippingMethod", option.id)}
                          />
                          <span>
                            <span className="block text-sm font-semibold text-ink">{option.name}</span>
                            <span className="block text-sm text-muted">{option.eta}</span>
                          </span>
                        </span>
                        <span className="text-sm font-semibold tabular-nums">
                          {option.price === 0 ? "Free" : formatPrice(option.price)}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-lg font-semibold text-ink">Payment</legend>
                <p className="mt-1 text-sm text-muted">Demo preview only. Card details are not saved or sent.</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    ["card", "Credit / Debit Card"],
                    ["paypal", "PayPal"],
                  ].map(([id, label]) => {
                    const selected = payment.method === id
                    return (
                      <label
                        key={id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-semibold transition",
                          selected ? "border-pine bg-pine-soft text-ink" : "border-line bg-white hover:border-slate-300",
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="h-4 w-4 accent-pine"
                          checked={selected}
                          onChange={() => setPay("method", id)}
                        />
                        {label}
                      </label>
                    )
                  })}
                </div>
                {errors.method ? <p className="field-error mt-2 text-xs text-red-700">{errors.method}</p> : null}
                {payment.method === "card" ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field id="cardNumber" label="Card number" error={errors.cardNumber}>
                        <input
                          id="cardNumber"
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="1234 5678 9012 3456"
                          value={payment.cardNumber}
                          onChange={(event) => setPay("cardNumber", formatCardNumber(event.target.value))}
                          aria-invalid={Boolean(errors.cardNumber)}
                          aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                          className={inputClass(errors.cardNumber)}
                        />
                      </Field>
                    </div>
                    <Field id="expiration" label="Expiration" error={errors.expiration}>
                      <input
                        id="expiration"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="MM/YY"
                        value={payment.expiration}
                        onChange={(event) => setPay("expiration", formatExpiration(event.target.value))}
                        aria-invalid={Boolean(errors.expiration)}
                        aria-describedby={errors.expiration ? "expiration-error" : undefined}
                        className={inputClass(errors.expiration)}
                      />
                    </Field>
                    <Field id="cvv" label="CVV" error={errors.cvv}>
                      <input
                        id="cvv"
                        inputMode="numeric"
                        autoComplete="off"
                        value={payment.cvv}
                        onChange={(event) => setPay("cvv", digitsOnly(event.target.value).slice(0, 4))}
                        aria-invalid={Boolean(errors.cvv)}
                        aria-describedby={errors.cvv ? "cvv-error" : undefined}
                        className={inputClass(errors.cvv)}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id="cardName" label="Name on card" error={errors.cardName}>
                        <input
                          id="cardName"
                          autoComplete="off"
                          value={payment.cardName}
                          onChange={(event) => setPay("cardName", event.target.value)}
                          aria-invalid={Boolean(errors.cardName)}
                          aria-describedby={errors.cardName ? "cardName-error" : undefined}
                          className={inputClass(errors.cardName)}
                        />
                      </Field>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 rounded-lg bg-sand px-4 py-3 text-sm text-muted">
                    PayPal is shown as a preview choice. No PayPal account is opened.
                  </p>
                )}
              </fieldset>

              <button
                type="submit"
                className="press inline-flex h-12 w-full items-center justify-center rounded-lg bg-pine text-sm font-semibold text-white transition hover:bg-pine-deep sm:w-auto sm:px-8"
              >
                Continue to review
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <section className="rounded-lg border border-line p-4 sm:p-5">
                <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Contact</h2>
                <p className="mt-2 text-sm text-ink">{draft.email}</p>
                <p className="text-sm text-ink">{draft.phone}</p>
              </section>
              <section className="rounded-lg border border-line p-4 sm:p-5">
                <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Shipping address</h2>
                <p className="mt-2 text-sm leading-6 text-ink">
                  {draft.firstName} {draft.lastName}
                  <br />
                  {draft.address}
                  {draft.apartment ? `, ${draft.apartment}` : ""}
                  <br />
                  {draft.city}, {draft.state} {draft.zip}
                </p>
              </section>
              <section className="rounded-lg border border-line p-4 sm:p-5">
                <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Shipping method</h2>
                <p className="mt-2 text-sm text-ink">
                  {method.name} · {method.eta} · {method.price === 0 ? "Free" : formatPrice(method.price)}
                </p>
              </section>
              <section className="rounded-lg border border-line p-4 sm:p-5">
                <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Payment</h2>
                <p className="mt-2 text-sm text-ink">
                  {payment.method === "paypal" ? "PayPal (demo)" : "Credit / Debit Card (demo)"}
                </p>
              </section>
              <section>
                <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Products</h2>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {lines.map((line) => (
                    <li key={line.productId} className="flex items-center justify-between gap-3 py-3 text-sm">
                      <span>
                        <span className="block font-medium">{line.product.name}</span>
                        <span className="text-muted">Qty {line.quantity}</span>
                      </span>
                      <span className="font-semibold tabular-nums">{formatPrice(line.total)}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <p className="text-sm text-muted">
                Placing this demo order does not charge a card or send an order to a pharmacy.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setStep("information")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="press inline-flex h-12 items-center justify-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-slate-300"
                >
                  Back to edit
                </button>
                <button
                  type="button"
                  onClick={placeOrder}
                  className="press inline-flex h-12 flex-1 items-center justify-center rounded-lg bg-pine px-5 text-sm font-semibold text-white transition hover:bg-pine-deep"
                >
                  Place demo order
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="lg:sticky lg:top-40">
          <OrderSummary
            lines={summaryLines}
            subtotal={subtotal}
            shipping={totals.shipping}
            tax={totals.tax}
            total={totals.total}
          />
        </div>
      </div>
    </div>
  )
}
