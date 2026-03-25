import { RotateCcw } from "lucide-react"

import { FormCardContainer } from "@/components/form/form-card-container"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"

export function LureResultsCard({ onBack }) {

  return (
    <FormCardContainer>
      <CardContent className="p-6">
        <p className="mb-4 text-lg font-semibold text-slate-900">Rezultat</p>
        <Button type="button" variant="outline" onClick={onBack}>
          <RotateCcw className="mr-2 size-4" />
          Wroc do formularza
        </Button>
      </CardContent>
    </FormCardContainer>
  )
}
