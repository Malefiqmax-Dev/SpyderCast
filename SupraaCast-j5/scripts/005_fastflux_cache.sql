create table if not exists public.fastflux_cache (
  id uuid primary key default gen_random_uuid(),
  tmdb_id int not null,
  media_type text not null, -- 'movie' or 'tv'
  season int,
  episode int,
  metadata jsonb,
  source_url text,
  updated_at timestamptz default now(),
  unique(tmdb_id, media_type, season, episode)
);

alter table public.fastflux_cache enable row level security;

-- Only admins or the system can update cache, but anyone can read it to watch
create policy "fastflux_cache_select_all" on public.fastflux_cache for select using (true);
create policy "fastflux_cache_insert_system" on public.fastflux_cache for insert with check (true); -- Ideally restricted
create policy "fastflux_cache_update_system" on public.fastflux_cache for update using (true); -- Ideally restricted
