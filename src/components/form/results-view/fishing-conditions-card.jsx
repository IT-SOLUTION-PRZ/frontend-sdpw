import {
  CalendarDays,
  Clock3,
  Droplets,
  Fish,
  Info,
  RotateCcw,
  Thermometer,
  Waves,
} from "lucide-react"

import { FormCardContainer } from "@/components/form/form-card-container"
import { lureFormFields } from "@/components/form/form-view/lure-form-fields"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"

export function FishingConditionsCard({ onBack, userChoices }) {
  const getOptionLabel = (fieldId, optionValue) => {
    const field = lureFormFields.find((item) => item.id === fieldId)
    const option = field?.options?.find((item) => item.value === String(optionValue))
    return option?.label || "Brak danych"
  }

  const conditionTiles = [
    {
      id: "fish_species_id",
      title: "Gatunek",
      value: getOptionLabel("fish_species_id", userChoices?.fish_species_id),
      icon: Fish,
    },
    {
      id: "water_type_id",
      title: "Zbiornik",
      value: getOptionLabel("water_type_id", userChoices?.water_type_id),
      icon: Waves,
    },
    {
      id: "time_of_day_id",
      title: "Pora dnia",
      value: getOptionLabel("time_of_day_id", userChoices?.time_of_day_id),
      icon: Clock3,
    },
    {
      id: "water_clarity_id",
      title: "Przejrzystość",
      value: getOptionLabel("water_clarity_id", userChoices?.water_clarity_id),
      icon: Droplets,
    },
    {
      id: "season_id",
      title: "Sezon",
      value: getOptionLabel("season_id", userChoices?.season_id),
      icon: CalendarDays,
    },
    {
      id: "water_temperature_id",
      title: "Temperatura",
      value: getOptionLabel("water_temperature_id", userChoices?.water_temperature_id),
      icon: Thermometer,
    },
  ]

  return (
    <FormCardContainer className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 size-5 text-blue-500" />
          <div className="space-y-1">
            <h2 className="text-2xl font-bold leading-tight text-slate-900">Warunki połowu</h2>
            <p className="text-sm text-slate-500">Wybrane parametry dla rekomendacji</p>
          </div>
        </div>
      </div>

      <CardContent className="p-7">
        <div className="grid gap-4 md:grid-cols-3">
          {conditionTiles.map((tile) => {
            const TileIcon = tile.icon

            return (
              <div
                key={tile.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <TileIcon className="size-5 shrink-0 text-indigo-500" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-none text-slate-500">{tile.title}</p>
                    <p className="mt-2 truncate text-sm font-bold leading-none text-slate-900">{tile.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="mt-5 h-11 rounded-xl border-slate-300 px-5 text-base font-semibold text-slate-800 hover:bg-slate-100"
        >
          <RotateCcw className="mr-2 size-4" />
          Zmień warunki
        </Button>
      </CardContent>
    </FormCardContainer>
  )
}
