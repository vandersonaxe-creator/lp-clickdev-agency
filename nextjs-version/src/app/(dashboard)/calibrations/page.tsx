import { Gauge } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function CalibrationsPage() {
  return (
    <PcmModulePlaceholder
      icon={Gauge}
      title="Metrologia"
      description="Instrumentos, status de calibração e conformidade."
    />
  )
}
