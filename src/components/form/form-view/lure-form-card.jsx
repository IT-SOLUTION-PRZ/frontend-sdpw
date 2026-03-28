import React, { useState, useEffect } from 'react';
import { Fish } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FormCardContainer } from "@/components/form/form-card-container"
import { FormFieldSelect } from "@/components/form/form-view/form-field-select"
import { lureFormDefaultValues, lureFormSchema } from "@/components/form/form-view/lure-form-schema"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LureFormCard({ onSubmitSuccess, initialValues }) {
  const [dynamicFields, setDynamicFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

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

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setFetchError("");
        const response = await fetch('http://localhost:8000/api/v1/form-options/');

        if (!response.ok) {
          let apiMessage = "";

          try {
            const errorData = await response.json();
            apiMessage = errorData?.detail || errorData?.message || "";
          } catch {
            apiMessage = await response.text();
          }

          throw new Error(apiMessage || 'Nie udało się pobrać opcji formularza. Spróbuj ponownie.');
        }
        
        const data = await response.json();
        console.log("Dane odebrane z Django:", data);

        const fieldsConfig = [
        { 
          id: 'fish_species_id', 
          label: 'Gatunek ryby', 
          placeholder: 'Wybierz rybę...',
          options: (data.fish_species || []).map(f => ({ value: String(f.id), label: f.name })) 
        },
        { 
          id: 'water_type_id', 
          label: 'Typ zbiornika', 
          placeholder: 'Gdzie łowisz?',
          options: (data.water_types || []).map(w => ({ value: String(w.id), label: w.name })) 
        },
        { 
          id: 'season_id', 
          label: 'Pora roku', 
          placeholder: 'Wybierz sezon...',
          options: (data.seasons || []).map(s => ({ value: String(s.id), label: s.name })) 
        },
        { 
          id: 'time_of_day_id', 
          label: 'Pora dnia', 
          placeholder: 'Kiedy łowisz?',
          options: (data.times_of_day || []).map(t => ({ value: String(t.id), label: t.name })) 
        },
        { 
          id: 'water_clarity_id', 
          label: 'Klarowność wody', 
          placeholder: 'Jaka jest woda?',
          options: (data.water_clarities || []).map(c => ({ value: String(c.id), label: c.name })) 
        },
        { 
          id: 'water_temperature_id', 
          label: 'Temperatura wody', 
          placeholder: 'Wybierz temperaturę...',
          options: (data.water_temperatures || []).map(t => ({ value: String(t.id), label: t.name })) 
        },
      ];
        
        setDynamicFields(fieldsConfig);
      } catch (error) {
        console.error("Błąd pobierania danych z API:", error);
        setDynamicFields([]);
        setFetchError("Nie udało się połączyć z serwerem.");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const onSubmit = async (values) => {
  const selectedLabels = dynamicFields.reduce((acc, field) => {
    const selectedValue = values[field.id]
    const selectedOption = field.options.find((option) => option.value === selectedValue)
    acc[field.id] = selectedOption?.label || "Brak danych"
    return acc
  }, {})

  const payload = {
    fish_id: parseInt(values.fish_species_id),
    water_id: parseInt(values.water_type_id),
    season_id: parseInt(values.season_id),
    time_of_day_id: parseInt(values.time_of_day_id),
    water_clarity_id: parseInt(values.water_clarity_id),
    water_temperature_id: parseInt(values.water_temperature_id)
  };

  try {
    const response = await fetch('http://localhost:8000/api/v1/recommend/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      onSubmitSuccess?.({ 
        error: true, 
        message: result.detail || result.message || "Brak dopasowania w bazie dla tych parametrów." 
      }, values, selectedLabels);
      return;
    }

    onSubmitSuccess?.({ ...result, success: true }, values, selectedLabels);
    
  } catch {
    onSubmitSuccess?.({ 
      error: true, 
      message: "Problemy z połączeniem. Spróbuj ponownie później." 
    }, values, selectedLabels);
  }
};

  if (fetchError) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        {fetchError}
      </p>
    );
  }

  return (
    <FormCardContainer>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-slate-900">Dobór przynęty</CardTitle>
        <CardDescription>
          {loading ? "Ładowanie danych z bazy SQL..." : "Wybierz parametry połowu"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {dynamicFields.map((field) => (
            <FormFieldSelect
              key={field.id}
              field={field}
              control={control}
              errorMessage={errors[field.id]?.message}
            />
          ))}

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              loading ||
              Boolean(fetchError) ||
              dynamicFields.every((f) => f.options.length === 0)
            }
            className="mt-1 h-12 w-full bg-[#070224] text-base font-semibold hover:bg-[#161038]"
          >
            <Fish className="mr-2 size-4" />
            {isSubmitting ? "Analizowanie..." : "Znajdź przynętę"}
          </Button>
        </form>
      </CardContent>
    </FormCardContainer>
  )
}