import { useEffect, useState } from "react"
import { Button } from "./button" 

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    const theme = localStorage.getItem("theme") || "light"
    
    if (theme === "dark") {
      root.classList.add("dark")
      setIsDark(true)
    } else {
      root.classList.remove("dark")
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-md z-50 transition-all hover:scale-110 bg-white text-slate-900 dark:bg-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  )
}