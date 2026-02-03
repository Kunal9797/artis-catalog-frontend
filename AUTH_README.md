# Authentication Setup

Simple password protection has been added to the catalog.

## Default Password
- **Password:** `artis2026`

## Setup on Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to: Project → Settings → Environment Variables
3. Add variable:
   - **Key:** `AUTH_PASSWORD`
   - **Value:** Your desired password (e.g., `artis2026` or create your own)
   - **Environment:** Production, Preview, Development (check all)
4. Redeploy the project

## Change Password

### For Production (Vercel):
1. Update the `AUTH_PASSWORD` environment variable in Vercel settings
2. Redeploy

### For Local Development:
Edit `.env.local` and change the `AUTH_PASSWORD` value

## How It Works

- Uses Next.js middleware to check for authentication cookie
- Simple password prompt page for unauthenticated users
- Cookie lasts 7 days
- Password is stored in cookie (httpOnly, secure in production)

## Security Note

This is **basic protection** suitable for temporary/internal use. For production or sensitive data:
- Use a strong, unique password
- Consider implementing proper user authentication (NextAuth, Auth0, etc.)
- Add rate limiting
- Use HTTPS (automatic on Vercel)

## Remove Authentication

To disable password protection:
1. Delete `src/middleware.ts`
2. Delete `src/app/api/auth/route.ts`
3. Push changes to GitHub
