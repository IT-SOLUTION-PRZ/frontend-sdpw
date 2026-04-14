import React from "react"
import { Fish } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(lureFormSchema),
    defaultValues: {
      ...lureFormDefaultValues,
      ...initialValues,
    },
  })

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
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
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
          <CardTitle className="text-2xl text-slate-900">Dobór przynęty</CardTitle>
          <CardDescription>Przygotowujemy formularz...</CardDescription>
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
    <FormCardContainer>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-slate-900">Dobór przynęty</CardTitle>
        <CardDescription>Wybierz parametry połowu</CardDescription>
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
            className="mt-1 h-12 w-full bg-[#070224] text-base font-semibold hover:bg-[#161038]"
          >
            <Fish className="mr-2 size-4" />
            {isSubmitting || recommendationLoading ? "Analizowanie..." : "Znajdź przynętę"}
          </Button>
        </form>
      </CardContent>
    </FormCardContainer>
  )
}