import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { assetById } from "@/lib/mock-data/assets"

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const decoded = decodeURIComponent(id)
  const asset = assetById(decoded)
  if (!asset) notFound()

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
          <Link href="/assets">
            <ArrowLeft className="mr-2 size-4" />
            Ativos
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/assets/${encodeURIComponent(asset.id)}/edit`}>
            <Pencil className="mr-2 size-4" />
            Editar
          </Link>
        </Button>
      </div>
      <div>
        <p className="font-mono text-sm font-bold text-muted-foreground">
          {asset.tag}
        </p>
        <h1 className="text-2xl font-bold tracking-tight">{asset.name}</h1>
        <p className="text-muted-foreground">
          Detalhes do ativo — página de demonstração.
        </p>
      </div>
    </div>
  )
}
