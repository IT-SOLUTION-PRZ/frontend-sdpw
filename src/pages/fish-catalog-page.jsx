import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, ArrowLeft, Fish, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/api-config"
import { PageFooter } from "@/components/layout/page-footer"
import { useTopsStatistics } from "@/hooks/use-tops-statistics"

export function FishCatalogPage() {
  const [fishList, setFishList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { topFish } = useTopsStatistics()

  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/fish/`)
        if (response.ok) {
          const data = await response.json()
          setFishList(data) 
        }
      } catch (error) {
        console.error("Błąd podczas pobierania ryb:", error)
      } finally {
        setLoading(false) 
      }
    }

    fetchFish()
  }, [])
  const filteredFish = fishList.filter((fish) =>
    fish.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )


  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8 flex flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 flex-1">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full bg-white border-slate-200">
              <Link to="/">
                <ArrowLeft className="size-4 mr-2" /> 
                Wróć
              </Link>
            </Button>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Fish className="size-6 text-indigo-600" />
              Katalog Ryb
            </h1>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              type="text"
              placeholder="Szukaj gatunku ryby..."
              className="pl-9 rounded-full bg-white border-slate-200 focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        </header>
        {topFish && (
          <Link
            to={`/katalog-ryb/${topFish.id}`}
            className="flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-white/80 px-5 py-4 shadow-sm transition hover:border-indigo-200 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Trophy className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                  Najczęściej wybierana ryba
                </p>
                <p className="text-lg font-extrabold text-slate-900">{topFish.name}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-500">
              {topFish.search_count} wyszukiwań
            </span>
          </Link>
        )}
        {loading ? (
          // Ekran ładowania
          <div className="flex flex-1 items-center justify-center text-slate-500 animate-pulse font-medium">
            Zarzucono wędkę... pobieranie bazy ryb z serwera...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFish.length > 0 ? (
              filteredFish.map((fish) => {
                const placeholderImageUrl = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(fish.name)}`

                return (
                  <Link
                    to={`/katalog-ryb/${fish.id}`}
                    key={fish.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                      <img 
                        src={placeholderImageUrl} 
                        alt={`Zdjęcie ryby ${fish.name}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        {fish.is_predator ? (
                          <span className="bg-red-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            Drapieżnik
                          </span>
                        ) : (
                          <span className="bg-emerald-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            Spokojnego żeru
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {fish.name}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {fish.description || "Brak opisu tego gatunku w bazie danych. Administrator uzupełni te informacje wkrótce."}
                      </p>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                  <Fish className="size-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Brak wyników</h3>
                <p className="text-slate-500 max-w-md">
                  Niestety, nie znaleźliśmy w bazie ryby pasującej do hasła <span className="font-semibold text-slate-700">"{searchQuery}"</span>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    
      <div className="mt-auto pt-8">
        <PageFooter />
      </div>
    </main>
  )
}
