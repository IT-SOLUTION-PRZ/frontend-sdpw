const ACCESS_KEY = "ryby_auth_access"
const REFRESH_KEY = "ryby_auth_refresh"

const getValidToken = (key) => {
  const token = sessionStorage.getItem(key)
  if (!token || token === "null" || token === "undefined" || token.trim() === "") {
    return null
  }
  return token
}

export const getAccessToken = () => getValidToken(ACCESS_KEY)

export const getRefreshToken = () => getValidToken(REFRESH_KEY)

/** Zapisuje access; refresh aktualizowany tylko gdy przekazany (np. przy logowaniu). */
export const setTokens = (access, refresh) => {
  // Zabezpieczenie przed zapisem słów "null" / "undefined"
  if (access && access !== "null" && access !== "undefined") {
    sessionStorage.setItem(ACCESS_KEY, access)
  }
  
  if (refresh && refresh !== "null" && refresh !== "undefined") {
    sessionStorage.setItem(REFRESH_KEY, refresh)
  }
}

export const clearTokens = () => {
  sessionStorage.removeItem(ACCESS_KEY)
  sessionStorage.removeItem(REFRESH_KEY)
}