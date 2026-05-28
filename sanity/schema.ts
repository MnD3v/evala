import { type SchemaTypeDefinition } from 'sanity'
import jobApplication from './schemas/jobApplication'
import jobOffer from './schemas/jobOffer'
import activite from './schemas/activite'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [jobApplication, jobOffer, activite],
}