create table if not exists diagnostico_agendamentos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- vínculo (quando possível)
  lead_id uuid references diagnostico_leads(id) on delete set null,

  -- Cal.com
  cal_uid text not null,
  cal_booking_id bigint,
  trigger_event text not null,
  status text,
  start_time timestamptz,
  end_time timestamptz,

  attendee_email text,
  attendee_name text,

  raw_payload jsonb not null
);

create unique index if not exists uq_diagnostico_agendamentos_cal_uid
  on diagnostico_agendamentos(cal_uid);

create index if not exists idx_diagnostico_agendamentos_lead_id
  on diagnostico_agendamentos(lead_id);

create index if not exists idx_diagnostico_agendamentos_start_time
  on diagnostico_agendamentos(start_time desc);

alter table diagnostico_agendamentos enable row level security;

create policy "service_role_all" on diagnostico_agendamentos
  for all using (auth.role() = 'service_role');

