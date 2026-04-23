import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import OpenAI from "openai"

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, "..", ".env.local")

const raw = readFileSync(envPath, "utf8")
for (const line of raw.split(/\r?\n/)) {
  const t = line.trim()
  if (!t || t.startsWith("#")) continue
  const i = t.indexOf("=")
  if (i < 0) continue
  const k = t.slice(0, i).trim()
  let v = t.slice(i + 1).trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
  process.env[k] = v
}

const apiKey = process.env.OPENAI_API_KEY
const model = process.env.OPENAI_MODEL || "gpt-4o-mini"

if (!apiKey) {
  console.log("missing_env", { OPENAI_API_KEY: false })
  process.exit(1)
}

const client = new OpenAI({ apiKey, timeout: 20_000 })

const list = await client.models.list()
const ids = new Set(list.data.map((m) => m.id))
console.log("model_configured", model)
console.log("model_exists", ids.has(model))

