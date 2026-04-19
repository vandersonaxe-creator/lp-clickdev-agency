import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { assetById } from "@/lib/mock-data/assets"

export default async function AssetEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const decoded = decodeURIComponent(id)
  const asset = assetById(decoded)
  if (!asset) notFound()

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href={`/assets/${encodeURIComponent(asset.id)}`}>
          <ArrowLeft className="mr-2 size-4" />
          Voltar ao ativo
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar {asset.tag}</h1>
        <p className="text-muted-foreground">Formulário — em construção.</p>
      </div>
    </div>
  )
}
