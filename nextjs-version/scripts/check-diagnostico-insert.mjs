import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { createClient } from "@supabase/supabase-js"

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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.log("missing_env")
  process.exit(1)
}

const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })

const started = Date.now()
const { data, error } = await sb
  .from("diagnostico_leads")
  .insert({
    nome: "Teste",
    whatsapp: "+5521999999999",
    email: `teste+${Date.now()}@example.com`,
    gargalo_descricao: "Teste de inserção (debug).",
  })
  .select("id")
  .single()

const ms = Date.now() - started
if (error) {
  console.log("insert_error", { ms, code: error.code ?? null, message: String(error.message || "").split("\n")[0] })
  process.exit(2)
}
console.log("insert_ok", { ms, id: data?.id ?? null })

