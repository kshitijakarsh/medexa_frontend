import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { PaymentConfigResponse } from "@/lib/api/payment"
import type { License } from "@/lib/api/license"
import type { Document } from "@/lib/api/regulatory"

export type StepStatus = "idle" | "saved" | "skipped"

interface ModulesState {
  selectedIds: string[]
  status: StepStatus
}

interface PaymentState {
  items: PaymentConfigResponse[]
  status: StepStatus
}

interface LicenceState {
  items: License[]
  status: StepStatus
}

interface RegulatoryState {
  items: Document[]
  status: StepStatus
}

interface OnboardingState {
  modules: ModulesState
  setModules: (selectedIds: string[]) => void
  saveModules: () => void
  skipModules: () => void
  resetModules: () => void
  payment: PaymentState
  setPaymentItems: (items: PaymentConfigResponse[]) => void
  savePayment: () => void
  skipPayment: () => void
  resetPayment: () => void
  licence: LicenceState
  setLicenceItems: (items: License[]) => void
  saveLicence: () => void
  skipLicence: () => void
  resetLicence: () => void
  regulatory: RegulatoryState
  setRegulatoryItems: (items: Document[]) => void
  saveRegulatory: () => void
  skipRegulatory: () => void
  resetRegulatory: () => void
  resetAll: () => void
}

const initialModulesState: ModulesState = {
  selectedIds: [],
  status: "idle",
}

const initialPaymentState: PaymentState = {
  items: [],
  status: "idle",
}

const initialLicenceState: LicenceState = {
  items: [],
  status: "idle",
}

const initialRegulatoryState: RegulatoryState = {
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

      setPaymentItems: (items: PaymentConfigResponse[]) =>
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

      licence: initialLicenceState,

      setLicenceItems: (items: License[]) =>
        set((state) => ({
          licence: {
            ...state.licence,
            items,
          },
        })),

      saveLicence: () =>
        set((state) => ({
          licence: {
            ...state.licence,
            status: "saved",
          },
        })),

      skipLicence: () =>
        set((state) => ({
          licence: {
            ...state.licence,
            status: "skipped",
          },
        })),

      resetLicence: () =>
        set({
          licence: initialLicenceState,
        }),

      regulatory: initialRegulatoryState,

      setRegulatoryItems: (items: Document[]) =>
        set((state) => ({
          regulatory: {
            ...state.regulatory,
            items,
          },
        })),

      saveRegulatory: () =>
        set((state) => ({
          regulatory: {
            ...state.regulatory,
            status: "saved",
          },
        })),

      skipRegulatory: () =>
        set((state) => ({
          regulatory: {
            ...state.regulatory,
            status: "skipped",
          },
        })),

      resetRegulatory: () =>
        set({
          regulatory: initialRegulatoryState,
        }),

      resetAll: () =>
        set({
          modules: initialModulesState,
          payment: initialPaymentState,
          licence: initialLicenceState,
          regulatory: initialRegulatoryState,
        }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
