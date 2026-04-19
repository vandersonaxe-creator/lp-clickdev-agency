import type { Criticality } from "./assets"

/** Status de célula na grade anual */
export type PlanningCellStatus =
  | "completed"
  | "in_progress"
  | "planned"
  | "overdue"
  | "not_generated"

export type PlanningMonthCell =
  | null
  | {
      status: PlanningCellStatus
      /** Presente quando há WO (ou para not_generated / planned com número reservado) */
      workOrderId?: string
      tooltip: string
    }

export type PlanningTechnician = "Vanderson" | "Técnico 2"

export type PlanningAssetRow = {
  tag: string
  name: string
  criticality: Criticality
  /** Valor do filtro Área/Localização */
  areaFilter: "galpao-1" | "galpao-2" | "galpao-3" | "planta-forge"
  /** Título do grupo na UI */
  groupTitle: string
  technician: PlanningTechnician
  months: PlanningMonthCell[]
}

export type PlanningKpiSnapshot = {
  scheduled: number
  completed: number
  overdue: number
  compliancePct: number
}

const MONTHS = 12

function emptyMonths(): PlanningMonthCell[] {
  return Array.from({ length: MONTHS }, () => null)
}

function wo(year: number, seq: number): string {
  return `WO-${year}-${String(seq).padStart(6, "0")}`
}

/** Monta 12 meses a partir de um mapa índice 0–11 → célula */
function fill(
  year: number,
  cells: Partial<Record<number, PlanningMonthCell>>
): PlanningMonthCell[] {
  const m = emptyMonths()
  for (let i = 0; i < MONTHS; i++) {
    if (cells[i] !== undefined) m[i] = cells[i]!
  }
  return m
}

/**
 * Dados base 2026 — 20 ativos conforme especificação (+ LAC-001 para fechar 20).
 * Anos 2025/2027: variantes com contagens diferentes (mock).
 */
