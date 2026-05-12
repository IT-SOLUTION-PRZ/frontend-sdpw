import { useEffect, useState } from "react"

import { API_BASE_URL } from "@/lib/api-config"

const TOP_FISH_URL = `${API_BASE_URL}/api/v1/statistics/top-fish/`
const TOP_BAIT_URL = `${API_BASE_URL}/api/v1/statistics/top-bait/`

async function fetchTopStatistic(url) {
  const response = await fetch(url)

  if (!response.ok) {
    return null
  }

  return response.json()
}

function useTopStatistic(url, errorMessage) {
  const [topStatistic, setTopStatistic] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchTop = async () => {
      try {
        const statistic = await fetchTopStatistic(url)

        if (!isMounted) {
          return
        }

        setTopStatistic(statistic)
      } catch (error) {
        console.error(errorMessage, error)
      }
    }

    fetchTop()

    return () => {
      isMounted = false
    }
  }, [errorMessage, url])

  return topStatistic
}

export function useTopFish() {
  return useTopStatistic(TOP_FISH_URL, "Błąd podczas pobierania najczęściej wybieranej ryby:")
}

export function useTopBait() {
  return useTopStatistic(TOP_BAIT_URL, "Błąd podczas pobierania najczęściej wybieranej przynęty:")
}
