import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, ArrowLeft, Fish, Trophy , SlidersHorizontal, ArrowUpDown} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/api-config"
import { PageFooter } from "@/components/layout/page-footer"
import { TopStatisticBanner } from "@/components/catalog/top-statistic-banner"
import { useTopFish } from "@/hooks/use-tops-statistics"
import { getFishImageUrl, getFishCategoryBadge } from "@/lib/fish-category"

export function FishCatalogPage() {
  const [fishList, setFishList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  
  // 1. ZMIANA: Nowy stan odpowiadający kategorii z Django
  const [category, setCategory] = useState("") 
  const [sortOrder, setSortOrder] = useState("name")

  const topFish = useTopFish()

  useEffect(() => {
    const fetchFish = async () => {
      try {
        setLoading(true)
        // 2. ZMIANA: Zapytanie do API używa teraz parametru 'category' zamiast 'is_predator'
        const response = await fetch(`${API_BASE_URL}/api/v1/fish/?category=${encodeURIComponent(category)}&ordering=${sortOrder}`)
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
  }, [category, sortOrder]) // 3. ZMIANA: 'category' w tablicy zależności

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

        <section className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-xs">
          <div className="flex w-full sm:w-auto items-center gap-2 text-sm font-semibold text-slate-700">
            <SlidersHorizontal className="size-4 text-slate-500" />
            <span>Filtruj listę:</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full sm:flex sm:w-auto flex-1 justify-start">
            <div className="relative w-full sm:w-48">
              {/* 4. ZMIANA: Przeprojektowany select na stringi kategorii zamiast true/false */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none h-9 rounded-full border border-slate-200 bg-white px-4 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
              >
                <option value="">Wszystkie ryby</option>
                <option value="peaceful">Spokojnego żeru</option>
                <option value="predator">Drapieżniki</option>
                <option value="marine">Ryby morskie</option>
                <option value="salmonid">Salmonidy</option>
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-48">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full appearance-none h-9 rounded-full border border-slate-200 bg-white px-4 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
              >
                <option value="name">Nazwa: A do Z</option>
                <option value="-name">Nazwa: Z do A</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </section>

        <TopStatisticBanner
          icon={Trophy}
          label="Najczęściej wybierana ryba"
          name={topFish?.name}
          to={topFish ? `/katalog-ryb/${topFish.id}` : ""}
          countText={`${topFish?.search_count ?? 0} wyszukiwań`}
        />
        {loading ? (
          <div className="flex flex-1 items-center justify-center text-slate-500 animate-pulse font-medium">
            Zarzucono wędkę... pobieranie bazy ryb z serwera...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFish.length > 0 ? (
              filteredFish.map((fish) => {
                const imageUrl = getFishImageUrl(fish)
                const categoryBadge = getFishCategoryBadge(fish)

                return (
                  <Link
                    to={`/katalog-ryb/${fish.id}`}
                    key={fish.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                      <img 
                        src={imageUrl} 
                        alt={`Zdjęcie ryby ${fish.name}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`${categoryBadge.className} text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                          {categoryBadge.label}
                        </span>
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