function buildRows2026(): PlanningAssetRow[] {
  const y = 2026
  return [
    {
      tag: "GER-001",
      name: "Grupo Gerador",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        0: {
          status: "completed",
          workOrderId: wo(y, 12),
          tooltip: `Concluída em 15/01/${y} — ${wo(y, 12)}`,
        },
        1: {
          status: "completed",
          workOrderId: wo(y, 15),
          tooltip: `Concluída em 12/02/${y} — ${wo(y, 15)}`,
        },
        2: {
          status: "completed",
          workOrderId: wo(y, 18),
          tooltip: `Concluída em 18/03/${y} — ${wo(y, 18)}`,
        },
        3: {
          status: "in_progress",
          workOrderId: wo(y, 28),
          tooltip: `Em andamento — ${wo(y, 28)}`,
        },
        4: {
          status: "planned",
          workOrderId: wo(y, 33),
          tooltip: `Planejada para 20/04/${y} — ${wo(y, 33)}`,
        },
        5: { status: "planned", workOrderId: wo(y, 40), tooltip: `Planejada para 08/06/${y} — ${wo(y, 40)}` },
        6: { status: "planned", workOrderId: wo(y, 41), tooltip: `Planejada para 15/07/${y} — ${wo(y, 41)}` },
        7: { status: "planned", workOrderId: wo(y, 42), tooltip: `Planejada para 22/08/${y} — ${wo(y, 42)}` },
        8: { status: "planned", workOrderId: wo(y, 43), tooltip: `Planejada para 05/09/${y} — ${wo(y, 43)}` },
        9: { status: "planned", workOrderId: wo(y, 44), tooltip: `Planejada para 12/10/${y} — ${wo(y, 44)}` },
        10: { status: "planned", workOrderId: wo(y, 45), tooltip: `Planejada para 18/11/${y} — ${wo(y, 45)}` },
        11: { status: "planned", workOrderId: wo(y, 46), tooltip: `Planejada para 02/12/${y} — ${wo(y, 46)}` },
      }),
    },
    {
      tag: "CMP-001",
      name: "Compressor Schulz",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Técnico 2",
      months: fill(y, {
        0: {
          status: "completed",
          workOrderId: wo(y, 50),
          tooltip: `Concluída em 10/01/${y} — ${wo(y, 50)}`,
        },
        3: {
          status: "overdue",
          workOrderId: wo(y, 51),
          tooltip: `ATRASADA — Prevista para 01/04/${y}`,
        },
        6: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        9: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "CMP-002",
      name: "Compressor Chicago",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 52),
          tooltip: `Concluída em 05/03/${y} — ${wo(y, 52)}`,
        },
        5: { status: "planned", workOrderId: wo(y, 53), tooltip: `Planejada para 14/06/${y} — ${wo(y, 53)}` },
        8: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        11: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "TMF-001",
      name: "Termoformadora",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Técnico 2",
      months: fill(y, {
        0: {
          status: "completed",
          workOrderId: wo(y, 60),
          tooltip: `Concluída em 08/01/${y} — ${wo(y, 60)}`,
        },
        2: {
          status: "completed",
          workOrderId: wo(y, 61),
          tooltip: `Concluída em 20/03/${y} — ${wo(y, 61)}`,
        },
        4: { status: "planned", workOrderId: wo(y, 62), tooltip: `Planejada para 25/05/${y} — ${wo(y, 62)}` },
        6: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        8: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        10: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "BST-001",
      name: "Booster 20K",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        0: {
          status: "completed",
          workOrderId: wo(y, 70),
          tooltip: `Concluída em 22/01/${y} — ${wo(y, 70)}`,
        },
        3: {
          status: "overdue",
          workOrderId: wo(y, 71),
          tooltip: `ATRASADA — Prevista para 01/04/${y}`,
        },
        6: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        9: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "BST-002",
      name: "Booster BHU",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Técnico 2",
      months: fill(y, {
        0: {
          status: "completed",
          workOrderId: wo(y, 72),
          tooltip: `Concluída em 18/01/${y} — ${wo(y, 72)}`,
        },
        3: { status: "planned", workOrderId: wo(y, 73), tooltip: `Planejada para 28/04/${y} — ${wo(y, 73)}` },
        6: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        9: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "BHP-001",
      name: "Bomba AH-300 20K",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 80),
          tooltip: `Concluída em 12/03/${y} — ${wo(y, 80)}`,
        },
        8: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "BHP-002",
      name: "Bomba SV-5 30K",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Técnico 2",
      months: fill(y, {
        3: { status: "planned", workOrderId: wo(y, 81), tooltip: `Planejada para 10/04/${y} — ${wo(y, 81)}` },
        9: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "TRQ-001",
      name: "Torqueadeira",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 90),
          tooltip: `Concluída em 25/03/${y} — ${wo(y, 90)}`,
        },
        8: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "FUR-001",
      name: "Furadeira Kone",
      criticality: "B",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Técnico 2",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 100),
          tooltip: `Concluída em 08/03/${y} — ${wo(y, 100)}`,
        },
        8: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "FUR-002",
      name: "Furadeira Ferrari",
      criticality: "C",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 101),
          tooltip: `Concluída em 14/03/${y} — ${wo(y, 101)}`,
        },
        8: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "POL-001",
      name: "Policorte",
      criticality: "B",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Técnico 2",
      months: fill(y, {
        3: { status: "planned", workOrderId: wo(y, 110), tooltip: `Planejada para 22/04/${y} — ${wo(y, 110)}` },
        9: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "PNS-001",
      name: "Prensa Hidraumak",
      criticality: "A",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        3: { status: "planned", workOrderId: wo(y, 111), tooltip: `Planejada para 18/04/${y} — ${wo(y, 111)}` },
        9: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "REF-001",
      name: "Unid. Refrigeração",
      criticality: "B",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Técnico 2",
      months: fill(y, {
        4: { status: "planned", workOrderId: wo(y, 120), tooltip: `Planejada para 06/05/${y} — ${wo(y, 120)}` },
        10: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "LAC-001",
      name: "Lacrador Túnel",
      criticality: "C",
      areaFilter: "galpao-1",
      groupTitle: "GALPÃO 1 — PRODUÇÃO",
      technician: "Vanderson",
      months: fill(y, {
        1: {
          status: "completed",
          workOrderId: wo(y, 130),
          tooltip: `Concluída em 02/02/${y} — ${wo(y, 130)}`,
        },
        4: {
          status: "overdue",
          workOrderId: wo(y, 131),
          tooltip: `ATRASADA — Prevista para 10/05/${y}`,
        },
        7: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        10: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "SOL-002",
      name: "Solda Corpo Flutuador",
      criticality: "A",
      areaFilter: "galpao-3",
      groupTitle: "GALPÃO 3",
      technician: "Técnico 2",
      months: fill(y, {
        3: { status: "planned", workOrderId: wo(y, 200), tooltip: `Planejada para 30/04/${y} — ${wo(y, 200)}` },
        9: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "EXT-001",
      name: "Extrusora PP-01",
      criticality: "B",
      areaFilter: "galpao-3",
      groupTitle: "GALPÃO 3",
      technician: "Vanderson",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 210),
          tooltip: `Concluída em 16/03/${y} — ${wo(y, 210)}`,
        },
        6: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        10: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "EXT-002",
      name: "Extrusora PP-02",
      criticality: "B",
      areaFilter: "galpao-3",
      groupTitle: "GALPÃO 3",
      technician: "Técnico 2",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 211),
          tooltip: `Concluída em 18/03/${y} — ${wo(y, 211)}`,
        },
        6: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        10: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "EXT-003",
      name: "Extrusora PP-03",
      criticality: "B",
      areaFilter: "galpao-3",
      groupTitle: "GALPÃO 3",
      technician: "Vanderson",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 212),
          tooltip: `Concluída em 20/03/${y} — ${wo(y, 212)}`,
        },
        6: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
        10: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
    {
      tag: "BAT-001",
      name: "Batedeira Antiga",
      criticality: "B",
      areaFilter: "planta-forge",
      groupTitle: "PLANTA FORGE",
      technician: "Técnico 2",
      months: fill(y, {
        2: {
          status: "completed",
          workOrderId: wo(y, 300),
          tooltip: `Concluída em 11/03/${y} — ${wo(y, 300)}`,
        },
        8: { status: "not_generated", tooltip: "Prevista — OS ainda não gerada" },
      }),
    },
  ]
}

