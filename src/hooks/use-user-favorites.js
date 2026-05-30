import { useCallback, useEffect, useState } from "react"
import { API_BASE_URL } from "@/lib/api-config"
import { authFetch } from "@/lib/auth-fetch"

const FAVORITES_URL = `${API_BASE_URL}/api/v1/favorite/get/`

export function useUserFavorites() {
  const [favorites, setFavorites] = useState({ favList: [] })
  const [isLoading, setIsLoading] = useState(true)

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await authFetch(FAVORITES_URL)
      if (response.ok) {
        const data = await response.json()
        setFavorites(data)
      }
    } catch (error) {
      console.error("Błąd pobierania ulubionych:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const removeFavorite = useCallback(async (id) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/api/v1/favorite/${id}/`, {
        method: "DELETE",
      })
      if (!response.ok) {
        return { success: false, message: "Nie udało się usunąć zestawu." }
      }
      setFavorites((prev) => ({
        favList: (prev.favList ?? []).filter((item) => item.id !== id),
      }))
      return { success: true }
    } catch {
      return { success: false, message: "Błąd połączenia z serwerem." }
    }
  }, [])

  return { favorites, isLoading, removeFavorite, refetch: fetchFavorites }
}
