import { NextRequest, NextResponse } from "next/server";

/*
 * Middleware de sécurité Evala
 *
 * /admin est protégé par une vérification de session Supabase dans la page elle-même.
 * Ce middleware ajoute une première couche : si aucune session Supabase n'est détectée
 * dans les cookies, on redirige directement vers /auth sans même charger la page admin.
 *
 * Note : la session Supabase doit utiliser le stockage par cookies (persistSession: true,
 * qui est la valeur par défaut) pour que ce contrôle fonctionne. Si le navigateur stocke
 * le token en localStorage seulement, ce middleware laisse passer — la page prend le relais.
 */

const SUPABASE_REF = "wblomyquorcbhzeyztob";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    /* Cherche n'importe quel cookie de session Supabase pour ce projet */
    const hasSession = [...req.cookies.getAll()].some(
      ({ name }) => name.startsWith(`sb-${SUPABASE_REF}-auth-token`)
    );

    if (!hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
