import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password protection middleware
// Password is stored in environment variable: AUTH_PASSWORD

const LOGIN_PATH = '/api/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth for API routes and static files
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api') || 
      pathname.includes('.')) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const authCookie = request.cookies.get('artis_catalog_auth')?.value
  const expectedPassword = process.env.AUTH_PASSWORD || 'artis2026'

  if (authCookie === expectedPassword) {
    return NextResponse.next()
  }

  // Not authenticated - show password prompt
  const response = new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Artis Catalog - Authentication</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      padding: 48px 40px;
      max-width: 420px;
      width: 100%;
    }
    h1 {
      color: #d97706;
      font-size: 28px;
      margin-bottom: 8px;
      text-align: center;
    }
    .subtitle {
      color: #6b7280;
      text-align: center;
      margin-bottom: 32px;
      font-size: 14px;
    }
    .form-group {
      margin-bottom: 24px;
    }
    label {
      display: block;
      color: #374151;
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 14px;
    }
    input[type="password"] {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus {
      outline: none;
      border-color: #f59e0b;
    }
    button {
      width: 100%;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
      border: none;
      padding: 14px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
    }
    button:active {
      transform: translateY(0);
    }
    .error {
      background: #fee2e2;
      color: #991b1b;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 14px;
      display: none;
    }
    .error.show {
      display: block;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔐 Artis Catalog</h1>
    <p class="subtitle">Internal Access Only</p>
    <div id="error" class="error">Incorrect password. Please try again.</div>
    <form method="POST" action="/api/auth">
      <div class="form-group">
        <label for="password">Enter Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Enter access password"
          required
          autocomplete="off"
          autofocus
        />
      </div>
      <button type="submit">Access Catalog</button>
    </form>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === '1') {
      document.getElementById('error').classList.add('show');
    }
  </script>
</body>
</html>`,
    {
      status: 401,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  )

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
