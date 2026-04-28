import { ShieldCheck } from "lucide-react"

export function AdminPage() {
  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-190 items-center justify-center">
        <div className="w-full max-w-130 rounded-3xl border border-slate-200 bg-white/95 p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-indigo-100 text-[#070224]">
            <ShieldCheck className="size-8" />
          </div>

          <p className="type-caption mb-2 font-semibold uppercase tracking-wide text-slate-500">Panel admina</p>
          <h1 className="type-display text-balance text-slate-900">Witaj w panelu administracyjnym</h1>
          <p className="type-body mt-3 text-balance text-slate-500">
            Ta strona jest chroniona i dostępna tylko dla użytkowników z flagami is_staff oraz is_superuser.
          </p>
        </div>
      </section>
    </main>
  )
}
