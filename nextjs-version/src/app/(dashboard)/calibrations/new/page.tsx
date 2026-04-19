import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewCalibrationPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href="/calibrations">Voltar</Link>
      </Button>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Nova Calibração
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Registro de calibração — formulário placeholder (certificado, datas,
          laboratório).
        </p>
      </div>
      <div className="max-w-lg space-y-4 rounded-xl border border-dashed border-border bg-card/40 p-6">
        <div className="space-y-2">
          <Label htmlFor="cal-tag">Instrumento (tag)</Label>
          <Input id="cal-tag" placeholder="PAQ-001" disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cal-cert">Nº certificado</Label>
          <Input id="cal-cert" placeholder="CRJ-2026-..." disabled />
        </div>
        <Button type="button" disabled>
          Salvar (em desenvolvimento)
        </Button>
      </div>
    </div>
  )
}
