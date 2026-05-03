export function PageFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="type-caption border-t border-slate-200/80 pt-4 text-center text-slate-500">
      <p>Copyright © {year} Politechnika Rzeszowska.</p>
    </footer>
  )
}
