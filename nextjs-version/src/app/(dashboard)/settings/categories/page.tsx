import { Tag } from "lucide-react"

import { PcmModulePlaceholder } from "@/components/pcm/pcm-module-placeholder"

export default function SettingsCategoriesPage() {
  return (
    <PcmModulePlaceholder
      icon={Tag}
      title="Categorias"
      description="Classificação de ativos, falhas e tipos de ordem de serviço."
    />
  )
}
