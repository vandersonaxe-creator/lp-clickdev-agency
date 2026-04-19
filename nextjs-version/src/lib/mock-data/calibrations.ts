import type { Criticality } from "./assets"

export type CalibrationKanbanStatus = "expired" | "expiring" | "valid"

export type InstrumentCategory =
  | "Dimensional"
  | "Pressão"
  | "Torque"
  | "Elétrica"

export interface CalibrationInstrument {
  tag: string
  name: string
  manufacturer: string
  model: string
  criticality: Criticality
  provider: string
  lastCal: string
  nextCal: string
  kanbanStatus: CalibrationKanbanStatus
  /** Vencidas */
  daysOverdue?: number
  /** Vencendo / válidas — dias até próxima (ou após hoje ref.) */
  daysUntil?: number
  category: InstrumentCategory
  measurementRange: string
  resolution: string
  frequencyDays: number
  certificateNumber: string | null
}

export const CALIBRATION_KPI = {
  total: 20,
  valid: 12,
  expiring30: 4,
  expired: 4,
} as const

export const CALIBRATION_INSTRUMENTS: CalibrationInstrument[] = [
  {
    tag: "MIC-001",
    name: "Micrômetro Externo 0-25mm",
    manufacturer: "Mitutoyo",
    model: "103-137",
    criticality: "A",
    provider: "Metrolog Calibrações",
    lastCal: "2025-02-10",
    nextCal: "2026-02-10",
    kanbanStatus: "expired",
    daysOverdue: 67,
    category: "Dimensional",
    measurementRange: "0 - 25 mm",
    resolution: "0.001 mm",
    frequencyDays: 365,
    certificateNumber: "MET-2026-02-0144",
  },
  {
    tag: "TQM-002",
    name: "Torquímetro de Estalo 10-50 N.m",
    manufacturer: "Gedore",
    model: "DREMASTER SE 10-50",
    criticality: "A",
    provider: "Torkcal Calibrações",
    lastCal: "2025-01-15",
    nextCal: "2026-01-15",
    kanbanStatus: "expired",
    daysOverdue: 93,
    category: "Torque",
    measurementRange: "10 - 50 N.m",
    resolution: "0.5 N.m",
    frequencyDays: 365,
    certificateNumber: "TRK-2026-01-2201",
  },
  {
    tag: "TDP-001",
    name: "Transdutor de Pressão 0-500 bar",
    manufacturer: "Gefran",
    model: "TK-N-1-E-B05D",
    criticality: "A",
    provider: "Presscal Instrumentação",
    lastCal: "2025-03-01",
    nextCal: "2026-03-01",
    kanbanStatus: "expired",
    daysOverdue: 48,
    category: "Pressão",
    measurementRange: "0 - 500 bar",
    resolution: "0.1 bar",
    frequencyDays: 365,
    certificateNumber: "PRS-2026-03-0088",
  },
  {
    tag: "TMP-002",
    name: "Termômetro Digital de Contato",
    manufacturer: "Minipa",
    model: "MT-455",
    criticality: "C",
    provider: "Calibra RJ Metrologia",
    lastCal: "2024-11-20",
    nextCal: "2025-11-20",
    kanbanStatus: "expired",
    daysOverdue: 149,
    category: "Elétrica",
    measurementRange: "-50 - 300 °C",
    resolution: "0.1 °C",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-11-3102",
  },
  {
    tag: "PAQ-003",
    name: "Paquímetro Analógico 150mm",
    manufacturer: "Starrett",
    model: "125MEA-6/150",
    criticality: "B",
    provider: "Calibra RJ Metrologia",
    lastCal: "2025-05-20",
    nextCal: "2026-05-20",
    kanbanStatus: "expiring",
    daysUntil: 12,
    category: "Dimensional",
    measurementRange: "0 - 150 mm",
    resolution: "0.02 mm",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-05-4410",
  },
  {
    tag: "MIC-003",
    name: "Micrômetro Interno 50-75mm",
    manufacturer: "Starrett",
    model: "78MXTZ-75",
    criticality: "B",
    provider: "Metrolog Calibrações",
    lastCal: "2025-05-01",
    nextCal: "2026-05-01",
    kanbanStatus: "expiring",
    daysUntil: 12,
    category: "Dimensional",
    measurementRange: "50 - 75 mm",
    resolution: "0.001 mm",
    frequencyDays: 365,
    certificateNumber: "MET-2026-05-0199",
  },
  {
    tag: "MAN-002",
    name: "Manômetro Analógico 0-1000 bar",
    manufacturer: "Wika",
    model: "232.50",
    criticality: "A",
    provider: "Presscal Instrumentação",
    lastCal: "2025-05-10",
    nextCal: "2026-05-10",
    kanbanStatus: "expiring",
    daysUntil: 21,
    category: "Pressão",
    measurementRange: "0 - 1000 bar",
    resolution: "1 bar",
    frequencyDays: 365,
    certificateNumber: "PRS-2026-05-0092",
  },
  {
    tag: "MLT-002",
    name: "Multímetro Digital (Reserva)",
    manufacturer: "Fluke",
    model: "117",
    criticality: "C",
    provider: "Calibra RJ Metrologia",
    lastCal: "2025-05-30",
    nextCal: "2026-05-30",
    kanbanStatus: "expiring",
    daysUntil: 41,
    category: "Elétrica",
    measurementRange: "Cat III 600V",
    resolution: "0.1 mV",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-05-5521",
  },
  {
    tag: "PAQ-001",
    name: "Paquímetro Digital 150mm",
    manufacturer: "Mitutoyo",
    model: "500-196-30",
    criticality: "A",
    provider: "Calibra RJ",
    lastCal: "2025-08-15",
    nextCal: "2026-08-15",
    kanbanStatus: "valid",
    daysUntil: 117,
    category: "Dimensional",
    measurementRange: "0 - 150 mm",
    resolution: "0.01 mm",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-08-0891",
  },
  {
    tag: "PAQ-002",
    name: "Paquímetro Digital 200mm",
    manufacturer: "Mitutoyo",
    model: "500-197-30",
    criticality: "A",
    provider: "Calibra RJ",
    lastCal: "2025-09-10",
    nextCal: "2026-09-10",
    kanbanStatus: "valid",
    daysUntil: 143,
    category: "Dimensional",
    measurementRange: "0 - 200 mm",
    resolution: "0.01 mm",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-09-1022",
  },
  {
    tag: "PAQ-004",
    name: "Paquímetro Digital 300mm",
    manufacturer: "Mitutoyo",
    model: "500-193-30",
    criticality: "B",
    provider: "Calibra RJ",
    lastCal: "2025-11-01",
    nextCal: "2026-11-01",
    kanbanStatus: "valid",
    daysUntil: 195,
    category: "Dimensional",
    measurementRange: "0 - 300 mm",
    resolution: "0.01 mm",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-11-2044",
  },
  {
    tag: "MIC-002",
    name: "Micrômetro Externo 25-50mm",
    manufacturer: "Mitutoyo",
    model: "103-138",
    criticality: "A",
    provider: "Metrolog",
    lastCal: "2025-10-05",
    nextCal: "2026-10-05",
    kanbanStatus: "valid",
    daysUntil: 168,
    category: "Dimensional",
    measurementRange: "25 - 50 mm",
    resolution: "0.001 mm",
    frequencyDays: 365,
    certificateNumber: "MET-2025-10-0771",
  },
  {
    tag: "TQM-001",
    name: "Torquímetro Estalo 40-200 N.m",
    manufacturer: "Gedore",
    model: "DREMASTER SE 40-200",
    criticality: "A",
    provider: "Torkcal",
    lastCal: "2025-07-20",
    nextCal: "2026-07-20",
    kanbanStatus: "valid",
    daysUntil: 91,
    category: "Torque",
    measurementRange: "40 - 200 N.m",
    resolution: "1 N.m",
    frequencyDays: 365,
    certificateNumber: "TRK-2025-07-3300",
  },
  {
    tag: "TQM-003",
    name: "Torquímetro Hidráulico 500-2500 N.m",
    manufacturer: "Hi Force",
    model: "HTL-2500",
    criticality: "A",
    provider: "Torkcal",
    lastCal: "2025-12-01",
    nextCal: "2026-06-01",
    kanbanStatus: "valid",
    daysUntil: 42,
    category: "Torque",
    measurementRange: "500 - 2500 N.m",
    resolution: "5 N.m",
    frequencyDays: 180,
    certificateNumber: "TRK-2025-12-4102",
  },
  {
    tag: "MAN-001",
    name: "Manômetro Analógico 0-700 bar",
    manufacturer: "Wika",
    model: "232.50",
    criticality: "A",
    provider: "Presscal",
    lastCal: "2025-06-15",
    nextCal: "2026-06-15",
    kanbanStatus: "valid",
    daysUntil: 56,
    category: "Pressão",
    measurementRange: "0 - 700 bar",
    resolution: "1 bar",
    frequencyDays: 365,
    certificateNumber: "PRS-2025-06-0440",
  },
  {
    tag: "MAN-003",
    name: "Manômetro Digital 0-350 bar",
    manufacturer: "Ashcroft",
    model: "DG25",
    criticality: "B",
    provider: "Presscal",
    lastCal: "2025-08-20",
    nextCal: "2026-08-20",
    kanbanStatus: "valid",
    daysUntil: 122,
    category: "Pressão",
    measurementRange: "0 - 350 bar",
    resolution: "0.1 bar",
    frequencyDays: 365,
    certificateNumber: "PRS-2025-08-0912",
  },
  {
    tag: "MLT-001",
    name: "Multímetro Digital",
    manufacturer: "Fluke",
    model: "179",
    criticality: "B",
    provider: "Calibra RJ",
    lastCal: "2025-09-15",
    nextCal: "2026-09-15",
    kanbanStatus: "valid",
    daysUntil: 148,
    category: "Elétrica",
    measurementRange: "Cat IV 600V",
    resolution: "0.01 V",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-09-1155",
  },
  {
    tag: "TMP-001",
    name: "Termômetro Infravermelho",
    manufacturer: "Fluke",
    model: "62 MAX+",
    criticality: "B",
    provider: "Calibra RJ",
    lastCal: "2025-10-10",
    nextCal: "2026-10-10",
    kanbanStatus: "valid",
    daysUntil: 173,
    category: "Elétrica",
    measurementRange: "-30 - 500 °C",
    resolution: "0.1 °C",
    frequencyDays: 365,
    certificateNumber: "CRJ-2025-10-1288",
  },
  {
    tag: "RLC-001",
    name: "Relógio Comparador",
    manufacturer: "Mitutoyo",
    model: "2046S",
    criticality: "B",
    provider: "Metrolog",
    lastCal: "2025-07-01",
    nextCal: "2026-07-01",
    kanbanStatus: "valid",
    daysUntil: 72,
    category: "Dimensional",
    measurementRange: "0 - 10 mm",
    resolution: "0.001 mm",
    frequencyDays: 365,
    certificateNumber: "MET-2025-07-0550",
  },
  {
    tag: "TRN-001",
    name: "Trena Calibrada 5m",
    manufacturer: "Stanley",
    model: "FatMax 33-720",
    criticality: "C",
    provider: "Calibra RJ",
    lastCal: "2025-06-01",
    nextCal: "2027-06-01",
    kanbanStatus: "valid",
    daysUntil: 407,
    category: "Dimensional",
    measurementRange: "0 - 5 m",
    resolution: "1 mm",
    frequencyDays: 730,
    certificateNumber: "CRJ-2025-06-0601",
  },
]

