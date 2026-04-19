import { Settings } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function SettingsIndexPage() {
  return (
    <PcmModulePlaceholder
      icon={Settings}
      title="Configurações"
      description="Preferências gerais do sistema e do usuário."
    />
  )
}
