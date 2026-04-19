import type { Criticality } from "@/lib/mock-data/assets"

export type PlanStatus = "on_track" | "overdue" | "due_soon" | "inactive"

export type PlanFrequency =
  | "Mensal"
  | "Bimestral"
  | "Trimestral"
  | "Quadrimestral"
  | "Semestral"
  | "Anual"

export interface PreventivePlan {
  id: string
  name: string
  tag: string
  asset: string
  frequency: PlanFrequency
  /** ISO yyyy-mm-dd */
  next: string | null
  last: string | null
  duration: number
  assignee: string | null
  status: PlanStatus
  criticality: Criticality
}

/** Referência para textos “há X dias” e próximas execuções (abr/2026) */
export const PLANS_REFERENCE_DATE = new Date("2026-04-19T12:00:00")

export const PLANS_MOCK: PreventivePlan[] = [
  {
    id: "GER-001",
    name: "Preventiva Grupo Gerador Caterpillar GEP208",
    tag: "GER-001",
    asset: "Grupo Gerador",
    frequency: "Mensal",
    next: "2026-04-15",
    last: "2026-03-15",
    duration: 120,
    assignee: "Vanderson",
    status: "on_track",
    criticality: "A",
  },
  {
    id: "CMP-001",
    name: "Preventiva Compressor Schulz",
    tag: "CMP-001",
    asset: "Compressor de Ar",
    frequency: "Trimestral",
    next: "2026-04-01",
    last: "2026-01-05",
    duration: 90,
    assignee: "Vanderson",
    status: "overdue",
    criticality: "A",
  },
  {
    id: "CMP-002",
    name: "Preventiva Compressor Chicago CPC-50",
    tag: "CMP-002",
    asset: "Compressor de Ar",
    frequency: "Trimestral",
    next: "2026-04-10",
    last: "2026-01-12",
    duration: 90,
    assignee: "Vanderson",
    status: "overdue",
    criticality: "A",
  },
  {
    id: "TMF-001",
    name: "Preventiva Termoformadora MTF",
    tag: "TMF-001",
    asset: "Termoformadora",
    frequency: "Bimestral",
    next: "2026-04-20",
    last: "2026-02-20",
    duration: 90,
    assignee: "Técnico 2",
    status: "due_soon",
    criticality: "A",
  },
  {
    id: "BST-001",
    name: "Preventiva Booster Flutrol 20K",
    tag: "BST-001",
    asset: "Booster 20K PSI",
    frequency: "Trimestral",
    next: "2026-04-05",
    last: "2026-01-08",
    duration: 90,
    assignee: "Vanderson",
    status: "overdue",
    criticality: "A",
  },
  {
    id: "BST-002",
    name: "Preventiva Booster Flutrol BHU 15/75",
    tag: "BST-002",
    asset: "Booster BHU 15/75",
    frequency: "Trimestral",
    next: "2026-04-22",
    last: "2026-01-22",
    duration: 90,
    assignee: "Técnico 2",
    status: "due_soon",
    criticality: "A",
  },
  {
    id: "BHP-001",
    name: "Preventiva Bomba Suplycom AH-300 20K",
    tag: "BHP-001",
    asset: "Bomba Hidropneumática 20K",
    frequency: "Semestral",
    next: "2026-06-15",
    last: "2025-12-15",
    duration: 120,
    assignee: "Vanderson",
    status: "on_track",
    criticality: "A",
  },
  {
    id: "FUR-001",
    name: "Preventiva Furadeira Kone KM-40",
    tag: "FUR-001",
    asset: "Furadeira de Coluna",
    frequency: "Semestral",
    next: "2026-07-01",
    last: "2026-01-01",
    duration: 60,
    assignee: "Técnico 2",
    status: "on_track",
    criticality: "B",
  },
  {
    id: "EXT-001",
    name: "Preventiva Extrusora Bosch PP-01",
    tag: "EXT-001",
    asset: "Extrusora Solda PP — 01",
    frequency: "Quadrimestral",
    next: "2026-08-01",
    last: "2026-04-01",
    duration: 60,
    assignee: "Técnico 2",
    status: "on_track",
    criticality: "B",
  },
  {
    id: "POL-001",
    name: "Preventiva Policorte",
    tag: "POL-001",
    asset: "Policorte",
    frequency: "Semestral",
    next: "2026-08-15",
    last: "2026-02-15",
    duration: 30,
    assignee: "Técnico 2",
    status: "on_track",
    criticality: "B",
  },
  {
    id: "TRQ-001",
    name: "Preventiva Torqueadeira Hi Force",
    tag: "TRQ-001",
    asset: "Torqueadeira",
    frequency: "Semestral",
    next: "2026-07-20",
    last: "2026-01-20",
    duration: 60,
    assignee: "Vanderson",
    status: "on_track",
    criticality: "A",
  },
  {
    id: "SER-001",
    name: "Preventiva Serra Circular ETT",
    tag: "SER-001",
    asset: "Serra Circular de Fita",
    frequency: "Semestral",
    next: null,
    last: "2025-06-10",
    duration: 30,
    assignee: null,
    status: "inactive",
    criticality: "C",
  },
]

export function planById(id: string): PreventivePlan | undefined {
  return PLANS_MOCK.find((p) => p.id === id)
}

export function parsePlanDate(iso: string | null): Date | null {
  if (!iso) return null
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function formatDurationMinutes(min: number): string {
  if (min >= 60 && min % 60 === 0) {
    const h = min / 60
    return h === 1 ? "1h" : `${h}h`
  }
  return `${min} min`
}
