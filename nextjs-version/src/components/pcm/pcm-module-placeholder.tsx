import type { LucideIcon } from "lucide-react"
import { Construction } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PcmModulePlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="space-y-6 px-4 pb-8 lg:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
          <Icon className="size-7" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Card className="border-border/80 bg-card">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0 sm:items-center">
          <Construction
            className="size-10 shrink-0 text-muted-foreground"
            strokeWidth={1.25}
          />
          <div className="space-y-1">
            <CardTitle className="text-lg">Módulo em desenvolvimento</CardTitle>
            <CardDescription>
              Esta área será preenchida nas próximas entregas do PCM Industrial.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent />
      </Card>
    </div>
  )
}
