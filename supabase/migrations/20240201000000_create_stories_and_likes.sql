-- Drop existing tables and functions if they exist
drop function if exists increment_likes cascade;
drop table if exists public.story_likes cascade;
drop table if exists public.stories cascade;

-- Create Stories Table
create table public.stories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  author text not null default 'Anonymous',
  category text not null check (category in ('Legal', 'Workplace', 'Personal', 'Other')),
  content text not null,
  likes integer not null default 0,
  user_id uuid not null references auth.users(id),
  
  -- Add constraints
  constraint title_length check (char_length(title) >= 3 and char_length(title) <= 200),
  constraint content_length check (char_length(content) >= 10),
  constraint one_story_per_user unique (user_id)
);

-- Create likes table to track user likes
create table public.story_likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  story_id uuid not null references public.stories(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, story_id)
);

-- Create function to handle story likes
create or replace function increment_likes(story_id uuid, user_id uuid)
returns void as $$
declare
  like_exists boolean;
begin
  -- Check if like already exists
  select exists(
    select 1 from story_likes
    where story_likes.story_id = increment_likes.story_id
    and story_likes.user_id = increment_likes.user_id
  ) into like_exists;

  if not like_exists then
    -- Insert new like
    insert into story_likes (user_id, story_id)
    values (user_id, story_id);
  else
    -- Remove existing like
    delete from story_likes
    where story_likes.story_id = increment_likes.story_id
    and story_likes.user_id = increment_likes.user_id;
  end if;

  -- Update story likes count
  update stories
  set likes = (
    select count(*)
    from story_likes
    where story_likes.story_id = stories.id
  )
  where id = story_id;
end;
$$ language plpgsql security definer;

-- Set up Row Level Security (RLS)
alter table public.stories enable row level security;
alter table public.story_likes enable row level security;

-- Create policies for stories table
create policy "Anyone can read stories"
  on public.stories for select
  using (true);

create policy "Authenticated users can insert stories"
  on public.stories for insert
  with check (auth.role() = 'authenticated');

-- Create policies for likes table
create policy "Users can manage their own likes"
  on public.story_likes
  using (auth.uid() = user_id);

create policy "Everyone can view likes"
  on public.story_likes for select
  using (true);

-- Create indexes for better performance
create index stories_created_at_idx on public.stories (created_at desc);
create index stories_likes_idx on public.stories (likes desc);
create index story_likes_story_id_idx on public.story_likes (story_id);
create index stories_user_id_idx on public.stories (user_id);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant select on public.stories to anon, authenticated;
grant insert on public.stories to authenticated;
grant all on public.story_likes to authenticated;