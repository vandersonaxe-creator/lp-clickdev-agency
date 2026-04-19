import Link from "next/link"
import { ArrowLeft, CalendarClock } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"
import { Button } from "@/components/ui/button"

export default function NewPlanPage() {
  return (
    <div className="space-y-6 px-4 lg:px-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href="/plans">
          <ArrowLeft className="mr-2 size-4" />
          Planos
        </Link>
      </Button>
      <PcmModulePlaceholder
        icon={CalendarClock}
        title="Novo plano preventivo"
        description="Assistente de cadastro — em construção."
      />
    </div>
  )
}
