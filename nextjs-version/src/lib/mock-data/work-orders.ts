import {
  differenceInCalendarDays,
  isBefore,
  parseISO,
  startOfDay,
} from "date-fns"

/** Total no cadastro (amostra na UI = 15 linhas) */
export const TOTAL_WORK_ORDERS_IN_SYSTEM = 31

/** Contadores rápidos (visão global — não recalculados a partir da amostra) */
export const WO_KPI = {
  planned: 8,
  open: 4,
  in_progress: 3,
  overdue: 2,
  completed_month: 14,
} as const

export type WoStatus =
  | "planned"
  | "open"
  | "in_progress"
  | "completed"
  | "cancelled"

export type WoType = "preventive" | "corrective" | "inspection" | "calibration"

export type WoPriority = "low" | "medium" | "high" | "critical"

export type WoAssignee = "Vanderson" | "Técnico 2" | "Calibra RJ" | "Torkcal"

export interface WorkOrder {
  id: string
  wo_number: string
  title: string
  type: WoType
  tag: string
  asset: string
  assignee: WoAssignee | string | null
  priority: WoPriority
  status: WoStatus
  /** YYYY-MM-DD */
  scheduled: string
  started: string | null
  completed: string | null
}

export const WORK_ORDERS_MOCK: WorkOrder[] = [
  {
    id: "WO-2026-000034",
    wo_number: "WO-2026-000034",
    title: "Preventiva Grupo Gerador GEP208",
    type: "preventive",
    tag: "GER-001",
    asset: "Grupo Gerador",
    assignee: "Vanderson",
    priority: "high",
    status: "in_progress",
    scheduled: "2026-04-15",
    started: "2026-04-15T08:30",
    completed: null,
  },
  {
    id: "WO-2026-000033",
    wo_number: "WO-2026-000033",
    title: "Corretiva Extrusora PP-01 — Falha no aquecimento",
    type: "corrective",
    tag: "EXT-001",
    asset: "Extrusora Solda PP-01",
    assignee: "Técnico 2",
    priority: "critical",
    status: "in_progress",
    scheduled: "2026-04-14",
    started: "2026-04-14T14:00",
    completed: null,
  },
  {
    id: "WO-2026-000032",
    wo_number: "WO-2026-000032",
    title: "Inspeção NR-13 Prensa Hidraumak",
    type: "inspection",
    tag: "PNS-001",
    asset: "Prensa Hidráulica",
    assignee: "Vanderson",
    priority: "medium",
    status: "open",
    scheduled: "2026-04-18",
    started: null,
    completed: null,
  },
  {
    id: "WO-2026-000031",
    wo_number: "WO-2026-000031",
    title: "Preventiva Compressor Chicago CPC-50",
    type: "preventive",
    tag: "CMP-002",
    asset: "Compressor de Ar",
    assignee: "Vanderson",
    priority: "medium",
    status: "completed",
    scheduled: "2026-04-10",
    started: "2026-04-10T07:00",
    completed: "2026-04-10T09:45",
  },
  {
    id: "WO-2026-000030",
    wo_number: "WO-2026-000030",
    title: "Calibração Paquímetro Digital 150mm",
    type: "calibration",
    tag: "PAQ-001",
    asset: "Paquímetro Digital",
    assignee: "Calibra RJ",
    priority: "medium",
    status: "completed",
    scheduled: "2026-04-08",
    started: "2026-04-08T10:00",
    completed: "2026-04-08T11:30",
  },
  {
    id: "WO-2026-000029",
    wo_number: "WO-2026-000029",
    title: "Preventiva Compressor Schulz",
    type: "preventive",
    tag: "CMP-001",
    asset: "Compressor de Ar",
    assignee: "Vanderson",
    priority: "high",
    status: "open",
    scheduled: "2026-04-01",
    started: null,
    completed: null,
  },
  {
    id: "WO-2026-000028",
    wo_number: "WO-2026-000028",
    title: "Preventiva Termoformadora MTF",
    type: "preventive",
    tag: "TMF-001",
    asset: "Termoformadora",
    assignee: "Técnico 2",
    priority: "high",
    status: "planned",
    scheduled: "2026-04-20",
    started: null,
    completed: null,
  },
  {
    id: "WO-2026-000027",
    wo_number: "WO-2026-000027",
    title: "Corretiva Booster 20K — Vazamento na válvula",
    type: "corrective",
    tag: "BST-001",
    asset: "Booster 20K PSI",
    assignee: "Vanderson",
    priority: "critical",
    status: "completed",
    scheduled: "2026-04-05",
    started: "2026-04-05T06:30",
    completed: "2026-04-05T10:15",
  },
  {
    id: "WO-2026-000026",
    wo_number: "WO-2026-000026",
    title: "Inspeção Bomba Hidropneumática AH-300",
    type: "inspection",
    tag: "BHP-001",
    asset: "Bomba 20K PSI",
    assignee: "Técnico 2",
    priority: "low",
    status: "planned",
    scheduled: "2026-04-22",
    started: null,
    completed: null,
  },
  {
    id: "WO-2026-000025",
    wo_number: "WO-2026-000025",
    title: "Preventiva Booster BHU 15/75",
    type: "preventive",
    tag: "BST-002",
    asset: "Booster BHU",
    assignee: "Técnico 2",
    priority: "high",
    status: "planned",
    scheduled: "2026-04-22",
    started: null,
    completed: null,
  },
  {
    id: "WO-2026-000024",
    wo_number: "WO-2026-000024",
    title: "Calibração Torquímetro 10-50 N.m",
    type: "calibration",
    tag: "TQM-002",
    asset: "Torquímetro",
    assignee: "Torkcal",
    priority: "high",
    status: "open",
    scheduled: "2026-04-12",
    started: null,
    completed: null,
  },
  {
    id: "WO-2026-000023",
    wo_number: "WO-2026-000023",
    title: "Preventiva Furadeira Kone KM-40",
    type: "preventive",
    tag: "FUR-001",
    asset: "Furadeira de Coluna",
    assignee: "Técnico 2",
    priority: "low",
    status: "completed",
    scheduled: "2026-03-15",
    started: "2026-03-15T08:00",
    completed: "2026-03-15T09:30",
  },
  {
    id: "WO-2026-000022",
    wo_number: "WO-2026-000022",
    title: "Preventiva Rosqueadeira Merax",
    type: "preventive",
    tag: "RSQ-001",
    asset: "Rosqueadeira Elétrica",
    assignee: "Técnico 2",
    priority: "low",
    status: "completed",
    scheduled: "2026-03-10",
    started: "2026-03-10T13:00",
    completed: "2026-03-10T14:00",
  },
  {
    id: "WO-2026-000021",
    wo_number: "WO-2026-000021",
    title: "Corretiva Policorte — Disco travando",
    type: "corrective",
    tag: "POL-001",
    asset: "Policorte",
    assignee: null,
    priority: "medium",
    status: "cancelled",
    scheduled: "2026-03-20",
    started: null,
    completed: null,
  },
  {
    id: "WO-2026-000020",
    wo_number: "WO-2026-000020",
    title: "Preventiva Gerador GEP208 — Março",
    type: "preventive",
    tag: "GER-001",
    asset: "Grupo Gerador",
    assignee: "Vanderson",
    priority: "high",
    status: "completed",
    scheduled: "2026-03-15",
    started: "2026-03-15T07:00",
    completed: "2026-03-15T09:30",
  },
]

