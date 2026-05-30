import { History, ArrowLeft, Waves, Sun, Fish, Clock, Thermometer, Worm, ThumbsUp, ThumbsDown } from "lucide-react"
import { Link } from "react-router-dom"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageFooter } from "@/components/layout/page-footer"
import { useUserHistory } from "@/hooks/use-user-history"

export function HistoryPage() {
  const { history, loading, error } = useUserHistory()

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-2xl flex-col gap-8 sm:min-h-[calc(100vh-4rem)] sm:gap-9">
        <header className="flex items-center justify-between">
          <Button asChild variant="outline" className="gap-2 rounded-full bg-white/80 border-slate-200">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Wróć
            </Link>
          </Button>
          <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 bg-white/80 px-4 py-2 rounded-full border border-slate-200">
            <History className="size-5 text-[#2461df]" />
            Historia
          </h1>
        </header>

        <section className="flex flex-col gap-4 flex-1">
          {loading ? (
            <div className="flex h-40 items-center justify-center text-slate-500 font-medium animate-pulse">
              Ładowanie historii...
            </div>
          ) : error ? (
            <div className="flex h-40 flex-col items-center justify-center text-red-500 gap-2 bg-red-50 rounded-3xl border border-red-100 p-6 text-center">
              <p className="font-semibold text-red-700">Wystąpił błąd</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : history.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center shadow-sm border-slate-100">
              <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                <Fish className="size-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Brak wyników</h3>
              <p className="text-slate-500">Zrób swoje pierwsze zapytanie, a pojawi się tutaj.</p>
              <Button asChild className="mt-6 rounded-full bg-[#1b52c0] hover:bg-[#143e94] px-6">
                <Link to="/">Wyszukaj przynętę</Link>
              </Button>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {history.map((record) => (
                <Card key={record.id} className="overflow-hidden border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="border-b border-slate-50 bg-slate-50/50 px-4 py-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      {new Date(record.query_date).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {record.rating === 1 ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <ThumbsUp className="size-3" /> Polecane
                      </span>
                    ) : record.rating === -1 ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                        <ThumbsDown className="size-3" /> Nietrafione
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">Brak oceny</span>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-6 justify-between md:items-center">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <Fish className="size-5" />
                        </div>
                        <div>
                          <span className="text-lg font-bold text-slate-800">{record.fish_name}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                        {record.water_type_name && (
                          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                            <Waves className="size-3.5 text-blue-400" /> {record.water_type_name}
                          </span>
                        )}
                        {record.season_name && (
                          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                            <Sun className="size-3.5 text-orange-400" /> {record.season_name}
                          </span>
                        )}
                        {record.time_of_day_name && (
                          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                            <Clock className="size-3.5 text-indigo-400" /> {record.time_of_day_name}
                          </span>
                        )}
                        {record.water_clarity_name && (
                          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                            <Waves className="size-3.5 text-cyan-500 opacity-60" /> {record.water_clarity_name}
                          </span>
                        )}
                        {record.water_temperature_name && (
                          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                            <Thermometer className="size-3.5 text-red-400" /> {record.water_temperature_name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex w-full md:w-auto flex-col items-start md:items-end justify-center rounded-2xl bg-blue-50/60 px-5 py-4 border border-blue-100 shadow-sm mt-2 md:mt-0">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <Worm className="size-3.5" />
                        Polecana przynęta
                      </div>
                      <span className="text-base md:text-lg font-extrabold text-[#11295c] md:text-right">{record.bait_name || "Brak (nie znaleziono)"}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
        <PageFooter />
      </div>
    </main>
  )
}