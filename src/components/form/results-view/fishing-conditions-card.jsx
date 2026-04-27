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
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"

export function FishingConditionsCard({ onBack, selectedLabels }) {
  const conditionTiles = [
    {
      id: "fish_species_id",
      title: "Gatunek",
      value: selectedLabels?.fish_species_id || "Brak danych",
      icon: Fish,
    },
    {
      id: "water_type_id",
      title: "Zbiornik",
      value: selectedLabels?.water_type_id || "Brak danych",
      icon: Waves,
    },
    {
      id: "time_of_day_id",
      title: "Pora dnia",
      value: selectedLabels?.time_of_day_id || "Brak danych",
      icon: Clock3,
    },
    {
      id: "water_clarity_id",
      title: "Przejrzystość",
      value: selectedLabels?.water_clarity_id || "Brak danych",
      icon: Droplets,
    },
    {
      id: "season_id",
      title: "Sezon",
      value: selectedLabels?.season_id || "Brak danych",
      icon: CalendarDays,
    },
    {
      id: "water_temperature_id",
      title: "Temperatura",
      value: selectedLabels?.water_temperature_id || "Brak danych",
      icon: Thermometer,
    },
  ]

  return (
    <FormCardContainer className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 size-5 text-blue-500" />
          <div className="space-y-1">
            <h2 className="type-title text-slate-900">Warunki połowu</h2>
            <p className="type-body text-slate-500">Wybrane parametry dla rekomendacji</p>
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
                    <p className="type-caption truncate font-medium text-slate-500">{tile.title}</p>
                    <p className="type-body mt-2 truncate font-semibold text-slate-900">{tile.value}</p>
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
          className="type-body mt-5 h-11 rounded-xl border-slate-300 px-5 font-semibold text-slate-800 hover:bg-slate-100"
        >
          <RotateCcw className="mr-2 size-4" />
          Zmień warunki
        </Button>
      </CardContent>
    </FormCardContainer>
  )
}
