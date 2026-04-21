import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Demonstração
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Dashboard demonstrativo
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-10">
            Veja um exemplo de dashboard e navegue pelos indicadores. O link abre em nova aba para você não perder
            o contexto da Click Dev.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
              asChild
            >
              <a href="https://www.fastshopping.net/dashboard" target="_blank" rel="noopener noreferrer">
                Abrir dashboard demonstrativo
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o site
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

