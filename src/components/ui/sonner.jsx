import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => (
  <Sonner
    richColors
    closeButton
    toastOptions={{
      classNames: {
        toast: "type-body border-slate-200 bg-white text-slate-900 shadow-lg",
        description: "type-caption text-slate-500",
        actionButton: "bg-[#070224] text-white",
        cancelButton: "bg-slate-100 text-slate-700",
      },
    }}
    {...props}
  />
)

export { Toaster }
