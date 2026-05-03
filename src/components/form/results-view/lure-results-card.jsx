import { RotateCcw, FileDown } from "lucide-react" 
import { jsPDF } from "jspdf"
import { FormCardContainer } from "@/components/form/form-card-container"
import { FishingConditionsCard } from "@/components/form/results-view/fishing-conditions-card"
import { RecommendedBaitCard } from "@/components/form/results-view/recommended-bait-card"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LureResultsCard({ onBack, result, selectedLabels, isLoading = false }) {
  const isError = !result?.id && result?.message
  const noData = !result

const handleDownloadPdf = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const removeAccents = (str) => {
    if (typeof str !== 'string') return str;
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/ł/g, "l").replace(/Ł/g, "L");
  };

  const labelsMap = {
    fish_species_id: "Gatunek ryby",
    water_type_id: "Typ zbiornika",
    season_id: "Sezon",
    time_of_day_id: "Pora dnia",
    water_clarity_id: "Przejrzystosc wody",
    water_temperature_id: "Temperatura wody"
  };

  const title = "RAPORT REKOMENDACJI";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 25);
  
  doc.setLineWidth(0.5);
  doc.line(20, 30, pageWidth - 20, 30);

  doc.setFontSize(14);
  doc.text(removeAccents("Wybrane warunki polowu:"), 20, 45);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12); 
  let y = 55;
  if (selectedLabels) {
    Object.entries(selectedLabels).forEach(([key, value]) => {
      const friendlyLabel = labelsMap[key] || key;
      doc.text(`${removeAccents(friendlyLabel)}: ${removeAccents(value)}`, 25, y);
      y += 8;
    });
  }

  y += 10;
  doc.setLineWidth(0.2);
  doc.line(20, y, pageWidth - 20, y);
  y += 15;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const bait = result?.bait_details;

  const nameTxt = `Przyneta: ${bait?.name || "Nieznana przyneta"}`;
  doc.text(removeAccents(nameTxt), 20, y);
  y += 8;

  const prodTxt = `Producent: ${bait?.producer_name || "Nieznany producent"}`;
  doc.text(removeAccents(prodTxt), 20, y);
  y += 8;

  const descTxt = `Opis: ${bait?.description || "Brak opisu przynety."}`;
  const splitDesc = doc.splitTextToSize(removeAccents(descTxt), pageWidth - 40);
  doc.text(splitDesc, 20, y);
  y += (splitDesc.length * 7) + 2;

  const tipsTxt = `Wskazowki uzycia: ${bait?.usage_tips || "Brak wskazowek uzycia."}`;
  const splitTips = doc.splitTextToSize(removeAccents(tipsTxt), pageWidth - 40);
  doc.text(splitTips, 20, y);

  doc.save("raport.pdf");
};

  if (isLoading) {
    return (
      <div className="space-y-6">
        <FormCardContainer>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-10 w-48" />
          </CardContent>
        </FormCardContainer>

        <FormCardContainer>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </FormCardContainer>
      </div>
    )
  }

  if (noData || isError) {
    return (
      <FormCardContainer>
        <CardContent className="p-6 text-center">
          <p className="type-title mb-4 font-semibold text-red-500">
            {result?.message || "Nie znaleźliśmy idealnej przynęty dla tych warunków."}
          </p>
          <Button onClick={onBack} variant="outline" className="text-slate-900 border-slate-300">
            <RotateCcw className="mr-2 size-4" /> Wróć i zmień parametry
          </Button>
        </CardContent>
      </FormCardContainer>
    )
  }

  return (
    <div className="space-y-6">
      <FishingConditionsCard onBack={onBack} selectedLabels={selectedLabels} />
      <RecommendedBaitCard result={result} />
      
      <div className="flex justify-center pt-2">
        <Button onClick={handleDownloadPdf} className="bg-[#070224] w-full">
          <FileDown className="mr-2 size-4" /> Pobierz raport PDF
        </Button>
      </div>
    </div>
  )
}