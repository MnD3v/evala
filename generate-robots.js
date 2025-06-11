const fs = require('fs');
const path = require('path');

const robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Sitemap: https://example.com/sitemap.xml
`;

const filePath = path.join(__dirname, 'public', 'robots.txt');

// Vérifie si le dossier `public` existe, sinon le créer
if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

// Écrit le fichier robots.txt
fs.writeFileSync(filePath, robotsContent);

console.log('✅ robots.txt généré avec succès !');
