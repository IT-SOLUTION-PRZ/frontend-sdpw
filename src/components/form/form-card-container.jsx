import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FormCardContainer({ children, className }) {
  return (
    <Card className={cn("w-full max-w-[720px] border-slate-200 bg-white/95 shadow-sm", className)}>
      {children}
    </Card>
  )
}
