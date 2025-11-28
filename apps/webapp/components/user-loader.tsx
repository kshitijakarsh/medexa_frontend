// // "use client"

// // import { useEffect } from "react"
// // import { useQuery } from "@tanstack/react-query"
// // import { useUserStore } from "@/store/useUserStore"
// // import { createUserApiClient } from "@/lib/api/administration/user-api-client"

// // export function UserLoader() {
// //   const setUser = useUserStore((s) => s.setUser)
// //   const setLoading = useUserStore((s) => s.setLoading)

// //   const userApi = createUserApiClient({ authToken: "" })

// //   useQuery({
// //     queryKey: ["current-user"],
// //     queryFn: async () => {
// //       const res = await userApi.getCurrentUser()
// //       return res.data.data
// //     },
// //     onSuccess: (user) => {
// //       setUser(user)
// //       setLoading(false)
// //     },
// //     onError: () => {
// //       setUser(null)
// //       setLoading(false)
// //     },
// //     retry: false,
// //   })

// //   return null // no UI
// // }



// "use client"

// import { useEffect } from "react"
// import { useQuery } from "@tanstack/react-query"
// import { useUserStore } from "@/store/useUserStore"
// import { createUserApiClient } from "@/lib/api/administration/user-api-client"

// export function UserLoader() {
//   const setUser = useUserStore((s) => s.setUser)
//   const setLoading = useUserStore((s) => s.setLoading)

//   const userApi = createUserApiClient({ authToken: "" })

//   const {
//     data: currentUser,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["current-user"],
//     queryFn: async () => {
//       const res = await userApi.getCurrentUser()
//       return res.data.data
//     },
//     retry: false,
//   })

//   // Update loading state
//   useEffect(() => {
//     setLoading(isLoading)
//   }, [isLoading, setLoading])

//   // Update user on success
//   useEffect(() => {
//     if (currentUser) {
//       setUser(currentUser)
//     }
//   }, [currentUser, setUser])

//   // Clear user on error
//   useEffect(() => {
//     if (isError) {
//       setUser(null)
//     }
//   }, [isError, setUser])

//   return null
// }


"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/useUserStore"
import { createUserApiClient } from "@/lib/api/administration/user-api-client"
import { logoutCognitoUser } from "@/app/utils/auth"   // <-- your logout function
import { useLocaleRedirect } from "@/app/utils/redirect"

export function UserLoader() {
    const router = useRouter()
    const { redirectToLogin } = useLocaleRedirect()


    const setUser = useUserStore((s) => s.setUser)
    const setLoading = useUserStore((s) => s.setLoading)

    const userApi = createUserApiClient({ authToken: "" })

    const {
        data: currentUser,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const res = await userApi.getCurrentUser()
            return res.data.data
        },
        retry: false,   // do NOT retry invalid tokens
    })

    // Always update loading status
    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading, setLoading])

    // On success → save user
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser)
        }
    }, [currentUser, setUser])

    // On error → force logout and redirect
    useEffect(() => {
        if (isError) {
            console.error("User load error:", error)

            setUser(null)  // clear Zustand user
            setLoading(false)

            logoutCognitoUser()      // <-- clear Cognito session
            redirectToLogin()
        }
    }, [isError, error, setUser, setLoading, router])

    return null
}
