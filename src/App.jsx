import { useState } from "react"

import { LureFormCard } from "@/components/form/lure-form-card"
import { lureFormFields } from "@/components/form/lure-form-fields"
import { LurePageHeader } from "@/components/form/lure-page-header"
import { LureResultsCard } from "@/components/form/lure-results-card"

export default function App() {
  const [formValues, setFormValues] = useState(null)
  const [resultValues, setResultValues] = useState(false)

  const handleFormSubmit = (values) => {
    setFormValues(values)
    setResultValues(true)
  }

  const handleBackToForm = () => {
    setResultValues(false)
  }

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-9">
        <LurePageHeader />
        {resultValues ? (
          <LureResultsCard 
            values={formValues} 
            fields={lureFormFields} 
            onBack={handleBackToForm} />
        ) : (
          <LureFormCard
            fields={lureFormFields}
            initialValues={formValues}
            onSubmitSuccess={handleFormSubmit}
          />
        )}
      </div>
    </main>
  )
}
