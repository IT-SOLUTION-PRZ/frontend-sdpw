import { RotateCcw } from "lucide-react"
import { FormCardContainer } from "@/components/form/form-card-container"
import { FishingConditionsCard } from "@/components/form/results-view/fishing-conditions-card"
import { RecommendedBaitCard } from "@/components/form/results-view/recommended-bait-card"
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
    <div className="space-y-6">
      <FishingConditionsCard onBack={onBack} userChoices={userChoices} result={result} />
      <RecommendedBaitCard result={result} />
    </div>
  )
}