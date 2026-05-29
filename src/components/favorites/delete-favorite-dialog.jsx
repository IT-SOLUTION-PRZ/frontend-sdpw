import { useEffect } from "react"
import { Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DeleteFavoriteDialog({
  open,
  onClose,
  favoriteName = "",
  onConfirm,
  isDeleting = false,
}) {
  useEffect(() => {
    if (!open) {
      return undefined
    }
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-favorite-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
        aria-label="Zamknij"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Trash2 className="size-5" />
              </span>
              <div>
                <h2 id="delete-favorite-title" className="text-lg font-bold text-slate-900">
                  Usunąć zestaw?
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Zestaw{" "}
                  <span className="font-semibold text-slate-800">
                    {favoriteName || "bez nazwy"}
                  </span>{" "}
                  zostanie trwale usunięty z ulubionych.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Zamknij okno"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 p-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="h-10 rounded-full border-slate-200"
          >
            Anuluj
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-10 rounded-full bg-red-600 text-white hover:bg-red-700"
          >
            {isDeleting ? "Usuwanie…" : "Usuń zestaw"}
          </Button>
        </div>
      </div>
    </div>
  )
}
