import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { WORK_ORDERS_MOCK } from "@/lib/mock-data/work-orders"

export default async function WorkOrderReportPage({
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
        <Link href={`/work-orders/${encodeURIComponent(wo.id)}`}>Voltar à OS</Link>
      </Button>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Relatório</h1>
        <p className="mt-1 font-mono text-sm text-primary">{wo.wo_number}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Impressão e PDF da ordem de serviço — placeholder.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card/50 p-8 text-center text-muted-foreground">
        Pré-visualização do relatório (mock).
      </div>
    </div>
  )
}
