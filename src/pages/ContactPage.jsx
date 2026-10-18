import { useState } from "react"
import { CircleCheck, Mail, MapPin, Phone } from "lucide-react"
import { usePageTitle } from "../hooks/usePageTitle"

const initial = { name: "", email: "", message: "" }

export default function ContactPage() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  usePageTitle("Contact")

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSent(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = "Enter a name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter an email address."
    if (form.message.trim().length < 8) nextErrors.message = "Enter a short message."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSent(true)
    setForm(initial)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-pine uppercase">Contact</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Demo desk</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Use this form to see validation. Messages stay in the browser and are not delivered.
        </p>
        <ul className="mt-8 space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-pine" aria-hidden="true" />
            <span>hello@carebridge.example</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-pine" aria-hidden="true" />
            <span>(000) 555-0199, not a monitored line</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-pine" aria-hidden="true" />
            <span>418 Harbor Lane, Suite 200, Portland, OR. Demonstration address.</span>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-6">
        {sent ? (
          <p role="status" className="mb-5 flex items-start gap-2 rounded-2xl bg-pine-soft px-4 py-3 text-sm text-pine">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            This demonstration does not send messages. Nothing was transmitted.
          </p>
        ) : null}
        <div className="space-y-4">
          <Field label="Name" name="name" value={form.name} error={errors.name} onChange={updateField} autoComplete="name" />
          <Field label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={updateField} autoComplete="email" />
          <label className="block text-sm font-semibold" htmlFor="message">
            Message
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={updateField}
              rows={5}
              className="mt-2 w-full rounded-2xl border border-line px-3 py-3 text-base font-normal"
            />
          </label>
          {errors.message ? <p className="text-sm text-clay-deep">{errors.message}</p> : null}
        </div>
        <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-pine text-sm font-semibold text-white hover:bg-pine-deep sm:w-auto sm:px-6">
          Submit message
        </button>
      </form>
    </div>
  )
}

function Field({ label, name, value, onChange, error, type = "text", autoComplete }) {
  return (
    <div>
      <label className="block text-sm font-semibold" htmlFor={name}>
        {label}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          className="mt-2 h-12 w-full rounded-2xl border border-line px-3 text-base font-normal"
        />
      </label>
      {error ? <p className="mt-1 text-sm text-clay-deep">{error}</p> : null}
    </div>
  )
}
