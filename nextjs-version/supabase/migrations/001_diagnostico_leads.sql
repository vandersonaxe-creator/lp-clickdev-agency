create table if not exists diagnostico_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- identificação
  nome text not null,
  whatsapp text not null,
  email text not null,

  -- diagnóstico
  gargalo_descricao text not null,
  diagnostico_gerado text,
  diagnostico_tokens_used int,
  diagnostico_tempo_ms int,

  -- conversão
  agendou_reuniao boolean default false,
  reuniao_agendada_at timestamptz,

  -- atribuição
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,

  -- contexto técnico
  user_agent text,
  ip_address text,
  ddd text,
  uf_inferida text
);

create index if not exists idx_diagnostico_leads_email on diagnostico_leads(email);
create index if not exists idx_diagnostico_leads_created on diagnostico_leads(created_at desc);
create index if not exists idx_diagnostico_leads_utm_source on diagnostico_leads(utm_source);

alter table diagnostico_leads enable row level security;

-- Apenas service_role pode inserir/ler (blindagem total — dashboard interno depois)
create policy "service_role_all" on diagnostico_leads
  for all using (auth.role() = 'service_role');

