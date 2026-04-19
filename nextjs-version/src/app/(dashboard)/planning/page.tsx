import { CalendarRange } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function PlanningPage() {
  return (
    <PcmModulePlaceholder
      icon={CalendarRange}
      title="Planejamento"
      description="Cronogramas, backlog preventivo e alocação de recursos."
    />
  )
}
