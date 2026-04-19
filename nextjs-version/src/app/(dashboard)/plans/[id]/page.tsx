import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarClock, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { planById } from "@/lib/mock-data/plans"

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const plan = planById(decodeURIComponent(id))
  if (!plan) notFound()

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
          <Link href="/plans">
            <ArrowLeft className="mr-2 size-4" />
            Planos
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/plans/${encodeURIComponent(plan.id)}/edit`}>
            <Pencil className="mr-2 size-4" />
            Editar
          </Link>
        </Button>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 text-blue-600">
          <CalendarClock className="size-7" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-mono text-sm font-bold text-muted-foreground">
            {plan.tag}
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight">{plan.name}</h1>
          <p className="text-sm text-muted-foreground">
            Detalhes do plano — demonstração.
          </p>
        </div>
      </div>
    </div>
  )
}
