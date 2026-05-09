-- DeepNerd unified production schema (single-file bootstrap)
create extension if not exists "pgcrypto";
create extension if not exists "citext";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext not null unique,
  username citext unique,
  display_name text,
  bio text default '',
  role text default '',
  organization text default '',
  primary_use_case text default '',
  avatar_url text,
  onboarding_completed boolean not null default false,
  onboarding_completed_at timestamptz,
  referral_source text default '',
  onboarding_feedback text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format_chk check (username is null or username ~ '^[a-z0-9_]{3,24}$')
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  notifications_email boolean not null default true,
  notifications_in_app boolean not null default true,
  theme text not null default 'dark' check (theme in ('dark','light','system')),
  ai_default_model text not null default 'claude-4',
  ai_temperature numeric(3,2) not null default 0.20 check (ai_temperature >= 0 and ai_temperature <= 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  key_prefix text not null,
  key_hash text not null,
  scopes text[] not null default array['chat:complete']::text[],
  last_used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists api_keys_user_prefix_uniq on public.api_keys(user_id, key_prefix);

create table if not exists public.ai_usage_events (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  api_key_id uuid references public.api_keys(id) on delete set null,
  provider text not null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  total_tokens integer generated always as (input_tokens + output_tokens) stored,
  latency_ms integer,
  request_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists ai_usage_events_user_created_idx on public.ai_usage_events(user_id, created_at desc);

create table if not exists public.analytics_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  requests_count integer not null default 0,
  errors_count integer not null default 0,
  total_tokens bigint not null default 0,
  cost_usd numeric(12,4) not null default 0,
  primary key (user_id, day)
);

create table if not exists public.api_logs (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  method text not null,
  path text not null,
  status_code integer not null,
  response_ms integer,
  request_id text,
  ip inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists api_logs_created_idx on public.api_logs(created_at desc);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_read_idx on public.notifications(user_id, is_read, created_at desc);

create table if not exists public.audit_logs (
  id bigserial primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  target_user_id uuid references auth.users(id) on delete set null,
  event text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.docs_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  markdown text not null,
  is_published boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text default '',
  runtime text not null default 'cloud',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  definition jsonb not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.automation_runs (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('queued','running','success','failed','cancelled')),
  started_at timestamptz,
  ended_at timestamptz,
  error_message text,
  output jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext unique not null,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member','viewer')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists public.billing_customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  organization_id uuid unique references public.organizations(id) on delete cascade,
  provider text not null default 'stripe',
  provider_customer_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  billing_customer_id uuid not null references public.billing_customers(id) on delete cascade,
  plan_code text not null,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.webhook_endpoints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_url text not null,
  signing_secret_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  endpoint_id uuid not null references public.webhook_endpoints(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  payload jsonb not null,
  delivery_status text not null default 'queued',
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url, username)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    null
  )
  on conflict (id) do update
  set email = excluded.email,
      display_name = coalesce(public.profiles.display_name, excluded.display_name),
      avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url);

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists user_settings_set_updated_at on public.user_settings;
create trigger user_settings_set_updated_at before update on public.user_settings for each row execute function public.set_updated_at();
drop trigger if exists api_keys_set_updated_at on public.api_keys;
create trigger api_keys_set_updated_at before update on public.api_keys for each row execute function public.set_updated_at();
drop trigger if exists docs_pages_set_updated_at on public.docs_pages;
create trigger docs_pages_set_updated_at before update on public.docs_pages for each row execute function public.set_updated_at();
drop trigger if exists agents_set_updated_at on public.agents;
create trigger agents_set_updated_at before update on public.agents for each row execute function public.set_updated_at();
drop trigger if exists workflows_set_updated_at on public.workflows;
create trigger workflows_set_updated_at before update on public.workflows for each row execute function public.set_updated_at();
drop trigger if exists organizations_set_updated_at on public.organizations;
create trigger organizations_set_updated_at before update on public.organizations for each row execute function public.set_updated_at();
drop trigger if exists billing_customers_set_updated_at on public.billing_customers;
create trigger billing_customers_set_updated_at before update on public.billing_customers for each row execute function public.set_updated_at();
drop trigger if exists billing_subscriptions_set_updated_at on public.billing_subscriptions;
create trigger billing_subscriptions_set_updated_at before update on public.billing_subscriptions for each row execute function public.set_updated_at();
drop trigger if exists webhook_endpoints_set_updated_at on public.webhook_endpoints;
create trigger webhook_endpoints_set_updated_at before update on public.webhook_endpoints for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.api_keys enable row level security;
alter table public.ai_usage_events enable row level security;
alter table public.analytics_daily enable row level security;
alter table public.api_logs enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.agents enable row level security;
alter table public.workflows enable row level security;
alter table public.automation_runs enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.billing_customers enable row level security;
alter table public.billing_subscriptions enable row level security;
alter table public.webhook_endpoints enable row level security;
alter table public.webhook_events enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles_owner_rw') then
    create policy profiles_owner_rw on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='user_settings' and policyname='user_settings_owner_rw') then
    create policy user_settings_owner_rw on public.user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='api_keys' and policyname='api_keys_owner_rw') then
    create policy api_keys_owner_rw on public.api_keys for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='ai_usage_events' and policyname='ai_usage_owner_r') then
    create policy ai_usage_owner_r on public.ai_usage_events for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='analytics_daily' and policyname='analytics_owner_r') then
    create policy analytics_owner_r on public.analytics_daily for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='api_logs' and policyname='api_logs_owner_r') then
    create policy api_logs_owner_r on public.api_logs for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='notifications' and policyname='notifications_owner_rw') then
    create policy notifications_owner_rw on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='agents' and policyname='agents_owner_rw') then
    create policy agents_owner_rw on public.agents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='workflows' and policyname='workflows_owner_rw') then
    create policy workflows_owner_rw on public.workflows for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='automation_runs' and policyname='automation_runs_owner_rw') then
    create policy automation_runs_owner_rw on public.automation_runs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='webhook_endpoints' and policyname='webhook_endpoints_owner_rw') then
    create policy webhook_endpoints_owner_rw on public.webhook_endpoints for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='webhook_events' and policyname='webhook_events_owner_rw') then
    create policy webhook_events_owner_rw on public.webhook_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 5242880, array['image/png','image/jpeg','image/webp'])
on conflict (id) do nothing;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='avatars_public_read') then
    create policy avatars_public_read on storage.objects for select using (bucket_id = 'avatars');
  end if;
  if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='avatars_user_upload') then
    create policy avatars_user_upload on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
  end if;
  if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='avatars_user_update') then
    create policy avatars_user_update on storage.objects for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
  end if;
end $$;
