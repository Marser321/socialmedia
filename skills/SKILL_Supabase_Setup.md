---
description: Guide for setting up Supabase projects and integrating with Next.js App Router.
---

# Skill: Supabase Setup & Integration

## 1. Project Initialization
1. Go to [database.new](https://database.new) and create a project.
2. Get `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Settings > API.
3. Add to `.env.local`.

## 2. Table Setup (Leads)
Run this SQL in Supabase SQL Editor:
```sql
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre text not null,
  email text not null,
  telefono text,
  empresa text,
  servicios_interes text[],
  mensaje text,
  status text default 'new'::text
);

-- RLS Policies
alter table public.leads enable row level security;

create policy "Enable insert for anon users" on public.leads
  for insert with check (true);

create policy "Enable select for service_role only" on public.leads
  for select using (false); -- Only admin/service_role can read
```

## 3. Client Integration (Next.js)
We use `createClient` from `@supabase/supabase-js` or `@supabase/ssr`.

### Server Action Pattern
Create `actions/submit-lead.ts`:
```typescript
'use server'
import { createClient } from '@/utils/supabase/server' // or lib/supabase

export async function submitLead(data: any) {
  // logic
}
```

## 4. Environment Variables
Ensure `.env.local` is present in local dev and Vercel.