export function isWorkOrderOverdue(
  wo: WorkOrder,
  reference: Date = new Date()
): boolean {
  if (wo.status === "completed" || wo.status === "cancelled") return false
  const d = startOfDay(parseISO(wo.scheduled))
  return isBefore(d, startOfDay(reference))
}

export function overdueDays(
  wo: WorkOrder,
  reference: Date = new Date()
): number {
  if (!isWorkOrderOverdue(wo, reference)) return 0
  return differenceInCalendarDays(
    startOfDay(reference),
    startOfDay(parseISO(wo.scheduled))
  )
}

export function isCompletedInApril2026(wo: WorkOrder): boolean {
  if (wo.status !== "completed" || !wo.completed) return false
  return wo.completed.startsWith("2026-04")
}

export type WoKpiFilterKey =
  | "planned"
  | "open"
  | "in_progress"
  | "overdue"
  | "completed_month"

export type WoFiltersState = {
  search: string
  status: Set<WoStatus>
  type: "all" | WoType
  priority: "all" | WoPriority
  assignee: "all" | "Vanderson" | "Técnico 2"
  /** scheduled range inclusive */
  dateFrom: Date | null
  dateTo: Date | null
}

export function defaultWoFilters(): WoFiltersState {
  return {
    search: "",
    status: new Set<WoStatus>([
      "planned",
      "open",
      "in_progress",
      "completed",
      "cancelled",
    ]),
    type: "all",
    priority: "all",
    assignee: "all",
    dateFrom: null,
    dateTo: null,
  }
}

export function woFiltersActive(f: WoFiltersState): boolean {
  if (f.search.trim() !== "") return true
  if (f.status.size !== 5) return true
  if (f.type !== "all") return true
  if (f.priority !== "all") return true
  if (f.assignee !== "all") return true
  if (f.dateFrom != null || f.dateTo != null) return true
  return false
}

export function applyWorkOrderFilters(
  rows: WorkOrder[],
  f: WoFiltersState,
  kpiKey: WoKpiFilterKey | null,
  reference: Date = new Date()
): WorkOrder[] {
  let out = rows

  if (kpiKey === "planned") {
    out = out.filter((w) => w.status === "planned")
  } else if (kpiKey === "open") {
    out = out.filter((w) => w.status === "open")
  } else if (kpiKey === "in_progress") {
    out = out.filter((w) => w.status === "in_progress")
  } else if (kpiKey === "overdue") {
    out = out.filter((w) => isWorkOrderOverdue(w, reference))
  } else if (kpiKey === "completed_month") {
    out = out.filter((w) => isCompletedInApril2026(w))
  }

  const q = f.search.trim().toLowerCase()
  if (q) {
    out = out.filter(
      (w) =>
        w.wo_number.toLowerCase().includes(q) ||
        w.title.toLowerCase().includes(q) ||
        w.tag.toLowerCase().includes(q) ||
        w.asset.toLowerCase().includes(q)
    )
  }

  if (f.status.size === 0) return []
  if (f.status.size < 5) {
    out = out.filter((w) => f.status.has(w.status))
  }

  if (f.type !== "all") {
    out = out.filter((w) => w.type === f.type)
  }

  if (f.priority !== "all") {
    out = out.filter((w) => w.priority === f.priority)
  }

  if (f.assignee !== "all") {
    out = out.filter((w) => w.assignee === f.assignee)
  }

  if (f.dateFrom) {
    const from = startOfDay(f.dateFrom).getTime()
    out = out.filter((w) => parseISO(w.scheduled).getTime() >= from)
  }
  if (f.dateTo) {
    const to = startOfDay(f.dateTo).getTime()
    out = out.filter((w) => parseISO(w.scheduled).getTime() <= to)
  }

  return out
}
