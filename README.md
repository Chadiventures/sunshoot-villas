# Sun Shoot Villas Seminyak

Marketing website for Sun Shoot Villas Seminyak — four private pool villas in Seminyak, Bali.

## Development

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Panel

Visit `/admin` to edit villa descriptions, image URLs, and pricing.

Default password: `sunshoot-admin` (override with `ADMIN_PASSWORD` env var).

## Deployment (Coolify)

This project includes a `Dockerfile` configured for Next.js standalone output.

1. Create a new application in Coolify pointing to this repo
2. Set domain to `sunshoot.shorelinetechstudio.se`
3. Set build pack to Dockerfile
4. Add environment variable `ADMIN_PASSWORD` with a secure password
5. Mount a persistent volume at `/app/data` so admin edits survive redeploys

## Pages

- `/` — Home
- `/villas` — All villas overview
- `/villas/mawar`, `/villas/jepun`, `/villas/anggrek`, `/villas/sandat`
- `/about` — About us
- `/contact` — Contact and enquiry form (WhatsApp)
- `/admin` — Content management
