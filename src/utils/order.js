import { toCents } from "./format"

export const shippingMethods = [
  {
    id: "standard",
    name: "Standard Delivery",
    eta: "3–5 business days",
    price: 0,
  },
  {
    id: "express",
    name: "Express Delivery",
    eta: "1–2 business days",
    price: 7.99,
  },
]

export function createDemoOrderNumber() {
  return `CB-${10000 + Math.floor(Math.random() * 90000)}`
}

export function demoTimestamp() {
  return new Date().toISOString()
}

export function getShippingMethod(id) {
  return shippingMethods.find((method) => method.id === id) ?? shippingMethods[0]
}

export function estimateTax(subtotal) {
  return Math.round(toCents(subtotal) * 0.0625) / 100
}

export function orderTotal(subtotal, shippingPrice) {
  const tax = estimateTax(subtotal)
  const total = (toCents(subtotal) + toCents(shippingPrice) + toCents(tax)) / 100
  return { tax, shipping: shippingPrice, total }
}
