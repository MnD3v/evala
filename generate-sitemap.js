const fs = require('fs');
const path = require('path');

// Liste des pages du site
const pages = [
  {
    url: 'https://evala.tg/',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    url: 'https://evala.tg/gallery',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    url: 'https://evala.tg/about',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    url: 'https://evala.tg/contact',
    priority: '0.7',
    changefreq: 'monthly'
  }
];

// Ajouter les pages de la galerie (images 1 à 6)
for (let i = 1; i <= 6; i++) {
  pages.push({
    url: `https://evala.tg/gallery/${i}`,
    priority: '0.6',
    changefreq: 'monthly'
  });
}

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Vérifie si le dossier public existe, sinon le créer
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
console.log('✅ Sitemap généré avec succès !');
