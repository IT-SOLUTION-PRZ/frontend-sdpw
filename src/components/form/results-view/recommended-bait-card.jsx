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
            <h2 className="type-title text-slate-900">Rekomendowane przynęty</h2>
            <p className="type-body text-slate-500">
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
                <div className="type-caption flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className="type-title text-slate-900">
                    {bait.name || "Nieznana przynęta"}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="type-caption rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
                      {bait.producer_name || "Nieznany producent"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="type-body mt-4 text-slate-700">
                {bait.description || "Brak opisu przynęty."}
              </p>

              <p className="type-body mt-3 text-slate-700">
                <span className="font-semibold text-slate-900">Wskazówki użycia: </span>
                {bait.usage_tips || "Brak wskazówek użycia."}
              </p>

              {rec?.additional_info && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="type-body mb-2 font-semibold text-slate-900">Dodatkowe informacje</p>
                  <p className="type-body text-slate-700">
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
