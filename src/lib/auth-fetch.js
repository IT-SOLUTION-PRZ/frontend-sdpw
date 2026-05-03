import { API_BASE_URL } from "@/lib/api-config"
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/auth-storage"

const REFRESH_URL = `${API_BASE_URL}/api/v1/auth/token/refresh/`

const tryRefresh = async () => {
  const refresh = getRefreshToken()
  if (!refresh) {
    return false
  }

  try {
    const response = await fetch(REFRESH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    })

    if (!response.ok) {
      clearTokens()
      return false
    }

    const data = await response.json()
    if (data.access) {
      setTokens(data.access)
      return true
    }

    clearTokens()
    return false
  } catch {
    clearTokens()
    return false
  }
}

/**
 * fetch z nagłówkiem Bearer (jeśli jest token) oraz jedną próbą odświeżenia access przy 401.
 */
export const authFetch = async (url, options = {}) => {
  const headers = new Headers(options.headers ?? {})

  const access = getAccessToken()
  if (access) {
    headers.set("Authorization", `Bearer ${access}`)
  }

  const body = options.body
  if (body !== undefined && typeof body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  let response = await fetch(url, { ...options, headers })

  if (response.status === 401 && getRefreshToken()) {
    const refreshed = await tryRefresh()
    if (refreshed) {
      headers.set("Authorization", `Bearer ${getAccessToken()}`)
      response = await fetch(url, { ...options, headers })
    }
  }

  return response
}
