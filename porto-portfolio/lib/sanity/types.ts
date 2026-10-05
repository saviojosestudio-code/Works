// Sanity-typed shapes returned from GROQ queries.
// These mirror the schema defined in studio-ajay-portfolio/schemaTypes.

export interface SanityImageAsset {
  _id: string
  url: string
}

export interface SanityFileAsset {
  _id: string
  url: string
}

export interface SanityFile {
  asset?: SanityFileAsset
}

export interface SanityImage {
  asset?: SanityImageAsset
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SanityProjectSpecs {
  cameraTech?: string
  duration?: string
  turns?: string
  elevation?: string
  laps?: string
  client?: string
  role?: string
  deliverables?: string
}

export interface SanityProjectPhoto {
  _key?: string
  title?: string
  subtitle?: string
  location?: string
  aspect?: 'landscape' | 'portrait'
  category?: string
  alt?: string
  image?: SanityImage
}

export interface SanityProjectSummary {
  _id: string
  title: string
  slug: string
  tag?: string
  location?: string
  year?: string
  client?: string
  coverImage?: SanityImage
}

export interface SanityProject {
  _id: string
  title: string
  slug: string
  tag?: string
  location?: string
  date?: string
  year?: string
  client?: string
  description?: string
  coverImage?: SanityImage
  specs?: SanityProjectSpecs
  images?: SanityProjectPhoto[]
  category?: SanityCategory
}

export interface SanityCategory {
  _id: string
  title: string
  slug: string
  tag?: string
  description?: string
  cta?: string
  coverImage?: SanityImage
  projects?: SanityProjectSummary[]
}

export interface SanityPhone {
  _key: string
  label: string
  number: string
}

export interface SanitySocial {
  _key: string
  name: string
  url: string
}

export interface SanitySiteSettings {
  brand?: string
  name?: string
  role?: string
  location?: string
  availability?: string
  timezone?: string
  heroMediaType?: 'video' | 'image'
  heroVideoUrl?: string
  heroVideoFile?: SanityFile
  heroTitle?: string
  heroBadge?: string
  heroFloatingText?: string
  heroFloatingImage?: SanityImage
  heroTagline?: string
  heroDescription?: string
  heroImage?: SanityImage
  aboutTag?: string
  aboutTitle?: string
  aboutBio?: string[]
  aboutQuote?: string
  aboutImage?: SanityImage
  contactHeading?: string
  contactSubheading?: string
  contactImage?: SanityImage
  emails?: string[]
  phones?: SanityPhone[]
  socials?: SanitySocial[]
}

export interface SanityTestimonial {
  _id: string
  author: string
  role: string
  stat?: string
  quote: string
  avatar?: SanityImage
}
