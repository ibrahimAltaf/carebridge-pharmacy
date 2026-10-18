const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const zipPattern = /^\d{5}(-\d{4})?$/

export const emptyDraft = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  shippingMethod: "standard",
}

export function digitsOnly(value) {
  return value.replace(/\D/g, "")
}

export function formatCardNumber(value) {
  const digits = digitsOnly(value).slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

export function formatExpiration(value) {
  const digits = digitsOnly(value).slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function validateContact(draft) {
  const errors = {}
  if (!emailPattern.test(draft.email.trim())) errors.email = "Enter a valid email address."
  if (digitsOnly(draft.phone).length < 10) errors.phone = "Enter a 10-digit phone number."
  if (draft.firstName.trim().length < 1) errors.firstName = "Enter a first name."
  if (draft.lastName.trim().length < 1) errors.lastName = "Enter a last name."
  if (draft.address.trim().length < 4) errors.address = "Enter a street address."
  if (draft.city.trim().length < 2) errors.city = "Enter a city."
  if (!draft.state) errors.state = "Select a state."
  if (!zipPattern.test(draft.zip.trim())) errors.zip = "Enter a 5-digit ZIP code."
  if (!draft.shippingMethod) errors.shippingMethod = "Choose a delivery option."
  return errors
}

export function validatePayment(payment) {
  const errors = {}
  if (payment.method !== "card" && payment.method !== "paypal") {
    errors.method = "Choose a demo payment option."
    return errors
  }
  if (payment.method === "paypal") return errors

  const number = digitsOnly(payment.cardNumber)
  if (number.length < 13 || number.length > 16) errors.cardNumber = "Enter a 13 to 16 digit card number."
  if (payment.cardName.trim().length < 2) errors.cardName = "Enter the name on the card."

  const match = /^(\d{2})\/(\d{2})$/.exec(payment.expiration)
  if (!match) {
    errors.expiration = "Use MM/YY."
  } else {
    const month = Number(match[1])
    const year = 2000 + Number(match[2])
    const now = new Date()
    const current = now.getFullYear() * 12 + now.getMonth()
    const expiry = year * 12 + (month - 1)
    if (month < 1 || month > 12 || expiry < current) errors.expiration = "Enter a current or future date."
  }

  const cvv = digitsOnly(payment.cvv)
  if (cvv.length < 3 || cvv.length > 4) errors.cvv = "Enter a 3 or 4 digit CVV."
  return errors
}
