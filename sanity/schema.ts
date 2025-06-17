import { type SchemaTypeDefinition } from 'sanity'
import jobApplication from './schemas/jobApplication'
import jobOffer from './schemas/jobOffer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [jobApplication, jobOffer],
} 