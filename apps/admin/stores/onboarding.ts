import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { PaymentConfig } from "@/lib/api/mock/payment"
import type { LicenceHistory } from "@/lib/api/mock/licence"
import type { RegulatoryDoc } from "@/lib/api/mock/regulatory"

export type StepStatus = "idle" | "saved" | "skipped"

interface ModulesState {
  selectedIds: string[]
  status: StepStatus
}

interface PaymentState {
  items: PaymentConfig[]
  status: StepStatus
}

interface LicenceState {
  items: LicenceHistory[]
  status: StepStatus
}

interface RegulatoryState {
  items: RegulatoryDoc[]
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
  licence: LicenceState
  setLicenceItems: (items: LicenceHistory[]) => void
  saveLicence: () => void
  skipLicence: () => void
  resetLicence: () => void
  regulatory: RegulatoryState
  setRegulatoryItems: (items: RegulatoryDoc[]) => void
  saveRegulatory: () => void
  skipRegulatory: () => void
  resetRegulatory: () => void
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

      licence: initialLicenceState,

      setLicenceItems: (items: LicenceHistory[]) =>
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

      setRegulatoryItems: (items: RegulatoryDoc[]) =>
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
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
