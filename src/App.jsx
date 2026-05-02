import { Navigate, Route, Routes } from "react-router-dom"

import { StaffSuperuserMiddleware } from "@/components/staff-superuser-middleware"
import { AdminPage } from "@/pages/admin-page"
import { HomePage } from "@/pages/home-page"
import { LoginPage } from "@/pages/login-page"
import { HistoryPage } from "@/pages/history-page"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/history" element={<HistoryPage />} />
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
  )
}