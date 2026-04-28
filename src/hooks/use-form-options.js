import { useCallback, useEffect, useState } from "react"

import { API_BASE_URL } from "@/lib/api-config"

const FORM_OPTIONS_URL = `${API_BASE_URL}/api/v1/form-options/`

function mapApiOptionsToFields(data) {
  return [
    {
      id: "fish_species_id",
      label: "Gatunek ryby",
      placeholder: "Wybierz gatunek ryby...",
      options: (data.fish_species || []).map((item) => ({ value: String(item.id), label: item.name })),
    },
    {
      id: "water_type_id",
      label: "Typ zbiornika",
      placeholder: "Wybierz typ zbiornika...",
      options: (data.water_types || []).map((item) => ({ value: String(item.id), label: item.name })),
    },
    {
      id: "season_id",
      label: "Pora roku",
      placeholder: "Wybierz porę roku...",
      options: (data.seasons || []).map((item) => ({ value: String(item.id), label: item.name })),
    },
    {
      id: "time_of_day_id",
      label: "Pora dnia",
      placeholder: "Wybierz porę dnia...",
      options: (data.times_of_day || []).map((item) => ({ value: String(item.id), label: item.name })),
    },
    {
      id: "water_clarity_id",
      label: "Klarowność wody",
      placeholder: "Wybierz klarowność wody...",
      options: (data.water_clarities || []).map((item) => ({ value: String(item.id), label: item.name })),
    },
    {
      id: "water_temperature_id",
      label: "Temperatura wody",
      placeholder: "Wybierz temperaturę wody...",
      options: (data.water_temperatures || []).map((item) => ({ value: String(item.id), label: item.name })),
    },
  ]
}

async function mapApiErrorMessage(response) {
  try {
    const data = await response.json()
    return data?.detail || data?.message || ""
  } catch {
    try {
      return await response.text()
    } catch {
      return ""
    }
  }
}

export function useFormOptions() {
  const [dynamicFields, setDynamicFields] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadOptions = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(FORM_OPTIONS_URL)

      if (!response.ok) {
        const apiMessage = await mapApiErrorMessage(response)
        throw new Error(apiMessage || "Nie udało się pobrać opcji formularza. Spróbuj ponownie.")
      }

      const data = await response.json()
      setDynamicFields(mapApiOptionsToFields(data))
    } catch (fetchError) {
      console.error("Błąd pobierania danych z API:", fetchError)
      setDynamicFields([])
      setError("Nie udało się połączyć z serwerem.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadOptions()
  }, [loadOptions])

  return {
    dynamicFields,
    loading,
    fetchError: error,
    retry: loadOptions,
  }
}