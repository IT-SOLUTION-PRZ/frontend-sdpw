import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, MapPin, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { API_BASE_URL } from "@/lib/api-config"
import { PageFooter } from "@/components/layout/page-footer"
import { getFishImageUrl, getFishDetailCategoryBadge } from "@/lib/fish-category"

export function FishDetailPage() {
  const { id } = useParams()
  const [fish, setFish] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSingleFish = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/fish/${id}/`)
        if (response.ok) {
          const data = await response.json()
          setFish(data)
        }
      } catch (error) {
        console.error("Błąd podczas pobierania detali ryby:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSingleFish()
  }, [id]) 

  if (loading) {
    return (
      <main className="min-h-screen bg-[#ecf3f7] flex items-center justify-center">
        <div className="animate-pulse text-slate-500 font-medium">Ładowanie profilu ryby...</div>
      </main>
    )
  }

  if (!fish) {
    return (
      <main className="min-h-screen bg-[#ecf3f7] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Nie znaleziono takiej ryby</h2>
        <Button asChild><Link to="/katalog-ryb">Wróć do katalogu</Link></Button>
      </main>
    )
  }

  const imageUrl = getFishImageUrl(fish, "1200x600")
  const categoryBadge = getFishDetailCategoryBadge(fish)

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8 flex flex-col">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 flex-1">
        <div>
          <Button asChild variant="outline" className="rounded-full bg-white border-slate-200">
            <Link to="/katalog-ryb">
              <ArrowLeft className="size-4 mr-2" /> 
              Wróć do katalogu
            </Link>
          </Button>
        </div>
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="aspect-[21/9] w-full overflow-hidden bg-slate-100 relative">
            <img 
              src={imageUrl} 
              alt={fish.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{fish.name}</h1>
                <div className="flex items-center gap-3">
                  <span className={`${categoryBadge.className} font-bold px-3 py-1 rounded-full text-sm`}>
                    {categoryBadge.label}
                  </span>
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-slate-100 my-6"></div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Opis gatunku</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {fish.description || "Niestety w naszej bazie brakuje jeszcze szczegółowego opisu tego gatunku. Administratorzy pracują nad uzupełnieniem informacji."}
              </p>
            </div>
          </div>
        </article>

      </div>
      
      <div className="mt-8">
        <PageFooter />
      </div>
    </main>
  )
}