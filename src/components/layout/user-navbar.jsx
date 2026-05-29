import { ChevronDown, LogIn, LogOut, Settings, ShieldCheck, UserRound, History, Fish, BookOpen, Heart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { hasStaffSuperuserAccess } from "@/lib/has-staff-superuser-access"

export function UserNavbar() {
  const { user, loading, logout } = useCurrentUser()
  const navigate = useNavigate() 

  const handleLogout = async () => {
    await logout() // 1. Najpierw czyścimy tokeny
    navigate("/")  // 2. Przenosimy usera na stronę główną
    window.location.reload()
  }

  if (loading) {
    return (
      <div
        className="h-11 w-11 animate-pulse rounded-full border border-slate-200 bg-white/70 shadow-sm sm:w-36"
        aria-label="Sprawdzanie statusu logowania"
      />
    )
  }

  if (!user) {
    return (
      <Button
        asChild
        variant="outline"
        className="type-caption h-11 rounded-full border-slate-200 bg-white/85 px-3 font-semibold text-slate-700 shadow-sm hover:bg-white hover:text-slate-950"
      >
        <Link to="/login" aria-label="Przejdź do logowania">
          <LogIn className="size-4" />
          <span className="hidden sm:inline">Zaloguj</span>
        </Link>
      </Button>
    )
  }

  const canAccessAdmin = hasStaffSuperuserAccess(user)

  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="outline"
        className="type-caption h-11 rounded-full border-rose-200/80 bg-gradient-to-r from-rose-50 to-white px-3.5 font-semibold text-rose-700 shadow-sm transition-all hover:border-rose-300 hover:from-rose-100 hover:to-rose-50 hover:text-rose-800 hover:shadow-md"
      >
        <Link to="/favorites" aria-label="Przejdź do ulubionych rekomendacji">
          <Heart className="size-4 fill-rose-500/20 text-rose-600" />
          <span className="hidden sm:inline">Ulubione</span>
        </Link>
      </Button>

    <details className="group relative">
      <summary
        className="type-caption flex h-11 w-fit max-w-36 cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-2 pr-2.5 font-semibold text-slate-700 shadow-sm outline-none transition-colors hover:bg-white hover:text-slate-950 focus-visible:ring-3 focus-visible:ring-ring/50 sm:max-w-44 [&::-webkit-details-marker]:hidden"
        aria-label={`Menu użytkownika ${user.username}`}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-[#070224] text-white">
          <UserRound className="size-4" />
        </span>
        <span className="hidden min-w-0 max-w-16 truncate sm:inline md:max-w-24">{user.username}</span>
        <ChevronDown className="hidden size-4 transition-transform group-open:rotate-180 sm:block" />
      </summary>

      <div className="absolute right-0 z-20 mt-2 w-56 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-xl">
        <div className="border-b border-slate-100 px-3 py-2">
          <p className="type-caption font-semibold text-slate-900">{user.username}</p>
          <p className="truncate text-xs text-slate-500">{user.email}</p>
        </div>
        <div className="md:hidden border-b border-slate-100 pb-2 mb-2">
          <Link
            to="/katalog-ryb"
            className="type-caption mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-600 outline-none transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            <Fish className="size-4" />
            Katalog Ryb
          </Link>
          <Link
            to="/katalog-przynet"
            className="type-caption mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-600 outline-none transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            <BookOpen className="size-4" />
            Katalog Przynęt
          </Link>
        </div>

        <Link
          to="/favorites"
          className="type-caption mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-rose-700 outline-none transition-colors hover:bg-rose-50 hover:text-rose-900 focus-visible:ring-3 focus-visible:ring-rose-200/50"
          aria-label="Ulubione rekomendacje"
        >
          <Heart className="size-4 fill-rose-500/20" />
          Ulubione
        </Link>

        <Link
          to="/history"
          className="type-caption mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-600 outline-none transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Historia wyszukiwań"
        >
          <History className="size-4" />
          Historia zapytań
        </Link>

        {canAccessAdmin ? (
          <Link
            to="/admin"
            className="type-caption mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-600 outline-none transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Przejdź do panelu admina"
          >
            <ShieldCheck className="size-4" />
            Panel admina
          </Link>
        ) : null}

        <button
          type="button"
          className="type-caption flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-400 outline-none transition-colors"
          aria-label="Ustawienia profilu, funkcja dostępna wkrótce"
          disabled
        >
          <Settings className="size-4" />
          Ustawienia wkrótce
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="type-caption flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-red-600 outline-none transition-colors hover:bg-red-50 focus-visible:ring-3 focus-visible:ring-red-200"
        >
          <LogOut className="size-4" />
          Wyloguj
        </button>
      </div>
    </details>
    </div>
  )
}