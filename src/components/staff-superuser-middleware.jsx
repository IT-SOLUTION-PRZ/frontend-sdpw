import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useCurrentUser } from "@/hooks/use-current-user"
import { hasStaffSuperuserAccess } from "@/lib/has-staff-superuser-access"

export function StaffSuperuserMiddleware({
  children,
  loginRedirectTo = "/login",
  unauthorizedRedirectTo = "/",
}) {
  const location = useLocation()
  const { user, loading } = useCurrentUser()

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

  if (!user) {
    return <Navigate to={loginRedirectTo} replace state={{ from: location }} />
  }

  if (!hasStaffSuperuserAccess(user)) {
    return <Navigate to={unauthorizedRedirectTo} replace />
  }

  return children ?? <Outlet />
}
