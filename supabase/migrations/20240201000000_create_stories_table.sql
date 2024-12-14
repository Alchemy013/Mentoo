-- Create Stories Table
create table public.stories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  author text not null default 'Anonymous',
  category text not null check (category in ('Legal', 'Workplace', 'Personal', 'Other')),
  content text not null,
  likes integer not null default 0,
  
  -- Add constraints
  constraint title_length check (char_length(title) >= 3 and char_length(title) <= 200),
  constraint content_length check (char_length(content) >= 10)
);

-- Set up Row Level Security (RLS)
alter table public.stories enable row level security;

-- Create policy to allow anyone to read stories
create policy "Anyone can read stories"
  on public.stories for select
  using (true);

-- Create policy to allow authenticated users to insert stories
create policy "Authenticated users can insert stories"
  on public.stories for insert
  with check (auth.role() = 'authenticated');

-- Create indexes for better performance
create index stories_created_at_idx on public.stories (created_at desc);
create index stories_likes_idx on public.stories (likes desc);

-- Add comment to the table
comment on table public.stories is 'Table storing user stories about harassment and false accusations';

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant select on public.stories to anon, authenticated;
grant insert on public.stories to authenticated;