import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useCurrentUser } from "@/hooks/use-current-user"

export function AuthMiddleware({
  children,
  loginRedirectTo = "/login",
}) {
  const location = useLocation()
  const { user, loading } = useCurrentUser()

  // 1. Czekamy na pobranie danych użytkownika z serwera
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#ecf3f7] px-4">
        <div
          className="type-body rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 font-semibold text-slate-600 shadow-sm"
          role="status"
          aria-live="polite"
        >
          Sprawdzanie uprawnień...
        </div>
      </main>
    )
  }

  // 2. Jeśli gość nie jest zalogowany (brak usera), odsyłamy do logowania
  if (!user) {
    return <Navigate to={loginRedirectTo} replace state={{ from: location }} />
  }

  // 3. Jeśli dotarł tutaj, to znaczy, że jest zwykłym, zalogowanym użytkownikiem - Wpuszczamy!
  return children ?? <Outlet />
}