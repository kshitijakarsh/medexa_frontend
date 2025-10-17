import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type StepStatus = "idle" | "saved" | "skipped"

interface ModulesState {
  selectedIds: string[]
  status: StepStatus
}

interface OnboardingState {
  modules: ModulesState
  setModules: (selectedIds: string[]) => void
  saveModules: () => void
  skipModules: () => void
  resetModules: () => void
}

const initialModulesState: ModulesState = {
  selectedIds: [],
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
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
