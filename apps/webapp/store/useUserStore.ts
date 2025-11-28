// // store/useUserStore.ts
// import { create } from "zustand"
// import { CurrentUser } from "@/lib/api/user/user.api"

// interface UserState {
//   user: CurrentUser | null
//   loading: boolean
//   setUser: (data: CurrentUser) => void
//   setLoading: (val: boolean) => void
//   hasPermission: (permName: string) => boolean
//   hasModule: (moduleKey: string) => boolean
// }

// export const useUserStore = create<UserState>((set, get) => ({
//   user: null,
//   loading: true,

//   setUser: (data) => set({ user: data }),
//   setLoading: (val) => set({ loading: val }),

//   /** Check if user has permission like "create_patient" */
//   hasPermission: (permName) => {
//     const state = get()
//     return (
//       state.user?.role?.permissions?.some(
//         (p) => p.permission.name === permName
//       ) || false
//     )
//   },

//   /** Check if user has module access */
//   hasModule: (moduleKey) => {
//     const state = get()
//     return (
//       state.user?.role?.permissions?.some(
//         (p) => p.permission.module_key === moduleKey
//       ) || false
//     )
//   },
// }))



// store/useUserStore.ts
import { create } from "zustand";
import { CurrentUser } from "@/lib/api/administration/user-api-client";
// import type { CurrentUser } from "@/lib/api/user/user.api"

interface UserState {
    user: CurrentUser | null
    loading: boolean

    setUser: (data: CurrentUser | null) => void
    setLoading: (val: boolean) => void

    hasPermission: (permName: string) => boolean
    hasModule: (moduleKey: string) => boolean
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    loading: true,

    setUser: (data) => set({ user: data }),
    setLoading: (val) => set({ loading: val }),

    hasPermission: (permName) => {
        const user = get().user
        if (!user) return false

        return user.role?.permissions?.some(
            (p) => p.permission.name === permName
        ) || false
    },

    hasModule: (moduleKey) => {
        const user = get().user
        if (!user) return false

        return user.role?.permissions?.some(
            (p) => p.permission.module_key === moduleKey
        ) || false
    },
}))
