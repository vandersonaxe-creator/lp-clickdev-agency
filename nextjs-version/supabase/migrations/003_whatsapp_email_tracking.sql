alter table diagnostico_leads
  add column if not exists whatsapp_enviado_at timestamptz,
  add column if not exists whatsapp_message_id text,
  add column if not exists whatsapp_respondeu_at timestamptz,
  add column if not exists botao_clicado text, -- 'email' | 'agendar' | 'humano'
  add column if not exists email_enviado_at timestamptz,
  add column if not exists email_provider_id text,
  add column if not exists email_aberto_at timestamptz;

create index if not exists idx_diagnostico_leads_whatsapp
  on diagnostico_leads(whatsapp);

create index if not exists idx_diagnostico_leads_botao
  on diagnostico_leads(botao_clicado)
  where botao_clicado is not null;

