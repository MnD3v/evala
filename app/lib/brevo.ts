/* Toutes les alertes transitent par /api/admin/alert (serveur) — la clé Brevo n'est jamais exposée au navigateur. */

async function postAlert(payload: object) {
  await fetch("/api/admin/alert", {
    method:  "POST",
    headers: { "content-type": "application/json" },
    body:    JSON.stringify(payload),
  }).catch(console.error);
}

export const alertNouvelleBoutique = (nom: string, categorie: string, localite: string) =>
  postAlert({ type: "boutique", nom, categorie, localite });

export const alertNouveauLogement = (titre: string, typeLog: string, ville: string) =>
  postAlert({ type: "logement", titre, typeLog, ville });

export const alertNouvelleOffre = (titre: string, domaine: string, lieu: string) =>
  postAlert({ type: "offre", titre, domaine, lieu });
