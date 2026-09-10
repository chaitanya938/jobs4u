create extension if not exists pgcrypto;

create table if not exists site_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  logo_url text,
  website_url text,
  sector text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  company_id uuid references companies(id) on delete set null,
  location text not null,
  experience text not null,
  salary text,
  job_type text not null,
  work_mode text not null,
  description text,
  responsibilities text[] not null default '{}'::text[],
  requirements text[] not null default '{}'::text[],
  skills text[] not null default '{}'::text[],
  eligibility text[] not null default '{}'::text[],
  application_url text not null,
  source_url text,
  posted_at timestamptz not null,
  expires_at timestamptz,
  status text not null check (status in ('ACTIVE', 'EXPIRED')),
  categories text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  company_id uuid references companies(id) on delete set null,
  role text not null,
  location text not null,
  experience text not null,
  eligibility text,
  skills text,
  referral_info text,
  application_url text,
  status text not null default 'ACTIVE',
  posted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists interview_experiences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  company_id uuid references companies(id) on delete set null,
  role text not null,
  stage text,
  summary text,
  body text,
  posted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists interview_questions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  difficulty text,
  question text,
  explanation text,
  answer text,
  example text,
  code text,
  complexity text,
  tags text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists programming_questions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  difficulty text,
  question text,
  explanation text,
  answer text,
  example text,
  code text,
  complexity text,
  tags text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists resume_resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body text,
  tags text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists preparation_guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  summary text,
  body text,
  tags text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists hiring_processes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  company_id uuid references companies(id) on delete set null,
  title text not null,
  overview text,
  sections jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  last_updated timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  url text,
  title text,
  company text,
  job_id text,
  traffic_source text,
  search_query text,
  share_channel text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists jobs_slug_idx on jobs (slug);
create index if not exists jobs_status_idx on jobs (status);
create index if not exists jobs_posted_at_idx on jobs (posted_at desc);
create index if not exists jobs_expires_at_idx on jobs (expires_at);
create index if not exists jobs_company_id_idx on jobs (company_id);
create index if not exists jobs_location_idx on jobs (location);

create index if not exists referrals_slug_idx on referrals (slug);
create index if not exists interview_experiences_slug_idx on interview_experiences (slug);
create index if not exists programming_questions_slug_idx on programming_questions (slug);
create index if not exists resume_resources_slug_idx on resume_resources (slug);
create index if not exists preparation_guides_slug_idx on preparation_guides (slug);
create index if not exists hiring_processes_slug_idx on hiring_processes (slug);
