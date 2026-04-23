import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

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
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
    v = v.slice(1, -1)
  process.env[k] = v
}

const u = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const sr = process.env.SUPABASE_SERVICE_ROLE_KEY
const need = { NEXT_PUBLIC_SUPABASE_URL: u, NEXT_PUBLIC_SUPABASE_ANON_KEY: anon, SUPABASE_SERVICE_ROLE_KEY: sr }
let missing = false
for (const [k, v] of Object.entries(need)) {
  if (!v) {
    console.log("MISSING:", k)
    missing = true
  }
}
if (missing) process.exit(1)

async function health(name, key) {
  const r = await fetch(u + "/auth/v1/health", {
    headers: { apikey: key, Authorization: "Bearer " + key },
  })
  return `${name}: HTTP ${r.status}`
}

const results = await Promise.all([health("anon", anon), health("service", sr)])
console.log(results.join(" | "))
