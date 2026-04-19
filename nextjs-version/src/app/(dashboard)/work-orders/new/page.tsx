import Link from "next/link"

import { Button } from "@/components/ui/button"

export default async function NewWorkOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ asset_id?: string }>
}) {
  const sp = await searchParams
  const aid = sp.asset_id

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href="/assets">Voltar</Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nova OS</h1>
        <p className="text-muted-foreground">
          {aid
            ? `Ativo vinculado: ${decodeURIComponent(aid)} (demonstração).`
            : "Criação de ordem de serviço — em construção."}
        </p>
      </div>
    </div>
  )
}
