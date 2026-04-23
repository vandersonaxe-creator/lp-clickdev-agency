-- Adiciona coluna nova jsonb, mantém a antiga text por enquanto (segurança)
alter table diagnostico_leads
  add column if not exists diagnostico_json jsonb;

-- Índice GIN pra consultas futuras no JSON (opcional, mas barato)
create index if not exists idx_diagnostico_leads_diagnostico_json
  on diagnostico_leads using gin (diagnostico_json);

