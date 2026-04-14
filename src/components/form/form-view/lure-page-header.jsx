import { Fish } from "lucide-react"

export function LurePageHeader() {
  return (
    <header className="space-y-3 text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="rounded-full bg-indigo-100 p-2 text-indigo-600">
          <Fish className="size-20" />
        </span>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-[42px] sm:leading-[1.12]">
          System Doboru Przynęty Wędkarskiej
        </h1>
      </div>
      <p className="mx-auto max-w-160 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        Profesjonalne wsparcie w wyborze odpowiedniej przynęty do gatunku ryby i warunków połowu
      </p>
    </header>
  )
}
