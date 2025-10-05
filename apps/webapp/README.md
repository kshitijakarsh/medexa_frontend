# MedExe Hospital Portal

Per-hospital web application for MedExe platform. Each hospital gets its own subdomain.

## Features

- **Multitenant Architecture**: Host-based routing using subdomains
- **Hospital Dashboard**: Overview of patients, appointments, and staff
- **Settings Management**: Configure hospital-specific settings
- **Tenant Isolation**: Each hospital's data is isolated by tenant

## Development

```bash
# Install dependencies
pnpm install

# Run development server (port 3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_DOMAIN=lvh.me
```

## Accessing Tenant Portals

### Development

- **Tenant "alpha"**: http://alpha.lvh.me:3000
- **Tenant "beta"**: http://beta.lvh.me:3000
- **Any tenant**: http://[tenant-slug].lvh.me:3000

Note: `lvh.me` automatically resolves to `127.0.0.1`, making it perfect for local subdomain testing.

### Production

- **Tenant subdomain**: https://[tenant-slug].domain.com

## How It Works

1. **Middleware**: Extracts tenant slug from subdomain (e.g., `alpha` from `alpha.domain.com`)
2. **Internal Rewrite**: Routes requests to `/t/[tenant]/...` namespace
3. **Tenant Context**: Available via `params.tenant` and `x-tenant` header
4. **URL Transparency**: Browser shows clean URLs without `/t/[tenant]` prefix

## Route Structure

All tenant routes are under `app/t/[tenant]/`:

- `/` → Dashboard home
- `/dashboard` → Main dashboard
- `/settings` → Hospital settings

The middleware automatically rewrites:

- `alpha.domain.com/` → `/t/alpha/`
- `alpha.domain.com/dashboard` → `/t/alpha/dashboard`
- `alpha.domain.com/settings` → `/t/alpha/settings`

## Adding New Routes

Create new pages under `app/t/[tenant]/`:

```tsx
// app/t/[tenant]/patients/page.tsx
export default function Patients({ params }: { params: { tenant: string } }) {
  return <div>Patients for {params.tenant}</div>
}
```

Access at: `[tenant].domain.com/patients`
