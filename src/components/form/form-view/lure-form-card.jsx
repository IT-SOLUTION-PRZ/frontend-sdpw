import React, { useState } from "react"
import { Fish, CloudSun, Compass } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { API_BASE_URL } from "@/lib/api-config";
import { FormCardContainer } from "@/components/form/form-card-container"
import { FormFieldSelect } from "@/components/form/form-view/form-field-select"
import { lureFormDefaultValues, lureFormSchema } from "@/components/form/form-view/lure-form-schema"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useFormOptions } from "@/hooks/use-form-options"
import { useRecommendation } from "@/hooks/use-recommendation"

export function LureFormCard({ onSubmitSuccess, onSubmitStart, initialValues }) {
  const { dynamicFields, loading, fetchError, retry } = useFormOptions()
  const { submitRecommendation, loading: recommendationLoading } = useRecommendation()
  const [cityInput, setCityInput] = useState("")
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState("")

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(lureFormSchema),
    defaultValues: {
      ...lureFormDefaultValues,
      ...initialValues,
    },
  })
  
const handleFetchWeather = async () => {
    if (!cityInput.trim()) return
    setWeatherLoading(true)
    setWeatherError("")
    setWeatherInfo(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/weather/?city=${encodeURIComponent(cityInput)}`)
      
      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych pogodowych.")
      }

      const data = await response.json()
      setWeatherInfo(data)

      const tempField = dynamicFields.find((field) => field.id === "water_temperature_id")
      
      if (tempField && tempField.options.length > 0) {
        const airTemp = data.temp

        let matchedOption = null

        if (airTemp < 10) {
          matchedOption = tempField.options.find((opt) => opt.label.toLowerCase().includes("zimn"))
        } else if (airTemp >= 10 && airTemp <= 18) {
          matchedOption = tempField.options.find((opt) => opt.label.toLowerCase().includes("umiark"))
        } else if (airTemp > 18 && airTemp <= 24) {
          matchedOption = tempField.options.find((opt) => opt.label.toLowerCase().includes("ciepła") && !opt.label.toLowerCase().includes("bardzo"))
        } else {
          matchedOption = tempField.options.find((opt) => opt.label.toLowerCase().includes("bardzo"))
        }

        if (matchedOption) {
          setValue("water_temperature_id", matchedOption.value, { shouldValidate: true })
        } else {
          setValue("water_temperature_id", tempField.options[0].value, { shouldValidate: true })
        }
      }
    } catch (err) {
      setWeatherError(err.message || "Błąd połączenia z backendem.")
    } finally {
      setWeatherLoading(false)
    }
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setWeatherError("Twoja przeglądarka nie obsługuje geolokalizacji.");
      return
    }

    setWeatherLoading(true)
    setWeatherError("")
    setWeatherInfo(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const response = await fetch(`${API_BASE_URL}/api/v1/weather/?lat=${latitude}&lon=${longitude}`)
          if (!response.ok) throw new Error("Błąd pobierania pogody.")
          const data = await response.json()
          
          setWeatherInfo(data)
          setCityInput(data.city_name || "") 

          const tempField = dynamicFields.find((field) => field.id === "water_temperature_id")
          if (tempField && tempField.options.length > 0) {
            const airTemp = data.temp
            let matchedOption = null

            if (airTemp <= 10) {
              matchedOption = tempField.options.find((opt) => opt.label.toLowerCase().includes("zimn"))
            } else if (airTemp > 10 && airTemp <= 20) {
              matchedOption = tempField.options.find((opt) => opt.label.toLowerCase().includes("umiark"))
            } else {
              matchedOption = tempField.options.find((opt) => opt.label.toLowerCase().includes("ciep") || opt.label.toLowerCase().includes("gorąc"))
            }

            if (matchedOption) {
              setValue("water_temperature_id", matchedOption.value, { shouldValidate: true })
            }
          }
        } catch (err) {
          setWeatherError("Nie udało się pobrać pogody dla Twojej lokalizacji.")
        } finally {
          setWeatherLoading(false)
        }
      },
      (error) => {
        setWeatherLoading(false)
        if (error.code === error.PERMISSION_DENIED) {
          setWeatherError("Odrzucono pozwolenie na dostęp do lokalizacji w przeglądarce.")
        } else {
          setWeatherError("Nie udało się ustalić pozycji GPS.")
        }
      }
    )
  }

  const onSubmit = async (values) => {
    const selectedLabels = dynamicFields.reduce((acc, field) => {
      const selectedValue = values[field.id]
      const selectedOption = field.options.find((option) => option.value === selectedValue)
      acc[field.id] = selectedOption?.label || "Brak danych"
      return acc
    }, {})

    onSubmitStart?.(values, selectedLabels)

    const payload = {
      fish_id: Number.parseInt(values.fish_species_id, 10),
      water_id: Number.parseInt(values.water_type_id, 10),
      season_id: Number.parseInt(values.season_id, 10),
      time_of_day_id: Number.parseInt(values.time_of_day_id, 10),
      water_clarity_id: Number.parseInt(values.water_clarity_id, 10),
      water_temperature_id: Number.parseInt(values.water_temperature_id, 10),
    }

    const result = await submitRecommendation(payload)
    onSubmitSuccess?.(result, values, selectedLabels)
  }

  if (fetchError) {
    return (
      <FormCardContainer>
        <CardContent className="space-y-4 p-6">
          <p className="type-body rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700">
            {fetchError}
          </p>
          <Button type="button" variant="outline" onClick={retry} disabled={loading} className="w-full">
            Spróbuj ponownie
          </Button>
        </CardContent>
      </FormCardContainer>
    )
  }

  if (loading) {
    return (
      <FormCardContainer>
        <CardHeader className="pb-4">
          <CardTitle className="type-title text-slate-900">Dobór przynęty</CardTitle>
          <CardDescription className="type-body">Przygotowujemy formularz...</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-12 w-full" />
        </CardContent>
      </FormCardContainer>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      
 <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800/80 dark:bg-[#151c2c]/60 shadow-md">
        <label className="text-sm font-semibold text-slate-900 block dark:text-slate-200">
          🌤️ Automatyczne ustawianie pogody
        </label>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              placeholder="Wpisz miasto (np. Rzeszów)..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-[#1a2333]/80 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleFetchWeather}
              disabled={weatherLoading}
              className="h-10 border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800/50 px-4"
            >
              {weatherLoading ? "..." : "Pobierz"}
            </Button>
          </div>

          {/* 🌟 NOWY PRZYCISK LOKALIZACJI GPS 🌟 */}
          <Button
            type="button"
            onClick={handleGetLocation}
            disabled={weatherLoading}
            className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 px-4 rounded-md transition dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap"
          >
            <Compass className={`size-4 ${weatherLoading ? 'animate-spin' : ''}`} />
            Użyj mojej lokalizacji
          </Button>
        </div>

        {weatherError && (
          <p className="text-xs text-red-500 font-medium bg-red-50/50 dark:bg-red-500/10 p-2 rounded-md border border-red-200 dark:border-red-500/20">{weatherError}</p>
        )}

        {weatherInfo && (
          <div className="text-sm bg-slate-50 dark:bg-[#111827]/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-slate-600 dark:text-slate-400 shadow-inner">
            <span>📍 Wynik: <b className="text-slate-900 dark:text-slate-100">{weatherInfo.city_name}</b></span>
            <div className="flex items-center gap-3">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-base">{weatherInfo.temp}°C</span>
              <span className="capitalize text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-transparent">{weatherInfo.description}</span>
            </div>
          </div>
        )}
      </div>

      <FormCardContainer>
        <CardHeader className="pb-4">
          <CardTitle className="type-title text-slate-900 dark:text-slate-100">Dobór przynęty</CardTitle>
          <CardDescription className="type-body text-slate-500 dark:text-slate-400">Wybierz parametry połowu</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {dynamicFields.map((field) => (
              <FormFieldSelect
                key={field.id}
                field={field}
                control={control}
                errorMessage={errors[field.id]?.message}
              />
            ))}

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                recommendationLoading ||
                loading ||
                Boolean(fetchError) ||
                dynamicFields.every((f) => f.options.length === 0)
              }
              className="type-body mt-1 h-12 w-full bg-[#070224] font-semibold hover:bg-[#161038] dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Fish className="mr-2 size-4" />
              {isSubmitting || recommendationLoading ? "Analizowanie..." : "Znajdź przynętę"}
            </Button>
          </form>
        </CardContent>
      </FormCardContainer>

    </div>
  )
}