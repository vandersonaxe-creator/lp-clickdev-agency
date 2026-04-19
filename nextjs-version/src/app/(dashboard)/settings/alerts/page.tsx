import { AlertTriangle } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function SettingsAlertsPage() {
  return (
    <PcmModulePlaceholder
      icon={AlertTriangle}
      title="Alertas"
      description="Regras e canais de alertas do PCM."
    />
  )
}
