import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

/**
 * Safe wrapper around client.fetch that:
 * - Tags the request for Next.js on-demand cache revalidation
 * - Falls back gracefully on network errors (avoids 500 crashes)
 */
export async function safeSanityFetch<T>(
  query: string,
  params: Record<string, any> = {},
  fallback: T,
  tags?: string[]
): Promise<T> {
  try {
    const allTags = tags && tags.length > 0 
      ? Array.from(new Set([...tags, 'sanity']))
      : ['sanity']

    const data = await client.fetch<T>(query, params, {
      // next-sanity passes these through to Next.js fetch cache
      next: {
        tags: allTags,
      },
    })
    return data ?? fallback
  } catch (error) {
    console.warn('[Sanity Fetch Warning]: Network request failed. Using fallback data.', error)
    return fallback
  }
}