export function instrumentsByKanbanStatus(
  status: CalibrationKanbanStatus
): CalibrationInstrument[] {
  return CALIBRATION_INSTRUMENTS.filter((i) => i.kanbanStatus === status)
}

export type PlanStatusFilter = "all" | "valid" | "expiring" | "expired"

export type PlanFiltersState = {
  search: string
  status: PlanStatusFilter
  category: "all" | InstrumentCategory
  provider: "all" | "Calibra RJ" | "Metrolog" | "Torkcal" | "Presscal"
}

export function defaultPlanFilters(): PlanFiltersState {
  return {
    search: "",
    status: "all",
    category: "all",
    provider: "all",
  }
}

export function planFiltersActive(f: PlanFiltersState): boolean {
  if (f.search.trim() !== "") return true
  if (f.status !== "all") return true
  if (f.category !== "all") return true
  if (f.provider !== "all") return true
  return false
}

function matchesProvider(
  instrumentProvider: string,
  filter: PlanFiltersState["provider"]
): boolean {
  if (filter === "all") return true
  const p = instrumentProvider.toLowerCase()
  if (filter === "Calibra RJ") return p.includes("calibra rj")
  if (filter === "Metrolog") return p.includes("metrolog")
  if (filter === "Torkcal") return p.includes("torkcal")
  if (filter === "Presscal") return p.includes("presscal")
  return true
}

export function applyPlanFilters(
  rows: CalibrationInstrument[],
  f: PlanFiltersState
): CalibrationInstrument[] {
  let out = rows
  const q = f.search.trim().toLowerCase()
  if (q) {
    out = out.filter(
      (r) =>
        r.tag.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    )
  }
  if (f.status !== "all") {
    out = out.filter((r) => {
      if (f.status === "expired") return r.kanbanStatus === "expired"
      if (f.status === "expiring") return r.kanbanStatus === "expiring"
      if (f.status === "valid") return r.kanbanStatus === "valid"
      return true
    })
  }
  if (f.category !== "all") {
    out = out.filter((r) => r.category === f.category)
  }
  if (f.provider !== "all") {
    out = out.filter((r) => matchesProvider(r.provider, f.provider))
  }
  return out
}

export function sortPlanByNextCalibration(
  rows: CalibrationInstrument[]
): CalibrationInstrument[] {
  return [...rows].sort((a, b) => a.nextCal.localeCompare(b.nextCal))
}
