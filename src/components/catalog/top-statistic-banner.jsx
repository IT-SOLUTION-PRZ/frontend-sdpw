import { Link } from "react-router-dom"

export function TopStatisticBanner({ icon: Icon, label, name, to, countText }) {
  if (!name || !to) {
    return null
  }

  return (
    <Link
      to={to}
      className="flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-white/80 px-5 py-4 shadow-sm transition hover:border-indigo-200 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          {Icon && <Icon className="size-5" />}
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
            {label}
          </p>
          <p className="text-lg font-extrabold text-slate-900">{name}</p>
        </div>
      </div>
      <span className="text-sm font-semibold text-slate-500">
        {countText}
      </span>
    </Link>
  )
}
