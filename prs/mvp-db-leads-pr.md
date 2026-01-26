Pr: MVP Leads DB Integration

Summary
- Add integration for leads handling: create table, seed, and connect contact form to addLead in Supabase.

What changed (high level)
- Supabase lib:
  - Added addLead helper to insert leads into public.leads
- Contact form:
  - Connect form submission to addLead; show UI confirmation
- Seeds:
  - Seed SQL for leads and development seed data

Files touched (representative)
- lib/supabase.ts
- components/sections/ContactForm.tsx
- supabase/seed.sql
- nexo-agency/supabase/seed.sql (duplicated seed path if exists; verify)

Testing plan
- Run the app: npm run dev; submit the contact form with test data
- Check Supabase Studio: leads table contains new entries after form submission
- Validate UI shows confirmation after submit

Acceptance criteria
- Contact form submission creates a lead in Supabase
- Seed data present in database for development
- Lead data structure matches Lead type definition

Rollback plan
- If DB hookup fails, revert ContactForm changes and revert addLead usage until API is ready.

Notes
- This patch focuses on backend integration for MVP; UX remains in a separate patch.
