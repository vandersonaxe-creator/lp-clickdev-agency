import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { WORK_ORDERS_MOCK } from "@/lib/mock-data/work-orders"

export default async function WorkOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const decoded = decodeURIComponent(id)
  const wo = WORK_ORDERS_MOCK.find((w) => w.id === decoded)
  if (!wo) notFound()

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href="/work-orders">Voltar</Link>
      </Button>
      <div>
        <p className="font-mono text-sm font-bold text-primary">{wo.wo_number}</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{wo.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {wo.tag} · {wo.asset} — detalhe em construção (mock).
        </p>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
        Aqui entrará o fluxo operacional da OS (checklist, peças, fotos, assinatura
        digital).
      </div>
      <Button asChild variant="outline">
        <Link href={`/work-orders/${encodeURIComponent(wo.id)}/report`}>
          Ver relatório
        </Link>
      </Button>
    </div>
  )
}
