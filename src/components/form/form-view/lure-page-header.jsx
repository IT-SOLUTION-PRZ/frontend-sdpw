import { Fish } from "lucide-react"

export function LurePageHeader() {
  return (
    <header className="space-y-3 text-center">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-3">
        <span className="flex size-24 shrink-0 items-center justify-center rounded-full bg-indigo-100 p-2 text-indigo-600">
          <Fish className="size-20" />
        </span>
        <h1 className="mx-auto text-center text-xl font-bold tracking-tight text-slate-900 sm:text-[42px] sm:leading-[1.12]">
          System Doboru Przynęty Wędkarskiej
        </h1>
        <span className="invisible size-24 shrink-0" aria-hidden="true" />
      </div>
      <p className="mx-auto max-w-160 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        Profesjonalne wsparcie w wyborze odpowiedniej przynęty do gatunku ryby i warunków połowu
      </p>
    </header>
  )
}
