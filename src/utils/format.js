export function toCents(amount) {
  return Math.round(Number(amount) * 100)
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value)
}

export function lineTotal(price, quantity) {
  return (toCents(price) * quantity) / 100
}
