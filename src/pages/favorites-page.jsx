import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, FileDown, Heart, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DeleteFavoriteDialog } from "@/components/favorites/delete-favorite-dialog"
import { PageFooter } from "@/components/layout/page-footer"
import { useUserFavorites } from "@/hooks/use-user-favorites"
import { downloadFavoritesPdf } from "@/lib/favorites-pdf"

export function FavoritesPage() {
  const { favorites, isLoading, removeFavorite } = useUserFavorites()
  const favList = favorites.favList ?? []
  const hasFavorites = favList.length > 0

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function confirmDelete() {
    if (!deleteTarget?.id) {
      return
    }

    setIsDeleting(true)
    const result = await removeFavorite(deleteTarget.id)
    setIsDeleting(false)

    if (result.success) {
      toast.success("Usunięto zestaw z ulubionych.")
      setDeleteTarget(null)
    } else {
      toast.error(result.message || "Nie udało się usunąć zestawu.")
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#ecf3f7] flex items-center justify-center px-4 py-6 sm:py-8">
        <p className="text-slate-500 font-semibold">Ładowanie ulubionych...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8 flex flex-col">
      <div className="max-w-4xl mx-auto flex-1 w-full">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full bg-white border-slate-200">
              <Link to="/">
                <ArrowLeft className="size-4 mr-2" />
                Wróć
              </Link>
            </Button>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Heart className="size-6 text-rose-500 fill-rose-500/20" />
              Ulubione zestawy
            </h1>
          </div>

          {hasFavorites && (
            <Button
              type="button"
              onClick={() => downloadFavoritesPdf(favList)}
              className="h-11 rounded-full bg-[#070224] px-5 text-white hover:bg-[#070224]/90"
            >
              <FileDown className="size-4 mr-2" />
              Pobierz raport PDF
            </Button>
          )}
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold text-slate-700">Nazwa</th>
                  <th className="p-4 font-semibold text-slate-700">Ryba</th>
                  <th className="p-4 font-semibold text-slate-700">Przynęta</th>
                  <th className="p-4 font-semibold text-slate-700">Woda</th>
                  <th className="p-4 font-semibold text-slate-700">Pora roku</th>
                  <th className="p-4 font-semibold text-slate-700 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {hasFavorites ? (
                  favList.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-slate-900">{record.name}</td>
                      <td className="p-4 text-slate-600">{record.fish}</td>
                      <td className="p-4 text-slate-600">{record.bait}</td>
                      <td className="p-4 text-slate-600">{record.water}</td>
                      <td className="p-4 text-slate-600">{record.season}</td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(record)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-200/80 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-100"
                          aria-label={`Usuń zestaw ${record.name}`}
                        >
                          <Trash2 className="size-4" />
                          <span className="hidden sm:inline">Usuń</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">
                      Nie masz jeszcze żadnych ulubionych zestawów.
                      <br />
                      <span className="text-sm">
                        Zapisz rekomendację na stronie głównej przyciskiem „Zapisz”.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteFavoriteDialog
        open={Boolean(deleteTarget)}
        onClose={() => {
          if (!isDeleting) {
            setDeleteTarget(null)
          }
        }}
        favoriteName={deleteTarget?.name}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />

      <div className="mt-8 max-w-4xl mx-auto w-full">
        <PageFooter />
      </div>
    </main>
  )
}
