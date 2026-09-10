create table if not exists site_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);