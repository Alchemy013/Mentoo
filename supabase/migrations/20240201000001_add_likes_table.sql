-- Drop existing tables and functions if they exist
drop function if exists increment_likes cascade;
drop table if exists public.story_likes cascade;

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

-- Set up RLS for likes table
alter table public.story_likes enable row level security;

-- Create policies
create policy "Users can manage their own likes"
  on public.story_likes
  using (auth.uid() = user_id);

create policy "Everyone can view likes"
  on public.story_likes for select
  using (true);

-- Grant permissions
grant usage on schema public to authenticated;
grant all on public.story_likes to authenticated;