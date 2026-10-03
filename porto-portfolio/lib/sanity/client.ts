import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

export async function safeSanityFetch<T>(
  query: string,
  params: Record<string, any> = {},
  fallback: T
): Promise<T> {
  try {
    const data = await client.fetch<T>(query, params)
    return data ?? fallback
  } catch (error) {
    console.warn('[Sanity Fetch Warning]: Network request failed or offline. Using fallback data.', error)
    return fallback
  }
}
