import { Controller } from "react-hook-form"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FormFieldSelect({ field, control, errorMessage }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Controller
        name={field.id}
        control={control}
        render={({ field: formField }) => (
          <Select value={formField.value} onValueChange={formField.onChange}>
            <SelectTrigger
              id={field.id}
              aria-invalid={Boolean(errorMessage)}
              className="type-body h-12 border-slate-200 bg-slate-100/75"
            >
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errorMessage ? <p className="type-caption text-destructive">{errorMessage}</p> : null}
    </div>
  )
}
