import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any) {
  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as { user: { role: string } } | null;

  if (!session) {
    const requestedPage = req.page.name;
    return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
  }

  // Aply only in the route of admin
  if (req.nextUrl.pathname === '/admin') {
    const validRoles = ['admin', 'super-user', 'SEO'];

    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect('/');
    }
  }

  // Aply only in the route of api/admin
  if (req.nextUrl.pathname === '/api/admin') {
    if (!session) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const validRoles = ['admin', 'super-user', 'SEO'];
    if (!validRoles.includes(session.user.role)) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path, /admin/:path, /api/admin/:path, /checkout/:path'],
};
