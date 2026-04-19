import { ClipboardList } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function WorkOrdersPage() {
  return (
    <PcmModulePlaceholder
      icon={ClipboardList}
      title="Ordens de serviço"
      description="Acompanhe e gerencie OS corretivas, preventivas e inspeções."
    />
  )
}
