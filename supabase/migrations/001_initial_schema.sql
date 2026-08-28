-- Clarifie Fraud Fusion Engine Database Schema
-- Supabase PostgreSQL with custom JWT RLS policies

-- 1. Users Table (Custom JWT + bcrypt Auth)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- 2. Cases Table
create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade not null,
  context_note text,
  status text default 'processing' check (status in ('processing','complete','failed')),
  audio_transcript text,
  audio_flags text[],
  audio_risk_score int,
  image_description text,
  image_flags text[],
  image_risk_score int,
  document_text text,
  document_flags text[],
  document_risk_score int,
  fused_risk_score int,
  fused_verdict text check (fused_verdict in ('low','medium','high')),
  fused_explanation text,
  cross_modal_findings text[],
  created_at timestamptz default now()
);

-- 3. Case Evidence Table
create table if not exists case_evidence (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references cases(id) on delete cascade not null,
  evidence_type text check (evidence_type in ('audio','image','document')),
  file_url text not null,
  uploaded_at timestamptz default now()
);

-- 4. Guardian Checks Table
create table if not exists guardian_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  description text not null,
  risk_level text check (risk_level in ('low','medium','high')),
  red_flags text[],
  advice text,
  created_at timestamptz default now()
);

-- 5. Scam Patterns Table (Stretch Feature)
create table if not exists scam_patterns (
  id uuid primary key default gen_random_uuid(),
  signature_text text unique not null,
  occurrence_count int default 1,
  last_seen timestamptz default now()
);

-- Row Level Security Setup
alter table cases enable row level security;
alter table case_evidence enable row level security;
alter table guardian_checks enable row level security;

-- Drop existing policies if any
drop policy if exists "select_own_cases" on cases;
drop policy if exists "insert_own_cases" on cases;
drop policy if exists "update_own_cases" on cases;

drop policy if exists "select_own_evidence" on case_evidence;
drop policy if exists "insert_own_evidence" on case_evidence;

drop policy if exists "select_own_guardian_checks" on guardian_checks;
drop policy if exists "insert_own_guardian_checks" on guardian_checks;

-- RLS Policies checking custom JWT user ID session variable
create policy "select_own_cases" on cases for select
  using (user_id::text = current_setting('app.jwt_user_id', true));

create policy "insert_own_cases" on cases for insert
  with check (user_id::text = current_setting('app.jwt_user_id', true));

create policy "update_own_cases" on cases for update
  using (user_id::text = current_setting('app.jwt_user_id', true));

create policy "select_own_evidence" on case_evidence for select
  using (case_id in (select id from cases where user_id::text = current_setting('app.jwt_user_id', true)));

create policy "insert_own_evidence" on case_evidence for insert
  with check (case_id in (select id from cases where user_id::text = current_setting('app.jwt_user_id', true)));

create policy "select_own_guardian_checks" on guardian_checks for select
  using (user_id::text = current_setting('app.jwt_user_id', true));

create policy "insert_own_guardian_checks" on guardian_checks for insert
  with check (user_id::text = current_setting('app.jwt_user_id', true));
