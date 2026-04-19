import { FileCheck } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function CalibrationPlansPage() {
  return (
    <PcmModulePlaceholder
      icon={FileCheck}
      title="Plano metrológico"
      description="Planejamento e controle de calibrações e rastreabilidade."
    />
  )
}
