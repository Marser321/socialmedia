Pr: MVP UX Implementation

Summary
- Add MVP UX work: search bar, theme toggle, skip-to-content, and bookmarking on service cards.

What changed (high level)
- Navbar:
  - Integrated SearchBar (frontend UX).
  - Integrated ThemeToggle (dark/light) with localStorage persistence.
- Services catalog:
  - Use MOCK_SERVICES as data source for the catalog.
  - Bookmark button on each service card.
- Accessibility:
  - Skip to content anchor added to layout for quick content access.

Files touched (representative)
- app/layout.tsx (skip-to-content anchor)
- components/layout/Navbar.tsx (SearchBar + ThemeToggle)
- components/sections/ServicesCatalog.tsx (MOCK_SERVICES usage, bookmark button)
- data/services.ts (MOCK_SERVICES as data source)
- UI components: ThemeToggle.tsx, SearchBar.tsx

Testing plan
- Run the app: npm run dev; visit http://localhost:3000
- Verify:
  1) Theme toggle switches dark/light and persists across reloads
  2) SearchBar filters the 6 services in real time
  3) Bookmark feature stores selections in localStorage and persists on refresh
  4) Skip to content focuses main content area
- Manual checks for responsive behavior on mobile

Acceptance criteria
- MVP UX features implemented and visible in UI
- No regressions in core landing/sections
- LocalStorage persistence verified for theme and bookmarks

Rollback plan
- If any UX component causes issues, revert the corresponding branch/patch and re-run tests; runbook included for QA.

Notes
- This is a frontend MVP patch. Backend (Leads) remains integrated via Supabase addLead; change management separate PR.
