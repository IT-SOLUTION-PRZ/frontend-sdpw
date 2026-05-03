import { useEffect } from "react"

import { useAuthStore } from "@/stores/auth-store"

export const useCurrentUser = () => {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth)
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if (hasCheckedAuth) {
      return
    }

    fetchCurrentUser()
  }, [fetchCurrentUser, hasCheckedAuth])

  return {
    user,
    loading: isLoading,
    logout,
  }
}
