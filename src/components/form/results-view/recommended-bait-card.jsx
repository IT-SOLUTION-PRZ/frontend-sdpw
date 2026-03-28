import { FormCardContainer } from "@/components/form/form-card-container"
import { CardContent } from "@/components/ui/card"

export function RecommendedBaitCard({ result }) {
  return (
    <FormCardContainer>
      <CardContent className="p-6">
        <h2 className="mb-4 text-center text-2xl font-bold text-slate-900">Polecana przynęta</h2>

        <div className="mb-6 rounded-xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h3 className="text-center text-xl font-extrabold uppercase tracking-tight text-blue-800">
            {result.bait_details?.name || "Specjalistyczna przynęta"}
          </h3>

          {result.additional_info && (
            <p className="mt-4 rounded-lg bg-white/50 py-2 text-center font-medium text-blue-900">
              " {result.additional_info} "
            </p>
          )}

          {result.bait_details?.description && (
            <p className="mt-3 text-center text-sm italic text-slate-600">{result.bait_details.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-slate-400">Gatunek</p>
            <p className="text-sm font-semibold text-slate-700">{result.fish_name || "Nieznany"}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-slate-400">Priorytet</p>
            <p className="text-sm font-semibold text-slate-700">{result.priority || "1"}</p>
          </div>
        </div>
      </CardContent>
    </FormCardContainer>
  )
}
