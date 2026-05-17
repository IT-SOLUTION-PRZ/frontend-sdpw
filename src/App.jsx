import { Navigate, Route, Routes, Link } from "react-router-dom"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { StaffSuperuserMiddleware } from "@/components/staff-superuser-middleware"
import { AuthMiddleware } from "@/components/auth-middleware" // <-- Twój nowy strażnik
import { getAccessToken } from "@/lib/auth-storage" // <-- Do sprawdzania logowania dla linku

import { AdminPage } from "@/pages/admin-page"
import { HomePage } from "@/pages/home-page"
import { LoginPage } from "@/pages/login-page"
import { HistoryPage } from "@/pages/history-page"
import { FavoritesPage } from "@/pages/favorites-page"

import { FishCatalogPage } from "@/pages/fish-catalog-page"
import { FishDetailPage } from "@/pages/fish-detail-page"
import { BaitCatalogPage } from "@/pages/bait-catalog-page"
import { BaitDetailPage } from "@/pages/bait-detail-page"

export default function App() {
  // Sprawdzamy czy użytkownik jest zalogowany, żeby ew. ukryć linki
  const isAuthenticated = !!getAccessToken()

  return (
    <>
      <ThemeToggle />

      <nav className="p-4">
        {/* Link do ulubionych pokaże się TYLKO jeśli jesteśmy zalogowani */}
        {isAuthenticated && (
          <Link to="/favorites" className="text-blue-600 hover:underline">Ulubione</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/history" element={<HistoryPage />} />
        
        {/* ZABEZPIECZONA STRONA ULUBIONYCH */}
        <Route 
          path="/favorites" 
          element={
            <AuthMiddleware>
              <FavoritesPage />
            </AuthMiddleware>
          } 
        />
        
        <Route path="/katalog-ryb" element={<FishCatalogPage />} />
        <Route path="/katalog-ryb/:id" element={<FishDetailPage />} />

        <Route path="/katalog-przynet" element={<BaitCatalogPage />} />
        <Route path="/katalog-przynet/:id" element={<BaitDetailPage />} />
        
        <Route
          path="/admin"
          element={
            <StaffSuperuserMiddleware>
              <AdminPage />
            </StaffSuperuserMiddleware>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}