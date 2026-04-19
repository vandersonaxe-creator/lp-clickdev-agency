"use client"

import { Building2 } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ACTIVITY_LOG = [
  {
    id: "1",
    text: "Vanderson atualizou dados da empresa",
    when: "há 2 dias",
  },
  {
    id: "2",
    text: "Carlos criou OS WO-2026-000034",
    when: "há 4 horas",
  },
  {
    id: "3",
    text: "Ana aprovou relatório WO-2026-000031",
    when: "há 1 dia",
  },
  {
    id: "4",
    text: "Sistema gerou 3 OS preventivas",
    when: "há 3 dias",
  },
  {
    id: "5",
    text: "Vanderson adicionou instrumento TRN-001",
    when: "há 5 dias",
  },
]

function ReadonlyField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-muted-foreground">{label}</Label>
      <Input readOnly disabled value={value} className="bg-muted/40" />
    </div>
  )
}

export function CompanySettingsContent() {
  return (
    <div className="flex flex-col gap-6 px-4 pb-8 lg:px-6">
      <div className="min-w-0 space-y-1">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-foreground">
          Dados da Empresa
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Informações da empresa utilizadas em relatórios e cabeçalhos
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
              <Building2 className="size-10 text-muted-foreground" />
            </div>
            <Button type="button" variant="secondary" size="sm">
              Alterar logo
            </Button>
          </div>
          <div className="grid min-w-0 flex-1 gap-4 sm:grid-cols-2">
            <ReadonlyField label="Razão Social" value="Forge Indústria Ltda" />
            <ReadonlyField label="Nome Fantasia" value="Forge Indústria" />
            <ReadonlyField label="CNPJ" value="00.000.000/0001-00" />
            <ReadonlyField label="Telefone" value="(22) 0000-0000" />
            <ReadonlyField label="E-mail" value="contato@forgeind.com.br" />
            <ReadonlyField label="Endereço" value="Rua Industrial, 500" />
            <ReadonlyField label="Cidade" value="Rio das Ostras" />
            <ReadonlyField label="Estado" value="RJ" />
            <div className="grid gap-2 sm:col-span-2">
              <Label className="text-muted-foreground">Plano</Label>
              <div>
                <Badge className="border-emerald-500/30 bg-emerald-600/15 text-emerald-800 dark:text-emerald-200">
                  Profissional
                </Badge>
              </div>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label className="text-muted-foreground">
                Contrato ativo desde
              </Label>
              <Input
                readOnly
                disabled
                value="Abril 2026"
                className="bg-muted/40"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end border-t border-border pt-6">
          <Button
            type="button"
            onClick={() =>
              toast("Funcionalidade disponível na versão completa")
            }
          >
            Editar dados
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-[16px] font-semibold text-foreground">
          Logs de Atividade
        </h2>
        <ol className="relative space-y-0 border-l border-dashed border-border pl-6">
          {ACTIVITY_LOG.map((entry) => (
            <li key={entry.id} className="relative pb-6 last:pb-0">
              <span
                className="absolute -left-[25px] top-1.5 size-2 rounded-full bg-primary"
                aria-hidden
              />
              <p className="text-sm text-foreground">{entry.text}</p>
              <p className="text-xs text-muted-foreground">{entry.when}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
