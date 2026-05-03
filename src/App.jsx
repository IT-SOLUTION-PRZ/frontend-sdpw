import { Navigate, Route, Routes } from "react-router-dom"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { StaffSuperuserMiddleware } from "@/components/staff-superuser-middleware"
import { AdminPage } from "@/pages/admin-page"
import { HomePage } from "@/pages/home-page"
import { LoginPage } from "@/pages/login-page"
import { HistoryPage } from "@/pages/history-page"

import { FishCatalogPage } from "@/pages/fish-catalog-page"
import { FishDetailPage } from "@/pages/fish-detail-page"
import { BaitCatalogPage } from "@/pages/bait-catalog-page"
import { BaitDetailPage } from "@/pages/bait-detail-page"

export default function App() {
  return (
    <>
      <ThemeToggle />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/history" element={<HistoryPage />} />
        
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