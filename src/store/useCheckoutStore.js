import { create } from "zustand"
import { persist } from "zustand/middleware"
import { emptyDraft } from "../utils/checkout"

export const useCheckoutStore = create(
  persist(
    (set) => ({
      draft: emptyDraft,
      lastOrder: null,
      updateDraft: (partial) =>
        set((state) => ({
          draft: { ...state.draft, ...partial },
        })),
      saveOrder: (order) => set({ lastOrder: order }),
    }),
    {
      name: "carebridge-checkout",
      partialize: (state) => ({ draft: state.draft, lastOrder: state.lastOrder }),
    },
  ),
)
