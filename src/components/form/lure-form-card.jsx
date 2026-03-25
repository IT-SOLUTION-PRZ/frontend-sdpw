import { Fish } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FormCardContainer } from "@/components/form/form-card-container"
import { FormFieldSelect } from "@/components/form/form-field-select"
import { lureFormDefaultValues, lureFormSchema } from "@/components/form/lure-form-schema"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LureFormCard({ fields, onSubmitSuccess, initialValues }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(lureFormSchema),
    defaultValues: {
      ...lureFormDefaultValues,
      ...initialValues,
    },
  })

  const onSubmit = (values) => {
    onSubmitSuccess?.(values)
  }

  return (
    <FormCardContainer>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-slate-900">Dobór przynęty wędkarskiej</CardTitle>
        <CardDescription className="text-sm text-slate-500">
          Wypełnij formularz, aby otrzymać rekomendację odpowiedniej przynęty do warunków połowu
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <FormFieldSelect
              key={field.id}
              field={field}
              control={control}
              errorMessage={errors[field.id]?.message}
            />
          ))}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 h-12 w-full bg-[#070224] text-base font-semibold hover:bg-[#161038]"
          >
            <Fish className="mr-2 size-4" />
            Znajdź przynętę
          </Button>
        </form>
      </CardContent>
    </FormCardContainer>
  )
}
