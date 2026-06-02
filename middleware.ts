import { NextRequest, NextResponse } from "next/server";

/*
 * La protection /admin est gérée côté client dans app/admin/page.tsx :
 * seul em.djatika@gmail.com peut accéder au panneau.
 * Supabase utilise localStorage (pas les cookies), donc on ne peut pas
 * vérifier la session ici — on laisse passer et la page prend le relais.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
