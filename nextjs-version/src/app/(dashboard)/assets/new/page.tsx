import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NewAssetPage() {
  return (
    <div className="space-y-4 px-4 lg:px-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href="/assets">
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Novo ativo</h1>
        <p className="text-muted-foreground">
          Formulário de cadastro — em construção.
        </p>
      </div>
    </div>
  )
}
