create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  email text not null,
  avatar text default 'https://static.crunchyroll.com/assets/avatar/170x170/0011-puck.png',
  name_color text default '#ffffff',
  role text default 'member',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

drop policy if exists "profiles_select_all" on public.profiles;
create policy "profiles_select_all" on public.profiles for select using (true);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, email, avatar, name_color, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', 'Exemple'),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'avatar', 'https://static.crunchyroll.com/assets/avatar/170x170/0011-puck.png'),
    coalesce(new.raw_user_meta_data ->> 'name_color', '#ffffff'),
    case when new.email = 'malefiqmax@gmail.com' then 'admin' else 'member' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
