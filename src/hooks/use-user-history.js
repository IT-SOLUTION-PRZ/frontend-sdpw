import { useCallback, useEffect, useState } from "react"

import { API_BASE_URL } from "@/lib/api-config"
import { authFetch } from "@/lib/auth-fetch"

const HISTORY_URL = `${API_BASE_URL}/api/v1/history/`

export function useUserHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authFetch(HISTORY_URL)
      
      if (!response.ok) {
        throw new Error("Brak dostępu lub błąd pobierania danych")
      }
      
      const data = await response.json()
      setHistory(data)
    } catch (err) {
      setError(err.message)
      setHistory([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  return { history, loading, error, refetch: fetchHistory }
}