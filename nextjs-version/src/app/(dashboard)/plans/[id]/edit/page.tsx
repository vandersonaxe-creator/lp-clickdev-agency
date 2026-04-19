import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { planById } from "@/lib/mock-data/plans"

export default async function PlanEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const plan = planById(decodeURIComponent(id))
  if (!plan) notFound()

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href={`/plans/${encodeURIComponent(plan.id)}`}>
          <ArrowLeft className="mr-2 size-4" />
          Voltar ao plano
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar {plan.tag}</h1>
        <p className="text-muted-foreground">Formulário — em construção.</p>
      </div>
    </div>
  )
}
