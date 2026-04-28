import { useState } from "react"

import { LureFormCard } from "@/components/form/form-view/lure-form-card"
import { LurePageHeader } from "@/components/layout/lure-page-header"
import { PageFooter } from "@/components/layout/page-footer"
import { LureResultsCard } from "@/components/form/results-view/lure-results-card"

export function HomePage() {
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
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-190 flex-col gap-8 sm:min-h-[calc(100vh-4rem)] sm:gap-9">
        <LurePageHeader />
        <section className="flex flex-1 items-start justify-center">
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
        </section>
        <PageFooter />
      </div>
    </main>
  )
}
