-- Retford.info obituaries setup
-- Run this in the Supabase SQL editor, then add these env vars to the site:
-- NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

create extension if not exists pgcrypto;

create table if not exists public.obituaries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  notice_type text not null default 'death_notice'
    check (notice_type in ('death_notice', 'obituary', 'funeral_notice', 'thanks', 'memorial')),
  status text not null default 'published'
    check (status in ('published', 'hidden')),
  full_name text not null check (char_length(full_name) between 2 and 180),
  known_as text,
  age integer check (age is null or (age >= 0 and age <= 125)),
  date_of_birth date,
  date_of_death date,
  funeral_date timestamptz,
  funeral_location text,
  town text default 'Retford',
  image_url text,
  summary text check (summary is null or char_length(summary) <= 320),
  tribute text,
  family_message text,
  donation_url text,
  submitter_name text not null,
  submitter_email text not null,
  submitter_phone text,
  comment_count integer not null default 0
);

create table if not exists public.obituary_comments (
  id uuid primary key default gen_random_uuid(),
  obituary_id uuid not null references public.obituaries(id) on delete cascade,
  created_at timestamptz not null default now(),
  status text not null default 'published'
    check (status in ('published', 'hidden')),
  commenter_name text not null check (char_length(commenter_name) between 2 and 120),
  commenter_email text,
  message text not null check (char_length(message) between 2 and 2500)
);

create index if not exists obituaries_status_created_at_idx
  on public.obituaries (status, created_at desc);

create index if not exists obituaries_slug_idx
  on public.obituaries (slug);

create index if not exists obituaries_notice_type_idx
  on public.obituaries (notice_type);

create index if not exists obituary_comments_obituary_id_created_at_idx
  on public.obituary_comments (obituary_id, created_at asc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_obituaries_updated_at on public.obituaries;
create trigger set_obituaries_updated_at
before update on public.obituaries
for each row execute function public.set_updated_at();

create or replace function public.update_obituary_comment_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update obituaries
    set comment_count = (
      select count(*)
      from obituary_comments
      where obituary_id = new.obituary_id
        and status = 'published'
    )
    where id = new.obituary_id;
    return new;
  end if;

  if tg_op = 'UPDATE' then
    update obituaries
    set comment_count = (
      select count(*)
      from obituary_comments
      where obituary_id = new.obituary_id
        and status = 'published'
    )
    where id = new.obituary_id;

    if old.obituary_id <> new.obituary_id then
      update obituaries
      set comment_count = (
        select count(*)
        from obituary_comments
        where obituary_id = old.obituary_id
          and status = 'published'
      )
      where id = old.obituary_id;
    end if;

    return new;
  end if;

  update obituaries
  set comment_count = (
    select count(*)
    from obituary_comments
    where obituary_id = old.obituary_id
      and status = 'published'
  )
  where id = old.obituary_id;
  return old;
end;
$$;

drop trigger if exists obituary_comment_count_insert on public.obituary_comments;
create trigger obituary_comment_count_insert
after insert on public.obituary_comments
for each row execute function public.update_obituary_comment_count();

drop trigger if exists obituary_comment_count_update on public.obituary_comments;
create trigger obituary_comment_count_update
after update of status, obituary_id on public.obituary_comments
for each row execute function public.update_obituary_comment_count();

drop trigger if exists obituary_comment_count_delete on public.obituary_comments;
create trigger obituary_comment_count_delete
after delete on public.obituary_comments
for each row execute function public.update_obituary_comment_count();

alter table public.obituaries enable row level security;
alter table public.obituary_comments enable row level security;

drop policy if exists "Public can read published obituaries" on public.obituaries;
create policy "Public can read published obituaries"
on public.obituaries
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can submit published obituaries" on public.obituaries;
create policy "Public can submit published obituaries"
on public.obituaries
for insert
to anon, authenticated
with check (status = 'published');

drop policy if exists "Public can read published obituary comments" on public.obituary_comments;
create policy "Public can read published obituary comments"
on public.obituary_comments
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can submit published obituary comments" on public.obituary_comments;
create policy "Public can submit published obituary comments"
on public.obituary_comments
for insert
to anon, authenticated
with check (status = 'published');

grant usage on schema public to anon, authenticated;

revoke all on public.obituaries from anon, authenticated;
grant select (
  id,
  created_at,
  updated_at,
  slug,
  notice_type,
  status,
  full_name,
  known_as,
  age,
  date_of_birth,
  date_of_death,
  funeral_date,
  funeral_location,
  town,
  image_url,
  summary,
  tribute,
  family_message,
  donation_url,
  comment_count
) on public.obituaries to anon, authenticated;

grant insert (
  slug,
  notice_type,
  status,
  full_name,
  known_as,
  age,
  date_of_birth,
  date_of_death,
  funeral_date,
  funeral_location,
  town,
  image_url,
  summary,
  tribute,
  family_message,
  donation_url,
  submitter_name,
  submitter_email,
  submitter_phone
) on public.obituaries to anon, authenticated;

revoke all on public.obituary_comments from anon, authenticated;
grant select (
  id,
  obituary_id,
  created_at,
  status,
  commenter_name,
  message
) on public.obituary_comments to anon, authenticated;

grant insert (
  obituary_id,
  status,
  commenter_name,
  commenter_email,
  message
) on public.obituary_comments to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'obituary-images',
  'obituary-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read obituary images" on storage.objects;
create policy "Public can read obituary images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'obituary-images');

drop policy if exists "Public can upload obituary images" on storage.objects;
create policy "Public can upload obituary images"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'obituary-images');
