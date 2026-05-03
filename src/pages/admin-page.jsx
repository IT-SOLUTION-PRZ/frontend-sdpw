import { ShieldCheck, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GenericCrud } from "@/components/admin/generic-crud"

const fishFields = [
  { name: "name", label: "Gatunek ryby" },
  { name: "description", label: "Opis", type: "textarea" },
  { name: "image_url", label: "Link do zdjęcia" },
  { name: "is_predator", label: "Drapieżnik", type: "checkbox" }
]

const baitFields = [
  { name: "name", label: "Nazwa przynęty" },
  { name: "bait_type", label: "Typ przynęty" },
  { name: "color", label: "Kolor główny" },
  { name: "description", label: "Opis", type: "textarea" },
  { name: "image_url", label: "Link do zdjęcia" },
  { name: "usage_tips", label: "Wskazówki użycia", type: "textarea" }
]

const conditionFields = [
  { name: "name", label: "Nazwa" },
  { name: "category", label: "Kategoria", hidden: true, default: "water_type" }
]

export function AdminPage() {
  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-8">
      <section className="mx-auto flex flex-col min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-start mt-4">
        <header className="flex w-full items-center justify-between mb-6">
          <Button asChild variant="outline" className="gap-2 rounded-full bg-white/80 border-slate-200 shadow-sm">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Wróć
            </Link>
          </Button>
        </header>

        <div className="w-full rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-indigo-100 text-[#070224]">
            <ShieldCheck className="size-8" />
          </div>

          <p className="text-center type-caption mb-2 font-semibold uppercase tracking-wide text-slate-500">Panel admina</p>
          <h1 className="text-center type-display text-balance text-slate-900 mb-8">Zarządzanie bazą danych</h1>

          <Tabs defaultValue="fish" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="fish">Ryby</TabsTrigger>
              <TabsTrigger value="baits">Przynęty</TabsTrigger>
              <TabsTrigger value="water_type">Typy Wody</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fish">
              <GenericCrud titleAdd="Rybę" titleList="Ryb" titleManage="Ryby" endpoint="fish" fields={fishFields} />
            </TabsContent>
            
            <TabsContent value="baits">
              <GenericCrud titleAdd="Przynętę" titleList="Przynęt" titleManage="Przynęty" endpoint="baits" fields={baitFields} />
            </TabsContent>
            
            <TabsContent value="water_type">
              {/* Only show 'water_type' by specifying endpoint and queryParams */}
              <GenericCrud titleAdd="Typ Wody" titleList="Typów Wody" titleManage="Typy Wody" endpoint="conditions" queryParams="?category=water_type" fields={conditionFields} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
