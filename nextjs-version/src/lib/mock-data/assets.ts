export type AssetType = "equipment" | "instrument"

export type AssetStatus = "active" | "inactive" | "maintenance"

/** Calibração só para instrumentos */
export type CalibrationState = "valid" | "expiring" | "expired"

export type Criticality = "A" | "B" | "C"

export interface IndustrialAsset {
  id: string
  tag: string
  name: string
  type: AssetType
  manufacturer: string
  model?: string
  location: string
  criticality: Criticality
  status: AssetStatus
  calibration?: CalibrationState
}

/** Total no cadastro (inclui os não listados nesta amostra) */
export const TOTAL_ASSETS_IN_SYSTEM = 54

export const ASSETS_MOCK: IndustrialAsset[] = [
  {
    id: "CNC-001",
    tag: "CNC-001",
    name: "Router CNC",
    type: "equipment",
    manufacturer: "Multicam",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
  },
  {
    id: "CMP-001",
    tag: "CMP-001",
    name: "Compressor de Ar",
    type: "equipment",
    manufacturer: "Schulz",
    model: "MSI 5,2 ML",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
  },
  {
    id: "CMP-002",
    tag: "CMP-002",
    name: "Compressor de Ar",
    type: "equipment",
    manufacturer: "Chicago Pneumatic",
    model: "CPC-50",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
  },
  {
    id: "GER-001",
    tag: "GER-001",
    name: "Grupo Gerador",
    type: "equipment",
    manufacturer: "Caterpillar",
    model: "GEP208",
    location: "Planta Forge",
    criticality: "A",
    status: "active",
  },
  {
    id: "TMF-001",
    tag: "TMF-001",
    name: "Termoformadora",
    type: "equipment",
    manufacturer: "MTF",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
  },
  {
    id: "BHP-001",
    tag: "BHP-001",
    name: "Bomba Hidropneumática 20K PSI",
    type: "equipment",
    manufacturer: "Suplycom",
    model: "AH-300",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
  },
  {
    id: "BST-001",
    tag: "BST-001",
    name: "Booster 20K PSI",
    type: "equipment",
    manufacturer: "Flutrol",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
  },
  {
    id: "EXT-001",
    tag: "EXT-001",
    name: "Extrusora Solda PP — 01",
    type: "equipment",
    manufacturer: "Bosch",
    model: "23-2",
    location: "Galpão 3",
    criticality: "B",
    status: "active",
  },
  {
    id: "SER-001",
    tag: "SER-001",
    name: "Serra Circular de Fita",
    type: "equipment",
    manufacturer: "ETT",
    model: "SS-350",
    location: "Galpão 1",
    criticality: "C",
    status: "inactive",
  },
  {
    id: "PAQ-001",
    tag: "PAQ-001",
    name: "Paquímetro Digital 150mm",
    type: "instrument",
    manufacturer: "Mitutoyo",
    model: "500-196-30",
    location: "Lab. Metrologia",
    criticality: "A",
    status: "active",
    calibration: "valid",
  },
  {
    id: "MIC-001",
    tag: "MIC-001",
    name: "Micrômetro Externo 0-25mm",
    type: "instrument",
    manufacturer: "Mitutoyo",
    model: "103-137",
    location: "Lab. Metrologia",
    criticality: "A",
    status: "active",
    calibration: "expired",
  },
  {
    id: "TQM-001",
    tag: "TQM-001",
    name: "Torquímetro de Estalo 40-200 N.m",
    type: "instrument",
    manufacturer: "Gedore",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
    calibration: "valid",
  },
  {
    id: "TQM-002",
    tag: "TQM-002",
    name: "Torquímetro de Estalo 10-50 N.m",
    type: "instrument",
    manufacturer: "Gedore",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
    calibration: "expired",
  },
  {
    id: "MAN-001",
    tag: "MAN-001",
    name: "Manômetro Analógico 0-700 bar",
    type: "instrument",
    manufacturer: "Wika",
    model: "232.50",
    location: "Galpão 1",
    criticality: "A",
    status: "active",
    calibration: "expiring",
  },
  {
    id: "TMP-002",
    tag: "TMP-002",
    name: "Termômetro Digital de Contato",
    type: "instrument",
    manufacturer: "Minipa",
    model: "MT-455",
    location: "Lab. Metrologia",
    criticality: "C",
    status: "active",
    calibration: "expired",
  },
]

export type TreeNode =
  | {
      kind: "location"
      id: string
      label: string
      count: number
      children: TreeNode[]
    }
  | {
      kind: "category"
      id: string
      label: string
      count: number
      children: TreeNode[]
    }
  | {
      kind: "asset"
      assetId: string
    }

/** Árvore representativa (contagens globais alinhadas ao briefing) */
export const ASSETS_TREE_MOCK: TreeNode = {
  kind: "location",
  id: "planta",
  label: "Planta Forge",
  count: 54,
  children: [
    {
      kind: "location",
      id: "g1",
      label: "Galpão 1 — Produção",
      count: 38,
      children: [
        {
          kind: "category",
          id: "g1-usi",
          label: "Usinagem e Corte",
          count: 6,
          children: [
            { kind: "asset", assetId: "CNC-001" },
            { kind: "asset", assetId: "SER-001" },
          ],
        },
        {
          kind: "category",
          id: "g1-comp",
          label: "Compressores e Pneumática",
          count: 4,
          children: [
            { kind: "asset", assetId: "CMP-001" },
            { kind: "asset", assetId: "CMP-002" },
          ],
        },
        {
          kind: "category",
          id: "g1-bomb",
          label: "Bombas e Teste Hidrostático",
          count: 5,
          children: [
            { kind: "asset", assetId: "BHP-001" },
            { kind: "asset", assetId: "BST-001" },
          ],
        },
        {
          kind: "category",
          id: "g1-torq",
          label: "Torque e Instrumentação",
          count: 4,
          children: [
            { kind: "asset", assetId: "TQM-001" },
            { kind: "asset", assetId: "TQM-002" },
            { kind: "asset", assetId: "MAN-001" },
            { kind: "asset", assetId: "TMF-001" },
          ],
        },
      ],
    },
    {
      kind: "location",
      id: "g3",
      label: "Galpão 3",
      count: 6,
      children: [
        {
          kind: "category",
          id: "g3-sol",
          label: "Soldagem e Extrusão",
          count: 4,
          children: [{ kind: "asset", assetId: "EXT-001" }],
        },
      ],
    },
    {
      kind: "location",
      id: "lab",
      label: "Lab. Metrologia",
      count: 10,
      children: [
        {
          kind: "category",
          id: "lab-dim",
          label: "Medição Dimensional",
          count: 7,
          children: [
            { kind: "asset", assetId: "PAQ-001" },
            { kind: "asset", assetId: "MIC-001" },
            { kind: "asset", assetId: "TMP-002" },
          ],
        },
      ],
    },
    {
      kind: "location",
      id: "energia",
      label: "Energia",
      count: 2,
      children: [
        {
          kind: "category",
          id: "en-gen",
          label: "Geração",
          count: 1,
          children: [{ kind: "asset", assetId: "GER-001" }],
        },
      ],
    },
  ],
}

export function assetById(id: string): IndustrialAsset | undefined {
  return ASSETS_MOCK.find((a) => a.id === id)
}
