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

export function useTopsStatistics() {
  const [topFish, setTopFish] = useState(null)
  const [topBait, setTopBait] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchTops = async () => {
      try {
        const [fish, bait] = await Promise.all([
          fetchTopStatistic(TOP_FISH_URL),
          fetchTopStatistic(TOP_BAIT_URL),
        ])

        if (!isMounted) {
          return
        }

        setTopFish(fish)
        setTopBait(bait)
      } catch (error) {
        console.error("Błąd podczas pobierania najczęściej wybieranych pozycji:", error)
      }
    }

    fetchTops()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    topFish,
    topBait,
  }
}
