const fs = require('fs');
const path = require('path');

const robotsContent = `# www.robotstxt.org/

# Allow crawling of all content
User-agent: *
Allow: /
Allow: /gallery
Allow: /about
Allow: /contact

# Prevent crawling of non-public areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: /*?*

# Crawl-delay for all bots
Crawl-delay: 10

# Sitemaps
Sitemap: https://evala.tg/sitemap.xml

# Social Media Bots
User-agent: Twitterbot
Allow: /images/
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.gif$

User-agent: facebookexternalhit
Allow: /images/
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.gif$
`;

const filePath = path.join(__dirname, 'public', 'robots.txt');

// Vérifie si le dossier public existe, sinon le créer
if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

// Écrit le fichier robots.txt
fs.writeFileSync(filePath, robotsContent);

console.log('✅ robots.txt généré avec succès !');
