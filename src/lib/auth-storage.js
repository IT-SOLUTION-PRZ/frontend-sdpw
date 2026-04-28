const ACCESS_KEY = "ryby_auth_access"
const REFRESH_KEY = "ryby_auth_refresh"

export const getAccessToken = () => sessionStorage.getItem(ACCESS_KEY)

export const getRefreshToken = () => sessionStorage.getItem(REFRESH_KEY)

/** Zapisuje access; refresh aktualizowany tylko gdy przekazany (np. przy logowaniu). */
export const setTokens = (access, refresh) => {
  sessionStorage.setItem(ACCESS_KEY, access)
  if (refresh !== undefined && refresh !== null && refresh !== "") {
    sessionStorage.setItem(REFRESH_KEY, refresh)
  }
}

export const clearTokens = () => {
  sessionStorage.removeItem(ACCESS_KEY)
  sessionStorage.removeItem(REFRESH_KEY)
}
