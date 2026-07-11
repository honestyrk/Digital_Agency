-- ─── Prime Cut — Supabase schema ─────────────────────────────────────────────
-- Run this in the Supabase SQL editor (or `supabase db push`) BEFORE seed.sql.

create extension if not exists "pgcrypto";

-- Portfolio projects (drives all four home portfolio sections + /work pages)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client_name text,
  category text not null check (category in ('personal-branding','business','creators')),
  industry text,
  description text,
  services jsonb default '[]'::jsonb,
  tags jsonb default '[]'::jsonb,
  thumbnail_url text,
  cover_image_url text,
  preview_video_url text,
  full_video_url text,
  gallery_urls jsonb default '[]'::jsonb,
  results text,
  project_date date,
  is_featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  client_name text not null,
  goal text,
  process text,
  final_video_url text,
  results text,
  gallery_urls jsonb default '[]'::jsonb,
  cover_image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text,
  review text not null,
  photo_url text,
  video_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  sort_order int default 0
);

create table if not exists public.site_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value int not null,
  suffix text default '',
  sort_order int default 0
);

-- Inquiry form submissions (write-only for the public site)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  phone text,
  email text,
  instagram text,
  budget text,
  description text,
  created_at timestamptz default now()
);

-- ─── Row Level Security ──────────────────────────────────────────────────────
alter table public.projects     enable row level security;
alter table public.case_studies enable row level security;
alter table public.testimonials enable row level security;
alter table public.client_logos enable row level security;
alter table public.site_stats   enable row level security;
alter table public.leads        enable row level security;

-- Content tables: anyone may read, nobody may write anonymously
create policy "Public read projects"      on public.projects     for select using (true);
create policy "Public read case studies"  on public.case_studies for select using (true);
create policy "Public read testimonials"  on public.testimonials for select using (true);
create policy "Public read client logos"  on public.client_logos for select using (true);
create policy "Public read site stats"    on public.site_stats   for select using (true);

-- Leads: anonymous visitors may INSERT only — no select/update/delete
create policy "Anyone can submit a lead" on public.leads
  for insert to anon with check (true);

-- ─── Storage buckets (public read) ───────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true), ('images', 'images', true)
on conflict (id) do nothing;

create policy "Public read videos bucket" on storage.objects
  for select using (bucket_id = 'videos');
create policy "Public read images bucket" on storage.objects
  for select using (bucket_id = 'images');

-- Uploads happen from the Supabase dashboard (authenticated), so no anon
-- insert policy is needed on storage.
