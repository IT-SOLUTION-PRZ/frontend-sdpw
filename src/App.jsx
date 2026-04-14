import { useState } from "react"
import { LureFormCard } from "@/components/form/form-view/lure-form-card"
import { LurePageHeader } from "@/components/form/form-view/lure-page-header"
import { LureResultsCard } from "@/components/form/results-view/lure-results-card"

export default function App() {
  const [formValues, setFormValues] = useState(null)
  const [selectedLabels, setSelectedLabels] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)

  const handleSubmitStart = (userChoices, labels) => {
    setFormValues(userChoices)
    setSelectedLabels(labels)
    setRecommendation(null)
    setResultLoading(true)
    setShowResult(true)
  }

  const handleFormSubmit = (serverResult, userChoices, labels) => {
    setRecommendation(serverResult)
    setFormValues(userChoices)
    setSelectedLabels(labels)
    setResultLoading(false)
    setShowResult(true)
  }

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-10">
      <div className="mx-auto max-w-190 flex flex-col gap-9">
        <LurePageHeader />
        {showResult ? (
          <LureResultsCard 
            result={recommendation} 
            selectedLabels={selectedLabels}
            isLoading={resultLoading}
            onBack={() => {
              setShowResult(false)
              setResultLoading(false)
            }} 
          />
        ) : (
          <LureFormCard
            initialValues={formValues}
            onSubmitStart={handleSubmitStart}
            onSubmitSuccess={handleFormSubmit}
          />
        )}
      </div>
    </main>
  )
}