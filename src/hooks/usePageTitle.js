import { useEffect } from "react"

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | CareBridge Pharmacy`
      : "CareBridge Pharmacy | Everyday OTC Essentials"
  }, [title])
}
