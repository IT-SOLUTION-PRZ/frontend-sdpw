import { useEffect, useState } from "react"
import { API_BASE_URL } from "@/lib/api-config"
import { authFetch } from "@/lib/auth-fetch"

// Dodałem slash na końcu - Django zazwyczaj go wymaga
const FAVORITES_URL = `${API_BASE_URL}/api/v1/favorite/get/`

export function useUserFavorites() {
  const [favorites, setFavorites] = useState({ favList: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchFavorites() {
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
    }

    fetchFavorites()
  }, [])

  return { favorites, isLoading }
}