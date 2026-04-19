import { Bell } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function SettingsNoticesPage() {
  return (
    <PcmModulePlaceholder
      icon={Bell}
      title="Avisos"
      description="Comunicados internos e avisos operacionais."
    />
  )
}
