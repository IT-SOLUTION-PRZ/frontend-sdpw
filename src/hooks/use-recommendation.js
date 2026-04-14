import { useCallback, useState } from "react"

const RECOMMEND_URL = "http://localhost:8000/api/v1/recommend/"

async function parseResponseJson(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export function useRecommendation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submitRecommendation = useCallback(async (payload) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(RECOMMEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await parseResponseJson(response)

      if (!response.ok) {
        const message =
          result?.detail ||
          result?.message ||
          "Brak dopasowania w bazie dla tych parametrów."

        setError(message)
        return { error: true, message }
      }

      return { ...(result || {}), success: true }
    } catch {
      const message = "Problemy z połączeniem. Spróbuj ponownie później."
      setError(message)
      return { error: true, message }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    submitRecommendation,
    loading,
    error,
  }
}
