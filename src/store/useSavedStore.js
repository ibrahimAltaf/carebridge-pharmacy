import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useSavedStore = create(
  persist(
    (set, get) => ({
      ids: [],
      toggleSaved: (productId) => {
        const ids = get().ids
        set({
          ids: ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId],
        })
      },
    }),
    {
      name: "carebridge-saved",
      partialize: (state) => ({ ids: state.ids }),
    },
  ),
)
