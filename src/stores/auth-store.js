import { create } from "zustand"

import { API_BASE_URL } from "@/lib/api-config"
import { clearTokens, getAccessToken, setTokens } from "@/lib/auth-storage"
import { authFetch } from "@/lib/auth-fetch"
import { formatApiError } from "@/lib/format-api-error"

const AUTH_TOKEN_URL = `${API_BASE_URL}/api/v1/auth/token/`
const AUTH_REGISTER_URL = `${API_BASE_URL}/api/v1/auth/register/`
const AUTH_ME_URL = `${API_BASE_URL}/api/v1/auth/me/`

const parseJson = async (response) => response.json().catch(() => ({}))

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: Boolean(getAccessToken()),
  hasCheckedAuth: false,
  loginError: "",
  registerError: "",
  loginSubmitting: false,
  registerSubmitting: false,

  clearAuthErrors: () => {
    set({ loginError: "", registerError: "" })
  },

  fetchCurrentUser: async () => {
    if (!getAccessToken()) {
      set({ user: null, isLoading: false, hasCheckedAuth: true })
      return null
    }

    set({ isLoading: true })

    try {
      const response = await authFetch(AUTH_ME_URL)
      const result = await parseJson(response)

      if (!response.ok) {
        set({ user: null, isLoading: false, hasCheckedAuth: true })
        return null
      }

      set({ user: result, isLoading: false, hasCheckedAuth: true })
      return result
    } catch {
      set({ user: null, isLoading: false, hasCheckedAuth: true })
      return null
    }
  },

  login: async ({ email, password }) => {
    set({ loginError: "", loginSubmitting: true })

    try {
      const response = await fetch(AUTH_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const result = await parseJson(response)

      if (!response.ok) {
        set({ loginError: formatApiError(result), loginSubmitting: false })
        return false
      }

      if (!result.access || !result.refresh) {
        set({ loginError: "Serwer nie zwrócił tokenów logowania.", loginSubmitting: false })
        return false
      }

      setTokens(result.access, result.refresh)
      await get().fetchCurrentUser()
      set({ loginSubmitting: false })
      return true
    } catch {
      set({ loginError: "Nie udało się połączyć z serwerem.", loginSubmitting: false })
      return false
    }
  },

  register: async ({ username, email, password }) => {
    set({ registerError: "", registerSubmitting: true })

    try {
      const response = await fetch(AUTH_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
      const result = await parseJson(response)

      if (!response.ok) {
        set({ registerError: formatApiError(result), registerSubmitting: false })
        return false
      }

      if (!result.access || !result.refresh) {
        set({ registerError: "Serwer nie zwrócił tokenów logowania.", registerSubmitting: false })
        return false
      }

      setTokens(result.access, result.refresh)
      set({ user: result.user ?? null, hasCheckedAuth: true, registerSubmitting: false })
      return true
    } catch {
      set({ registerError: "Nie udało się połączyć z serwerem.", registerSubmitting: false })
      return false
    }
  },

  logout: () => {
    clearTokens()
    set({
      user: null,
      isLoading: false,
      hasCheckedAuth: true,
      loginError: "",
      registerError: "",
      loginSubmitting: false,
      registerSubmitting: false,
    })
  },
}))
