import { useEffect, useState } from "react"
import { Bookmark, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function buildFavoriteSetName(selectedLabels, baitName) {
  const fish = selectedLabels?.fish_species_id
  const season = selectedLabels?.season_id

  if (fish && baitName) {
    return season ? `${fish} – ${baitName} (${season})` : `${fish} – ${baitName}`
  }
  if (fish) {
    return season ? `${fish} (${season})` : fish
  }
  return baitName ? `Zestaw: ${baitName}` : ""
}

export function SaveFavoriteDialog({
  open,
  onClose,
  defaultName = "",
  baitName = "",
  onConfirm,
  isSaving = false,
}) {
  const [name, setName] = useState(defaultName)

  useEffect(() => {
    if (open) {
      setName(defaultName)
    }
  }, [open, defaultName])

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      return
    }
    onConfirm(trimmed)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-favorite-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
        aria-label="Zamknij"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 bg-gradient-to-r from-rose-50 to-white px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <Bookmark className="size-5" />
              </span>
              <div>
                <h2 id="save-favorite-title" className="text-lg font-bold text-slate-900">
                  Zapisz do ulubionych
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Nadaj nazwę zestawowi z przynętą
                  {baitName ? (
                    <span className="font-semibold text-slate-800"> {baitName}</span>
                  ) : null}{" "}
                  i warunkami łowienia.
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

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="favorite-set-name" className="text-sm font-semibold text-slate-800">
              Nazwa zestawu
            </Label>
            <Input
              id="favorite-set-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="np. Szczupak na wiosnę – wobler"
              className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-rose-200"
              autoFocus
              maxLength={120}
            />
            <p className="text-xs text-slate-500">
              Zapiszesz aktualną rekomendację wraz z wybranymi warunkami połowu.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
              className="h-10 rounded-full border-slate-200"
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !name.trim()}
              className="h-10 rounded-full bg-rose-600 text-white hover:bg-rose-700"
            >
              {isSaving ? "Zapisywanie…" : "Zapisz zestaw"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
