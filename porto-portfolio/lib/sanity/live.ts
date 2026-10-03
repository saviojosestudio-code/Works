import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Silence warnings when no token is configured.
  // Live updates still work for published content — only draft previews need a token.
  serverToken: process.env.SANITY_API_READ_TOKEN || false,
  browserToken: process.env.SANITY_API_READ_TOKEN || false,
})
