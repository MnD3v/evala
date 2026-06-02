import { NextRequest, NextResponse } from "next/server";

const BREVO_API   = "https://api.brevo.com/v3/smtp/email";
const ADMIN_EMAIL = "em.djatika@gmail.com";
const SENDER      = { name: "Evala", email: "alerte@evala.tg" };

/* ── Rate limiter en mémoire : 5 alertes / IP / minute ── */
const rl = new Map<string, { n: number; reset: number }>();

function allowed(ip: string): boolean {
  const now = Date.now();
  const e   = rl.get(ip);
  if (!e || now > e.reset) { rl.set(ip, { n: 1, reset: now + 60_000 }); return true; }
  if (e.n >= 5) return false;
  e.n++;
  return true;
}

/* ── Escaping HTML ── */
const esc = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c));

/* ── Types de payload ── */
type Payload =
  | { type: "boutique"; nom: string; categorie: string; localite: string }
  | { type: "logement"; titre: string; typeLog: string; ville: string }
  | { type: "offre";    titre: string; domaine: string; lieu: string };

function buildEmail(p: Payload): { subject: string; body: string } {
  switch (p.type) {
    case "boutique":
      return {
        subject: `Nouvelle boutique : ${esc(p.nom)}`,
        body: `<strong>${esc(p.nom)}</strong> (${esc(p.categorie)}) vient d'être soumise depuis <strong>${esc(p.localite)}</strong>. Elle est en attente de validation.`,
      };
    case "logement":
      return {
        subject: `Nouveau logement : ${esc(p.titre)}`,
        body: `<strong>${esc(p.titre)}</strong> (${esc(p.typeLog)}) à <strong>${esc(p.ville)}</strong> est en attente de validation.`,
      };
    case "offre":
      return {
        subject: `Nouvelle offre : ${esc(p.titre)}`,
        body: `<strong>${esc(p.titre)}</strong> (${esc(p.domaine)}) à <strong>${esc(p.lieu)}</strong> est en attente de validation.`,
      };
  }
}

function htmlTemplate(title: string, body: string, ctaUrl: string, ctaLabel: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="background:#000;padding:24px 32px;">
      <span style="font-size:22px;font-weight:700;letter-spacing:-0.5px;">
        <span style="color:#006A4E;">E</span><span style="color:#FFCD00;">V</span><span style="color:#CE1126;">A</span><span style="color:#006A4E;">L</span><span style="color:#FFCD00;">A</span>
      </span>
      <span style="color:rgba(255,255,255,0.4);font-size:12px;margin-left:12px;">Alerte admin</span>
    </div>
    <div style="padding:32px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#111;font-weight:700;">${title}</h2>
      <p style="margin:0 0 20px;color:#555;font-size:15px;line-height:1.6;">${body}</p>
      <a href="${ctaUrl}" style="display:inline-block;background:#006A4E;color:#fff;text-decoration:none;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;">${ctaLabel}</a>
    </div>
    <div style="background:#f9f9f9;border-top:1px solid #eee;padding:16px 32px;">
      <p style="margin:0;color:#999;font-size:12px;">evala.tg — Panneau d'administration</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  /* Clé API disponible uniquement côté serveur */
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false }, { status: 503 });

  /* Rate limiting par IP */
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
          ?? req.headers.get("x-real-ip")
          ?? "unknown";
  if (!allowed(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  /* Validation du body */
  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!payload?.type || !["boutique", "logement", "offre"].includes(payload.type)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { subject, body } = buildEmail(payload);

  const titles: Record<string, string> = {
    boutique: "Une nouvelle boutique a été créée",
    logement: "Un nouveau logement a été soumis",
    offre:    "Une nouvelle offre d'emploi a été soumise",
  };

  const html = htmlTemplate(titles[payload.type], body, "https://evala.tg/admin", "Voir dans l'admin");

  await fetch(BREVO_API, {
    method:  "POST",
    headers: { accept: "application/json", "content-type": "application/json", "api-key": apiKey },
    body:    JSON.stringify({ sender: SENDER, to: [{ email: ADMIN_EMAIL, name: "Djatika" }], subject, htmlContent: html }),
  }).catch(console.error);

  return NextResponse.json({ ok: true });
}
