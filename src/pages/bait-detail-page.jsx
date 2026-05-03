import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Bug, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { API_BASE_URL } from "@/lib/api-config"
import { PageFooter } from "@/components/layout/page-footer"

export function BaitDetailPage() {
  const { id } = useParams()
  const [bait, setBait] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSingleBait = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/baits/${id}/`)
        if (response.ok) {
          const data = await response.json()
          setBait(data)
        }
      } catch (error) {
        console.error("Błąd podczas pobierania detali przynęty:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSingleBait()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#ecf3f7] flex items-center justify-center">
        <div className="animate-pulse text-slate-500 font-medium">Wyszukiwanie przynęty w skrzynce...</div>
      </main>
    )
  }

  if (!bait) {
    return (
      <main className="min-h-screen bg-[#ecf3f7] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Nie znaleziono takiej przynęty</h2>
        <Button asChild><Link to="/katalog-przynet">Wróć do katalogu</Link></Button>
      </main>
    )
  }

  const imageUrl = bait.image_url || `https://placehold.co/1200x600/e2e8f0/475569?text=${encodeURIComponent(bait.name)}`

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8 flex flex-col">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 flex-1">
        
        <div>
          <Button asChild variant="outline" className="rounded-full bg-white border-slate-200">
            <Link to="/katalog-przynet"><ArrowLeft className="size-4 mr-2" /> Wróć do katalogu</Link>
          </Button>
        </div>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="aspect-[21/9] w-full overflow-hidden bg-slate-100 relative">
            <img 
              src={imageUrl} 
              alt={bait.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{bait.name}</h1>
              
              <div className="flex flex-wrap items-center gap-3">
                {bait.bait_type && (
                  <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-sm">
                    {bait.bait_type}
                  </span>
                )}
                {bait.color && (
                  <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-sm">
                    Kolor: {bait.color}
                  </span>
                )}
                {bait.producer_name && (
                  <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm">
                    {bait.producer_name}
                  </span>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-slate-100 my-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                  <Bug className="size-5 text-slate-500" />
                  Opis
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {bait.description || "Brak szczegółowego opisu."}
                </p>
              </div>

              {bait.usage_tips && (
                <div className="space-y-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-amber-900">
                    <Lightbulb className="size-5 text-amber-600" />
                    Wskazówki użycia
                  </h2>
                  <p className="text-amber-800 leading-relaxed">
                    {bait.usage_tips}
                  </p>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
      <div className="mt-8"><PageFooter /></div>
    </main>
  )
}