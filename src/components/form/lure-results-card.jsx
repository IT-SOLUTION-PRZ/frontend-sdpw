import { RotateCcw } from "lucide-react"
import { FormCardContainer } from "@/components/form/form-card-container"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"

export function LureResultsCard({ onBack, result, userChoices }) {

  const isError = !result?.id && result?.message;
  const noData = !result;

  if (noData || isError) {
    return (
      <FormCardContainer>
        <CardContent className="p-6 text-center">
          <p className="text-red-500 font-semibold text-lg mb-4">
            {result?.message || "Nie znaleźliśmy idealnej przynęty dla tych warunków."}
          </p>
          <Button onClick={onBack} variant="outline" className="text-slate-900 border-slate-300">
            <RotateCcw className="mr-2 size-4" /> Wróć i zmień parametry
          </Button>
        </CardContent>
      </FormCardContainer>
    );
  }

  return (
    <FormCardContainer>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          Polecana przynęta
        </h2>
        
        <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl mb-6 shadow-sm">
          <h3 className="text-xl font-extrabold text-blue-800 text-center uppercase tracking-tight">
            {result.bait_details?.name || "Specjalistyczna przynęta"}
          </h3>
          
          {result.additional_info && (
            <p className="mt-4 text-center text-blue-900 font-medium bg-white/50 py-2 rounded-lg">
              " {result.additional_info} "
            </p>
          )}

          {result.bait_details?.description && (
            <p className="mt-3 text-slate-600 text-sm text-center italic">
              {result.bait_details.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Gatunek</p>
            <p className="text-sm font-semibold text-slate-700">{result.fish_name || "Nieznany"}</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Priorytet</p>
            <p className="text-sm font-semibold text-slate-700">{result.priority || "1"}</p>
          </div>
        </div>

        <Button 
          type="button" 
          onClick={onBack} 
          className="w-full h-12 bg-[#070224] text-white font-bold hover:bg-[#161038] transition-colors"
        >
          <RotateCcw className="mr-2 size-4" /> Sprawdź inne ustawienia
        </Button>
      </CardContent>
    </FormCardContainer>
  );
}