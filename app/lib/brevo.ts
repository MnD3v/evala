const BREVO_API = "https://api.brevo.com/v3/smtp/email";
const ADMIN_EMAIL = "em.djatika@gmail.com";
const ADMIN_NAME  = "Djatika";
const SENDER      = { name: "Evala", email: "alerte@evala.tg" };

interface AlertOptions {
  subject: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export async function sendAdminAlert({ subject, title, body, ctaLabel, ctaUrl }: AlertOptions) {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
  if (!apiKey) return;

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
    <!-- Header -->
    <div style="background:#000;padding:24px 32px;">
      <span style="font-size:22px;font-weight:700;letter-spacing:-0.5px;">
        <span style="color:#006A4E;">E</span><span style="color:#FFCD00;">V</span><span style="color:#CE1126;">A</span><span style="color:#006A4E;">L</span><span style="color:#FFCD00;">A</span>
      </span>
      <span style="color:rgba(255,255,255,0.4);font-size:12px;margin-left:12px;">Alerte admin</span>
    </div>
    <!-- Corps -->
    <div style="padding:32px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#111;font-weight:700;">${title}</h2>
      <p style="margin:0 0 20px;color:#555;font-size:15px;line-height:1.6;">${body}</p>
      ${ctaLabel && ctaUrl ? `
      <a href="${ctaUrl}" style="display:inline-block;background:#006A4E;color:#fff;text-decoration:none;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;">${ctaLabel}</a>
      ` : ""}
    </div>
    <!-- Footer -->
    <div style="background:#f9f9f9;border-top:1px solid #eee;padding:16px 32px;">
      <p style="margin:0;color:#999;font-size:12px;">evala.tg — Panneau d'administration</p>
    </div>
  </div>
</body>
</html>`;

  await fetch(BREVO_API, {
    method: "POST",
    headers: {
      "accept":       "application/json",
      "content-type": "application/json",
      "api-key":      apiKey,
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: ADMIN_EMAIL, name: ADMIN_NAME }],
      subject,
      htmlContent,
    }),
  }).catch(console.error);
}

/* ── Helpers spécifiques ── */

export const alertNouvelleBoutique = (nom: string, categorie: string, localite: string) =>
  sendAdminAlert({
    subject: `🛍️ Nouvelle boutique : ${nom}`,
    title:   "Une nouvelle boutique a été créée",
    body:    `<strong>${nom}</strong> (${categorie}) vient d'être soumise depuis <strong>${localite}</strong>. Elle est en attente de validation.`,
    ctaLabel: "Voir dans l'admin",
    ctaUrl:   "https://evala.tg/admin",
  });

export const alertNouveauLogement = (titre: string, type: string, ville: string) =>
  sendAdminAlert({
    subject: `🏠 Nouveau logement : ${titre}`,
    title:   "Un nouveau logement a été soumis",
    body:    `<strong>${titre}</strong> (${type}) à <strong>${ville}</strong> est en attente de validation.`,
    ctaLabel: "Voir dans l'admin",
    ctaUrl:   "https://evala.tg/admin",
  });

export const alertNouvelleOffre = (titre: string, domaine: string, lieu: string) =>
  sendAdminAlert({
    subject: `💼 Nouvelle offre : ${titre}`,
    title:   "Une nouvelle offre d'emploi a été soumise",
    body:    `<strong>${titre}</strong> (${domaine}) à <strong>${lieu}</strong> est en attente de validation.`,
    ctaLabel: "Voir dans l'admin",
    ctaUrl:   "https://evala.tg/admin",
  });
