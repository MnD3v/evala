export default {
  name: 'activite',
  title: 'Activités & Bons coins',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      description: 'Détermine l\'icône et la couleur affichées.',
      options: {
        list: [
          { title: '🍽️  Restaurants & Maquis',   value: 'restaurants' },
          { title: '🎵  Soirées & Animation',     value: 'soirees' },
          { title: '☕  Bars & Tchoukoutou',      value: 'bars' },
          { title: '🛍️  Marchés & Artisanat',     value: 'marches' },
          { title: '🏞️  Nature & Randonnées',     value: 'nature' },
          { title: '🏛️  Sites Culturels',         value: 'sites_culturels' },
          { title: '✨  Autre',                   value: 'autre' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Mots-clés affichés sous la description (ex: Cuisine locale, Terrasse…)',
    },
    {
      name: 'image',
      title: 'Image (optionnel)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'lien',
      title: 'Lien externe (optionnel)',
      type: 'url',
      description: 'URL vers une page de détail, un Google Maps, etc.',
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les cartes sont triées par ordre croissant.',
      initialValue: 99,
    },
    {
      name: 'actif',
      title: 'Afficher sur le site',
      type: 'boolean',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'categorie',
      media: 'image',
    },
    prepare({ title, subtitle, media }: any) {
      const emojis: Record<string, string> = {
        restaurants: '🍽️', soirees: '🎵', bars: '☕',
        marches: '🛍️', nature: '🏞️', sites_culturels: '🏛️', autre: '✨',
      };
      return {
        title,
        subtitle: emojis[subtitle] ? `${emojis[subtitle]} ${subtitle}` : subtitle,
        media,
      };
    },
  },
}
