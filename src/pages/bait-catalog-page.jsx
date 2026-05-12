import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, ArrowLeft, Bug, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/api-config"
import { PageFooter } from "@/components/layout/page-footer"
import { TopStatisticBanner } from "@/components/catalog/top-statistic-banner"
import { useTopBait } from "@/hooks/use-tops-statistics"

export function BaitCatalogPage() {
  const [baitList, setBaitList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const topBait = useTopBait()

  useEffect(() => {
    const fetchBaits = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/baits/`)
        if (response.ok) {
          const data = await response.json()
          setBaitList(data)
        }
      } catch (error) {
        console.error("Błąd podczas pobierania przynęt:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBaits()
  }, [])

  const filteredBaits = baitList.filter((bait) =>
    bait.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bait.bait_type?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8 flex flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 flex-1">
        
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full bg-white border-slate-200">
              <Link to="/"><ArrowLeft className="size-4 mr-2" /> Wróć</Link>
            </Button>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Bug className="size-6 text-indigo-600" />
              Katalog Przynęt
            </h1>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              type="text"
              placeholder="Szukaj przynęty lub typu..."
              className="pl-9 rounded-full bg-white border-slate-200 focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        </header>

        <TopStatisticBanner
          icon={Trophy}
          label="Najczęściej wybierana przynęta"
          name={topBait?.name}
          to={topBait ? `/katalog-przynet/${topBait.id}` : ""}
          countText={`${topBait?.recommendation_count ?? 0} rekomendacji`}
        />

        {loading ? (
          <div className="flex flex-1 items-center justify-center text-slate-500 animate-pulse font-medium">
            Otwieranie pudełka wędkarskiego... pobieranie danych...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBaits.length > 0 ? (
              filteredBaits.map((bait) => {
                const imageUrl = bait.image_url || `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(bait.name)}`

                return (
                  <Link 
                    to={`/katalog-przynet/${bait.id}`} 
                    key={bait.id} 
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                      <img 
                        src={imageUrl} 
                        alt={`Zdjęcie przynęty ${bait.name}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {bait.bait_type && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-amber-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            {bait.bait_type}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">
                        {bait.name}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-600 mb-2">
                        {bait.producer_name || "Producent: Nieznany"}
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {bait.description || "Brak opisu dla tej przynęty."}
                      </p>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                  <Bug className="size-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Brak wyników</h3>
                <p className="text-slate-500 max-w-md">Nie znaleźliśmy przynęty pasującej do "{searchQuery}".</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-auto pt-8"><PageFooter /></div>
    </main>
  )
}
