create extension if not exists vector with schema extensions;

create table if not exists public.academic_source_chunks (
  user_id uuid not null references auth.users(id) on delete cascade,
  chunk_id text not null,
  file_id text not null,
  course_id text not null,
  topic_id text,
  content text not null,
  character_start integer not null default 0 check (character_start >= 0),
  character_end integer not null check (character_end > character_start),
  embedding extensions.vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, chunk_id)
);

create index if not exists academic_source_chunks_scope_idx
  on public.academic_source_chunks (user_id, course_id, topic_id);
create index if not exists academic_source_chunks_embedding_idx
  on public.academic_source_chunks using hnsw (embedding extensions.vector_cosine_ops);

alter table public.academic_source_chunks enable row level security;

drop policy if exists "Users own academic chunks" on public.academic_source_chunks;
create policy "Users own academic chunks"
  on public.academic_source_chunks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.ai_usage_buckets (
  user_id uuid not null references auth.users(id) on delete cascade,
  bucket_kind text not null check (bucket_kind in ('hour', 'day')),
  bucket_start timestamptz not null,
  requests integer not null default 0 check (requests >= 0),
  primary key (user_id, bucket_kind, bucket_start)
);

alter table public.ai_usage_buckets enable row level security;

create or replace function public.claim_ai_request(
  p_hour_limit integer default 20,
  p_day_limit integer default 100
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_hour timestamptz := date_trunc('hour', now());
  v_day timestamptz := date_trunc('day', now());
  v_hour_count integer;
  v_day_count integer;
begin
  if v_user is null then return false; end if;

  insert into public.ai_usage_buckets (user_id, bucket_kind, bucket_start, requests)
  values (v_user, 'hour', v_hour, 0), (v_user, 'day', v_day, 0)
  on conflict do nothing;

  select requests into v_hour_count
    from public.ai_usage_buckets
    where user_id = v_user and bucket_kind = 'hour' and bucket_start = v_hour
    for update;
  select requests into v_day_count
    from public.ai_usage_buckets
    where user_id = v_user and bucket_kind = 'day' and bucket_start = v_day
    for update;

  if v_hour_count >= p_hour_limit or v_day_count >= p_day_limit then return false; end if;

  update public.ai_usage_buckets set requests = requests + 1
    where user_id = v_user and bucket_kind = 'hour' and bucket_start = v_hour;
  update public.ai_usage_buckets set requests = requests + 1
    where user_id = v_user and bucket_kind = 'day' and bucket_start = v_day;
  return true;
end;
$$;

revoke all on function public.claim_ai_request(integer, integer) from public;
grant execute on function public.claim_ai_request(integer, integer) to authenticated;

create or replace function public.match_academic_chunks(
  p_course_id text,
  p_topic_id text,
  p_embedding extensions.vector(1536),
  p_limit integer default 12
) returns table (
  chunk_id text,
  file_id text,
  content text,
  character_start integer,
  character_end integer,
  similarity real
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  select c.chunk_id, c.file_id, c.content, c.character_start, c.character_end,
    (1 - (c.embedding <=> p_embedding))::real as similarity
  from public.academic_source_chunks c
  where c.user_id = auth.uid()
    and c.course_id = p_course_id
    and c.topic_id = p_topic_id
    and c.embedding is not null
  order by c.embedding <=> p_embedding
  limit least(greatest(p_limit, 1), 24);
$$;

grant execute on function public.match_academic_chunks(text, text, extensions.vector, integer) to authenticated;
