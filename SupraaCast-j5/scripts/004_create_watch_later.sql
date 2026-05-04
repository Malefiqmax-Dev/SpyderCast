-- Create watch_later_items table
create table if not exists public.watch_later_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  tmdb_id int not null,
  media_type text not null,
  title text not null,
  poster_path text,
  vote_average real default 0,
  added_at timestamptz default now(),
  unique(user_id, tmdb_id, media_type)
);

alter table public.watch_later_items enable row level security;

drop policy if exists "watch_later_select_own" on public.watch_later_items;
create policy "watch_later_select_own" on public.watch_later_items for select using (auth.uid() = user_id);

drop policy if exists "watch_later_insert_own" on public.watch_later_items;
create policy "watch_later_insert_own" on public.watch_later_items for insert with check (auth.uid() = user_id);

drop policy if exists "watch_later_delete_own" on public.watch_later_items;
create policy "watch_later_delete_own" on public.watch_later_items for delete using (auth.uid() = user_id);
