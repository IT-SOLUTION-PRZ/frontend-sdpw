import { Fish } from "lucide-react"
import { FormCardContainer } from "@/components/form/form-card-container"
import { CardContent } from "@/components/ui/card"

export function RecommendedBaitCard({ result }) {
  const recommendations = Array.isArray(result)
    ? result
    : result
      ? [result]
      : []

  const count = recommendations.length

  return (
    <FormCardContainer className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
        <div className="flex items-start gap-3">
          <Fish className="mt-0.5 size-5 text-blue-500" />
          <div className="space-y-1">
            <h2 className="text-2xl font-bold leading-tight text-slate-900">Rekomendowane przynęty</h2>
            <p className="text-sm text-slate-500">
              Znaleziono {count} rekomendacj{count === 1 ? "ę" : count < 5 ? "e" : "i"} dopasowan{count === 1 ? "ą" : "ych"} do wybranych warunków
            </p>
          </div>
        </div>
      </div>

      <CardContent className="space-y-4 p-6">
        {recommendations.map((rec, index) => {
          const bait = rec?.bait_details || {}

          return (
            <article
              key={rec?.id ?? index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {bait.name || "Nieznana przynęta"}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      {bait.producer_name || "Nieznany producent"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {bait.description || "Brak opisu przynęty."}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">Wskazówki użycia: </span>
                {bait.usage_tips || "Brak wskazówek użycia."}
              </p>

              {rec?.additional_info && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="mb-2 text-sm font-semibold text-slate-900">Dodatkowe informacje</p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {rec.additional_info}
                  </p>
                </div>
              )}
            </article>
          )
        })}
      </CardContent>
    </FormCardContainer>
  )
}
