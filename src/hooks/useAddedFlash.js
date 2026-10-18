import { useEffect, useRef, useState } from "react"

export function useAddedFlash() {
  const [added, setAdded] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function flash() {
    setAdded(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), 1400)
  }

  return [added, flash]
}
