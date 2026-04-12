import { useState } from "react"
import { LureFormCard } from "@/components/form/form-view/lure-form-card"
import { LurePageHeader } from "@/components/form/form-view/lure-page-header"
import { LureResultsCard } from "@/components/form/results-view/lure-results-card"

export default function App() {
  const [formValues, setFormValues] = useState(null)
  const [selectedLabels, setSelectedLabels] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleFormSubmit = (serverResult, userChoices, labels) => {
    setRecommendation(serverResult);
    setFormValues(userChoices);
    setSelectedLabels(labels);
    setShowResult(true);
  }

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-10">
      <div className="mx-auto max-w-[760px] flex flex-col gap-9">
        <LurePageHeader />
        {showResult ? (
          <LureResultsCard 
            result={recommendation} 
            selectedLabels={selectedLabels}
            onBack={() => setShowResult(false)} 
          />
        ) : (
          <LureFormCard
            initialValues={formValues}
            onSubmitSuccess={handleFormSubmit}
          />
        )}
      </div>
    </main>
  )
}