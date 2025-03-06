// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Rutas públicas (accesibles sin autenticación)
  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  if (!session && !isPublicRoute && process.env.NEXT_PUBLIC_SKIP_AUTH === "false") {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }

  // Si el usuario está autenticado y está intentando acceder a login/register
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/tools/dashboard", request.url));
  }

  // En cualquier otro caso, permitir continuar
  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    "/tools/dashboard/:path*",
    "/login",
    "/register",
    // Excluir rutas estáticas
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};