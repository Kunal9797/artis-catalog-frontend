import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const password = formData.get('password')?.toString() || ''
  
  const expectedPassword = process.env.AUTH_PASSWORD || 'artis2026'

  if (password === expectedPassword) {
    // Password correct - set cookie and redirect
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set('artis_catalog_auth', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return response
  } else {
    // Password incorrect - redirect back with error
    return NextResponse.redirect(new URL('/?error=1', request.url))
  }
}
