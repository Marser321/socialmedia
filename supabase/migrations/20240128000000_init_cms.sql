-- Create Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  category text not null, -- 'E-commerce', 'Apps', 'Contenido', etc.
  image_url text not null,
  demo_url text, -- Link to live project
  is_featured boolean default false,
  metric text, -- e.g. "+240% Sales"
  metric_color text default 'from-blue-500/20', -- Tailwind gradient class
  tags text[] -- Array of strings for tech stack
);

-- Enable RLS
alter table public.projects enable row level security;

-- Policies
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using (true);

create policy "Admins can insert projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated'); -- Assuming you will use Supabase Auth

create policy "Admins can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');

-- Storage Bucket for Portfolio Images
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true);

create policy "Public Access to Portfolio Images"
  on storage.objects for select
  using ( bucket_id = 'portfolio' );

create policy "Authenticated Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'portfolio' and auth.role() = 'authenticated' );
