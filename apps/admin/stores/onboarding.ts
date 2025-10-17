import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { PaymentConfig } from "@/lib/api/mock/payment"

export type StepStatus = "idle" | "saved" | "skipped"

interface ModulesState {
  selectedIds: string[]
  status: StepStatus
}

interface PaymentState {
  items: PaymentConfig[]
  status: StepStatus
}

interface OnboardingState {
  modules: ModulesState
  setModules: (selectedIds: string[]) => void
  saveModules: () => void
  skipModules: () => void
  resetModules: () => void
  payment: PaymentState
  setPaymentItems: (items: PaymentConfig[]) => void
  savePayment: () => void
  skipPayment: () => void
  resetPayment: () => void
}

const initialModulesState: ModulesState = {
  selectedIds: [],
  status: "idle",
}

const initialPaymentState: PaymentState = {
  items: [],
  status: "idle",
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      modules: initialModulesState,
      
      setModules: (selectedIds: string[]) =>
        set((state) => ({
          modules: {
            ...state.modules,
            selectedIds,
          },
        })),
      
      saveModules: () =>
        set((state) => ({
          modules: {
            ...state.modules,
            status: "saved",
          },
        })),
      
      skipModules: () =>
        set((state) => ({
          modules: {
            ...state.modules,
            status: "skipped",
          },
        })),
      
      resetModules: () =>
        set({
          modules: initialModulesState,
        }),
      
      payment: initialPaymentState,
      
      setPaymentItems: (items: PaymentConfig[]) =>
        set((state) => ({
          payment: {
            ...state.payment,
            items,
          },
        })),
      
      savePayment: () =>
        set((state) => ({
          payment: {
            ...state.payment,
            status: "saved",
          },
        })),
      
      skipPayment: () =>
        set((state) => ({
          payment: {
            ...state.payment,
            status: "skipped",
          },
        })),
      
      resetPayment: () =>
        set({
          payment: initialPaymentState,
        }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
