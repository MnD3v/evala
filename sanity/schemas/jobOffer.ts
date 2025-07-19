export default {
  name: 'jobOffer',
  title: 'Offres d\'emploi',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre du poste',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'type',
      title: 'Type de contrat',
      type: 'string',
      options: {
        list: [
          { title: 'Temporaire', value: 'temporary' },
          { title: 'Permanent', value: 'permanent' },
          { title: 'Freelance', value: 'freelance' },
          { title: 'Stage', value: 'internship' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Lieu',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'requirements',
      title: 'Prérequis',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Ouvert', value: 'open' },
          { title: 'Fermé', value: 'closed' }
        ]
      },
      initialValue: 'open'
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    },
    {
      name: 'deadline',
      title: 'Date limite de candidature',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type'
    }
  }
} 