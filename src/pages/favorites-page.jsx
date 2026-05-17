import { Link } from "react-router-dom"
import { useUserFavorites } from "@/hooks/use-user-favorites"

export function FavoritesPage() {
  const { favorites, isLoading } = useUserFavorites()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#ecf3f7] flex items-center justify-center px-4 py-6 sm:py-8">
        <p className="text-slate-500 font-semibold">Ładowanie ulubionych...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline font-medium">
          &larr; Wróć do strony głównej
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">Nazwa</th>
                <th className="p-4 font-semibold text-slate-700">Ryba</th>
                <th className="p-4 font-semibold text-slate-700">Przynęta</th>
                <th className="p-4 font-semibold text-slate-700">Woda</th>
                <th className="p-4 font-semibold text-slate-700">Pora roku</th>
              </tr>
            </thead>
            <tbody>
              {favorites.favList && favorites.favList.length > 0 ? (
                favorites.favList.map((record, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{record.name}</td>
                    <td className="p-4 text-slate-600">{record.fish}</td>
                    <td className="p-4 text-slate-600">{record.bait}</td>
                    <td className="p-4 text-slate-600">{record.water}</td>
                    <td className="p-4 text-slate-600">{record.season}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    Nie masz jeszcze żadnych ulubionych zestawów.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}