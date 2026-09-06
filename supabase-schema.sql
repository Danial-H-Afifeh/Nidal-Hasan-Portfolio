create table if not exists public.work_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null,
  meta text not null,
  date text not null,
  media_url text,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  tone text default 'blue',
  created_by uuid references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now()
);

alter table public.work_entries add column if not exists media_type text not null default 'image';

alter table public.work_entries enable row level security;
create policy "Public can read published work" on public.work_entries for select using (true);
create policy "Authenticated admins can publish work" on public.work_entries for insert to authenticated with check (auth.uid() = created_by);

-- Create a public Storage bucket named work-images in Supabase Storage.
insert into storage.buckets (id, name, public)
values ('work-images', 'work-images', true)
on conflict (id) do update set public = true;

create policy "Public can view work images"
on storage.objects for select
using (bucket_id = 'work-images');

create policy "Authenticated admins can upload work images"
on storage.objects for insert to authenticated
with check (bucket_id = 'work-images');
