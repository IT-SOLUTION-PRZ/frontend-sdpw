import { UserNavbar } from "@/components/layout/user-navbar"

export function LurePageHeader() {
  return (
    <header className="space-y-7">
      <nav className="flex w-full items-center justify-between gap-3 rounded-3xl border border-slate-200/80 bg-white/75 p-2.5 shadow-sm backdrop-blur sm:p-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 p-2 sm:size-14">
            <img src="/logo.png" alt="Logo aplikacji" className="size-8 object-contain sm:size-10" />
          </span>
          <p className="type-title font-bold tracking-tight text-slate-900">SDPW</p>
        </div>

        <div className="flex shrink-0 justify-end">
          <UserNavbar />
        </div>
      </nav>

      <div className="mx-auto max-w-160 space-y-3 px-1 text-center">
        <h1 className="type-display text-balance text-slate-900">System Doboru Przynęty Wędkarskiej</h1>
        <p className="type-body text-balance text-slate-500">
          Profesjonalne wsparcie w wyborze odpowiedniej przynęty do gatunku ryby i warunków połowu
        </p>
      </div>
    </header>
  )
}
