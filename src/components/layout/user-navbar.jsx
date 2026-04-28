import { ChevronDown, LogIn, LogOut, Settings, ShieldCheck, UserRound } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"

export function UserNavbar() {
  const { user, loading, logout } = useCurrentUser()

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
        className="type-caption h-11 rounded-full border-slate-200 bg-white/85 px-3 font-semibold text-slate-700 shadow-sm hover:bg-white hover:text-slate-950 sm:px-4"
      >
        <Link to="/login" aria-label="Przejdź do logowania">
          <LogIn className="size-4" />
          <span className="hidden sm:inline">Zaloguj</span>
        </Link>
      </Button>
    )
  }

  return (
    <details className="group relative">
      <summary
        className="type-caption flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-2 pr-2.5 font-semibold text-slate-700 shadow-sm outline-none transition-colors hover:bg-white hover:text-slate-950 focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-2.5 sm:pr-3 [&::-webkit-details-marker]:hidden"
        aria-label={`Menu użytkownika ${user.username}`}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-[#070224] text-white">
          <UserRound className="size-4" />
        </span>
        <span className="hidden max-w-28 truncate sm:inline">{user.username}</span>
        <ChevronDown className="hidden size-4 transition-transform group-open:rotate-180 sm:block" />
      </summary>

      <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-xl">
        <div className="border-b border-slate-100 px-3 py-2">
          <p className="type-caption font-semibold text-slate-900">{user.username}</p>
          <p className="truncate text-xs text-slate-500">{user.email}</p>
        </div>

        {user.is_staff ? (
          <a
            href="/admin/"
            className="type-caption mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-600 outline-none transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ShieldCheck className="size-4" />
            Panel admina
          </a>
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
          onClick={logout}
          className="type-caption flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-red-600 outline-none transition-colors hover:bg-red-50 focus-visible:ring-3 focus-visible:ring-red-200"
        >
          <LogOut className="size-4" />
          Wyloguj
        </button>
      </div>
    </details>
  )
}
