create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  education_level text,
  updated_at timestamptz default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  education_level text not null,
  description text
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id),
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions > 0),
  completed_at timestamptz not null default now()
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_url text not null,
  title text not null,
  created_at timestamptz not null default now(),
  unique(user_id, resource_url)
);

create table if not exists public.study_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  due_at timestamptz,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.bookmarks enable row level security;
alter table public.study_tasks enable row level security;

create policy "Subjects are publicly readable" on public.subjects
  for select using (true);

create policy "Users manage their profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage their quiz attempts" on public.quiz_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their bookmarks" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their study tasks" on public.study_tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
