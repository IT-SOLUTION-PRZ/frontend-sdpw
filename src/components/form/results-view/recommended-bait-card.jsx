import { useState } from "react" 
import { Fish, ThumbsUp, ThumbsDown } from "lucide-react" 
import { toast } from "sonner" 
import { FormCardContainer } from "@/components/form/form-card-container"
import { CardContent } from "@/components/ui/card"
import { authFetch } from "@/lib/auth-fetch"
import { API_BASE_URL } from "@/lib/api-config"

export function RecommendedBaitCard({ result }) {
  let recommendations;

  if (Array.isArray(result)) {
    recommendations = result;
  } else if (result) {
    recommendations = [result];
  } else {
    recommendations = [];
  }

  const count = recommendations.length
  const [votes, setVotes] = useState({})

  const handleVote = async (historyId, ratingValue) => {
    if (!historyId) return

    try {
      const res = await authFetch(`${API_BASE_URL}/api/v1/history/${historyId}/rate/`, {
        method: "PATCH",
        body: JSON.stringify({ rating: ratingValue }),
      })

      if (res.ok) {
        setVotes((prev) => ({ ...prev, [historyId]: ratingValue }))
        toast.success("Dziękujemy za Twoją opinię!")

      } else {
        toast.error("Nie udało się zapisać oceny.")
      }
    } catch (e) {
      toast.error("Wystąpił błąd podczas wysyłania opinii.")
    }
  }

  async function addFavourite(rec) {
    var nazwa = prompt("Podaj nazwe do zapisu");
    try {
      const res = await authFetch(`${API_BASE_URL}/api/v1/favourite/set/`, {
        method: "POST",
        body: JSON.stringify({
          id: rec.id,
          name: nazwa
        }),
      });
      if (res.ok) {
        alert("dodano do ulubionych :3")
      } else {
        alert("Wystąpił błąd podczas zapisu do ulubionych (odmowa serwera)");
      }
    } catch (e) {
      alert("Wystąpił błąd: " + e)
    }
  }

  return (
    <FormCardContainer className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
        <div className="flex items-start gap-3">
          <Fish className="mt-0.5 size-5 text-blue-500" />
          <div className="space-y-1">
            <h2 className="type-title text-slate-900">Rekomendowane przynęty</h2>
            <p className="type-body text-slate-500">
              Znaleziono {count} rekomendacj{count === 1 ? "ę" : count < 5 ? "e" : "i"} dopasowan{count === 1 ? "ą" : "ych"} do wybranych warunków
            </p>
          </div>
        </div>
      </div>

      <CardContent className="space-y-4 p-6">
        {recommendations.map((rec, index) => {
          const bait = rec?.bait_details || {}
          const historyId = rec?.history_id
          const currentVote = votes[historyId]

          return (
            <article
              key={rec?.id ?? index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <button onClick={() => addFavourite(rec)}>dodaj do ulubionych</button>
              <div className="flex items-start gap-4">
                <div className="type-caption flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className="type-title text-slate-900">
                    {bait.name || "Nieznana przynęta"}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="type-caption rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
                      {bait.producer_name || "Nieznany producent"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="type-body mt-4 text-slate-700">
                {bait.description || "Brak opisu przynęty."}
              </p>

              <p className="type-body mt-3 text-slate-700">
                <span className="font-semibold text-slate-900">Wskazówki użycia: </span>
                {bait.usage_tips || "Brak wskazówek użycia."}
              </p>

              {/* Wyświetla dodatkowe info, tylko jeśli API je zwróciło */}
              {rec?.additional_info && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="type-body mb-2 font-semibold text-slate-900">Dodatkowe informacje</p>
                  <p className="type-body text-slate-700">
                    {rec.additional_info}
                  </p>
                </div>
              )}
              {historyId && (
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-medium text-slate-500">
                    Czy ta rekomendacja była trafna?
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {}
                    <button
                      onClick={() => handleVote(historyId, 1)}
                      disabled={currentVote !== undefined} 
                      className={`flex size-9 items-center justify-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
                        currentVote === 1
                          ? "bg-green-100 text-green-700" 
                          : currentVote === -1
                          ? "bg-slate-50 text-slate-300" 
                          : "bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-600"
                      }`}
                      aria-label="Trafna rekomendacja"
                    >
                      <ThumbsUp className="size-4" />
                    </button>
                    
                    {}
                    <button
                      onClick={() => handleVote(historyId, -1)}
                      disabled={currentVote !== undefined} 
                      className={`flex size-9 items-center justify-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
                        currentVote === -1
                          ? "bg-red-100 text-red-700" 
                          : currentVote === 1
                          ? "bg-slate-50 text-slate-300" 
                          : "bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      }`}
                      aria-label="Nietrafna rekomendacja"
                    >
                      <ThumbsDown className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </CardContent>
    </FormCardContainer>
  )
}