import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function NewWorkOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ asset_id?: string }>
}) {
  const sp = await searchParams
  const aid = sp.asset_id

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href="/work-orders">Voltar</Link>
      </Button>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Nova Ordem de Serviço
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Formulário placeholder — defina tipo, ativo, prioridade e data programada.
        </p>
        {aid ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Ativo sugerido:{" "}
            <span className="font-mono font-semibold text-foreground">
              {decodeURIComponent(aid)}
            </span>
          </p>
        ) : null}
      </div>
      <div className="max-w-lg space-y-4 rounded-xl border border-dashed border-border bg-card/40 p-6">
        <div className="space-y-2">
          <Label htmlFor="wo-title">Título</Label>
          <Input id="wo-title" placeholder="Ex.: Preventiva compressor..." disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wo-asset">Ativo (tag)</Label>
          <Input
            id="wo-asset"
            placeholder="GER-001"
            defaultValue={aid ? decodeURIComponent(aid) : ""}
            disabled
          />
        </div>
        <Button type="button" disabled>
          Salvar (em desenvolvimento)
        </Button>
      </div>
    </div>
  )
}
