import { useEffect, useState } from "react"
import { Button } from "./button" 

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    const theme = localStorage.getItem("theme") || 
                 (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    
    if (theme === "dark") {
      root.classList.add("dark")
      setIsDark(true)
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
      className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-md z-50 transition-all hover:scale-110"
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  )
}