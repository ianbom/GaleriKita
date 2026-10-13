# GaleriKita Admin

Adapted from [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin),
commit `e16c87f213a5ba5e45964e9b67c792105ec74d26`. The upstream MIT license is
retained in `docs/licenses/shadcn-admin.txt`.

## Integration

- Laravel/Inertia remains the router. `resources/js/layouts/app-layout.tsx`
  supplies the admin sidebar, header, search, account menu, and breadcrumbs.
- `/dashboard` contains Overview, Analytics, charts, recent sales, and a demo CSV download.
- `/admin/{tasks,users,apps,chats,help-center}` contains the remaining main pages.
- `/admin/settings/{profile,account,appearance,notifications,display}` contains
  demo settings; `/admin/settings` redirects to the demo profile.
- `/admin/demo/auth/{sign-in,sign-in-2,sign-up,forgot-password,otp}` and
  `/admin/demo/errors/{401,403,404,500,503}` use standalone preview layouts.
  Error previews return HTTP 200, not real application errors.
- Every admin route requires login and verified email. The existing User model
  does not implement `MustVerifyEmail`; `EnsureAdminEmailIsVerified` therefore
  enforces verification only for the dashboard/admin group. Existing Laravel
  authentication and settings endpoints are unchanged.

## Demo Boundaries

- Tasks and Users support local create/edit/delete, selection, filters, sorting,
  pagination, and bulk actions. Selected tasks can be exported as CSV.
- Apps connection buttons toggle local sample state; Chats sends local messages
  and opens conversations. Neither contacts external services.
- Changes reset after reload. No business models, database migrations, or APIs
  were added. The real account menu still opens Laravel profile/security/logout.
- Import only previews a selected CSV file; it does not import rows. Reports,
  dashboard Notifications, social sign-in, chat attachments/calls, and other
  unavailable upstream controls remain disabled. Help Center remains a placeholder.
- Dark theme, lime accents, and Plus Jakarta Sans are fixed. Appearance can
  change sidebar expansion; no light/dark, font switching, RTL, or Clerk integration.
- Sample data is deterministic. Passwords/OTP are not saved or displayed in
  submission summaries. CSV exports guard against spreadsheet formula injection.

## Verification

Use an isolated SQLite testing database, never the active application database.

```powershell
$env:DB_CONNECTION = 'sqlite'
$env:DB_DATABASE = ':memory:'
$env:DB_URL = ''
php artisan test --compact tests/Feature/AdminPagesTest.php tests/Feature/DashboardTest.php
node --experimental-strip-types tests/admin-demo-check.mjs
npm run types:check
npm run check
npm run build
```

Browser checks require `browser-harness` and a verified QA account already logged
into an isolated server. Set `ADMIN_QA_URL` to that server, optionally
`ADMIN_QA_TARGET` to its browser tab ID, then run:

```powershell
"exec(open('tests/admin-browser.py', encoding='utf-8').read())" | browser-harness
```

The browser check never submits real Laravel account settings. Screenshots are
written to the ignored `storage/app/admin-qa` directory.

## Existing Check Failures

- Global TypeScript checking is blocked by the generated Wayfinder
  RedirectController for the existing `/settings` redirect: Laravel's `query`
  method is not supported by the installed Wayfinder types. Admin source type
  checking passes with a temporary config targeting the admin entrypoints and
  their imports, without unrelated generated action index modules.
- Global formatting reports the existing
  `GaleriKita_Alur_Host_dan_Fotografer.md`; the integration files are formatted
  and pass scoped lint.
- The broader auth/theme test run has two existing failures for unverified users
  visiting the old appearance URL. Those Laravel settings routes were not changed.
- The npm audit reports three critical findings in the existing Vite Plus tooling
  dependency chain and one low Babel finding. Tooling upgrades are outside this
  template integration.
