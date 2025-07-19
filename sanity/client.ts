import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "aejuflc7",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});