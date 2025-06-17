export default {
  name: 'jobApplication',
  title: 'Candidatures',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Nom Complet',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Téléphone',
      type: 'string'
    },
    {
      name: 'skills',
      title: 'Compétences',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'experience',
      title: 'Expérience',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text'
    },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Nouvelle', value: 'new' },
          { title: 'En cours de traitement', value: 'processing' },
          { title: 'Contacté', value: 'contacted' },
          { title: 'Archivée', value: 'archived' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'submittedAt',
      title: 'Date de soumission',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    }
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email'
    }
  }
} 