function scaleRowsForYear(rows: PlanningAssetRow[], fromYear: number, toYear: number): PlanningAssetRow[] {
  if (toYear === fromYear) return rows
  return rows.map((r) => ({
    ...r,
    months: r.months.map((c) => {
      if (!c) return null
      const tip = c.tooltip.split(String(fromYear)).join(String(toYear))
      let wid = c.workOrderId
      if (wid) wid = wid.replace(String(fromYear), String(toYear))
      return { ...c, tooltip: tip, workOrderId: wid }
    }),
  }))
}

/** KPIs fixos mock por ano (alinhados ao briefing para 2026) */
export const PLANNING_KPI_BY_YEAR: Record<number, PlanningKpiSnapshot> = {
  2025: {
    scheduled: 72,
    completed: 68,
    overdue: 2,
    compliancePct: 94,
  },
  2026: {
    scheduled: 78,
    completed: 42,
    overdue: 6,
    compliancePct: 82,
  },
  2027: {
    scheduled: 81,
    completed: 12,
    overdue: 0,
    compliancePct: 88,
  },
}

const BASE_2026 = buildRows2026()

export function getPlanningAssetsForYear(year: number): PlanningAssetRow[] {
  if (year === 2026) return BASE_2026
  return scaleRowsForYear(BASE_2026, 2026, year)
}

export function getPlanningKpis(year: number): PlanningKpiSnapshot {
  return PLANNING_KPI_BY_YEAR[year] ?? PLANNING_KPI_BY_YEAR[2026]
}

export type PlanningAreaFilter = "all" | "galpao-1" | "galpao-2" | "galpao-3" | "planta-forge"

export type PlanningFilters = {
  area: PlanningAreaFilter
  criticality: Set<Criticality>
  technician: "all" | PlanningTechnician
}

export function defaultPlanningFilters(): PlanningFilters {
  return {
    area: "all",
    criticality: new Set<Criticality>(["A", "B", "C"]),
    technician: "all",
  }
}

export function planningFiltersActive(f: PlanningFilters): boolean {
  if (f.area !== "all") return true
  if (f.technician !== "all") return true
  if (f.criticality.size !== 3) return true
  return false
}

export function applyPlanningFilters(
  rows: PlanningAssetRow[],
  f: PlanningFilters
): PlanningAssetRow[] {
  let out = rows
  if (f.area !== "all") {
    out = out.filter((r) => r.areaFilter === f.area)
  }
  if (f.technician !== "all") {
    out = out.filter((r) => r.technician === f.technician)
  }
  if (f.criticality.size === 0) return []
  if (f.criticality.size < 3) {
    out = out.filter((r) => f.criticality.has(r.criticality))
  }
  return out
}

/** Agrupa linhas por `groupTitle` preservando ordem de primeira aparição */
export function groupPlanningRows(rows: PlanningAssetRow[]): { title: string; rows: PlanningAssetRow[] }[] {
  const map = new Map<string, PlanningAssetRow[]>()
  const order: string[] = []
  for (const r of rows) {
    if (!map.has(r.groupTitle)) {
      map.set(r.groupTitle, [])
      order.push(r.groupTitle)
    }
    map.get(r.groupTitle)!.push(r)
  }
  return order.map((title) => ({ title, rows: map.get(title)! }))
}

/** Total no cadastro com plano preventivo (texto do subtítulo; amostra na grade = 20 linhas) */
export const TOTAL_ASSETS_WITH_PREVENTIVE_PLANS = 30

export const PLANNING_MONTH_LABELS_SHORT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
] as const

export const PLANNING_MOBILE_LETTERS = "JFMAMJJASOND".split("") // 12 chars for 12 months
