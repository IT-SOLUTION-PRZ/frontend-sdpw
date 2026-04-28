import { UserNavbar } from "@/components/layout/user-navbar"

export function LurePageHeader() {
  return (
    <header className="space-y-2 text-center sm:space-y-3">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 p-2 sm:size-24">
          <img src="/logo.png" alt="Logo aplikacji" className="size-9 object-contain sm:size-20" />
        </span>
        <h1 className="type-display mx-auto text-balance px-1 text-center text-slate-900">
          System Doboru Przynęty Wędkarskiej
        </h1>
        <div className="flex min-w-14 justify-end sm:min-w-24">
          <UserNavbar />
        </div>
      </div>
      <p className="type-body mx-auto max-w-160 px-1 text-slate-500">
        Profesjonalne wsparcie w wyborze odpowiedniej przynęty do gatunku ryby i warunków połowu
      </p>
    </header>
  )
}
