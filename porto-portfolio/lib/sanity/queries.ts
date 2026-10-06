import { defineQuery } from 'next-sanity'

// 1. Fetch all portfolio categories with project counts
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    tag,
    description,
    cta,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    "projects": *[_type == "project" && references(^._id)] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      tag,
      location,
      year,
      client,
      coverImage {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`)

// 2. Fetch single category by slug with its projects
export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && (
    slug.current in $slugs ||
    lower(slug.current) in $slugsLower ||
    slug.current == $slug ||
    lower(slug.current) == lower($slug)
  )][0] {
    _id,
    title,
    "slug": slug.current,
    tag,
    description,
    cta,
    coverImage {
      ...,
      asset-> {
        _id,
        url
      },
      alt
    },
    "projects": *[_type == "project" && references(^._id)] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      tag,
      location,
      date,
      year,
      client,
      description,
      coverImage {
        ...,
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`)

// 3. Fetch all category slugs for static params
export const ALL_CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] {
    "slug": slug.current
  }
`)

// 4. Fetch single project by category and project slug
export const PROJECT_BY_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && (
    slug.current in $projectSlugs ||
    lower(slug.current) in $projectSlugsLower ||
    slug.current == $projectSlug ||
    lower(slug.current) == lower($projectSlug)
  ) && (
    category->slug.current in $categorySlugs ||
    lower(category->slug.current) in $categorySlugsLower ||
    category->slug.current == $categorySlug ||
    lower(category->slug.current) == lower($categorySlug)
  )][0] {
    _id,
    title,
    "slug": slug.current,
    tag,
    location,
    date,
    year,
    client,
    description,
    coverImage {
      ...,
      asset-> {
        _id,
        url
      },
      alt
    },
    specs,
    images[] {
      ...,
      _key,
      title,
      subtitle,
      location,
      aspect,
      category,
      alt,
      image {
        ...,
        asset-> {
          _id,
          url
        }
      }
    },
    category-> {
      _id,
      title,
      "slug": slug.current,
      "projects": *[_type == "project" && references(^._id)] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        tag,
        location,
        year,
        client,
        coverImage {
          ...,
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    }
  }
`)

// 4b. Fallback project fetch by slug alone if category reference differs
export const PROJECT_BY_SLUG_FALLBACK_QUERY = defineQuery(`
  *[_type == "project" && (
    slug.current in $projectSlugs ||
    lower(slug.current) in $projectSlugsLower ||
    slug.current == $projectSlug ||
    lower(slug.current) == lower($projectSlug)
  )][0] {
    _id,
    title,
    "slug": slug.current,
    tag,
    location,
    date,
    year,
    client,
    description,
    coverImage {
      ...,
      asset-> {
        _id,
        url
      },
      alt
    },
    specs,
    images[] {
      ...,
      _key,
      title,
      subtitle,
      location,
      aspect,
      category,
      alt,
      image {
        ...,
        asset-> {
          _id,
          url
        }
      }
    },
    category-> {
      _id,
      title,
      "slug": slug.current,
      "projects": *[_type == "project" && references(^._id)] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        tag,
        location,
        year,
        client,
        coverImage {
          ...,
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    }
  }
`)

// 5. Fetch all project paths for static params
export const ALL_PROJECT_PATHS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && defined(category->slug.current)] {
    "category": category->slug.current,
    "project": slug.current
  }
`)

// 6. Fetch Global Site Settings & Profile
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    brand,
    name,
    role,
    location,
    availability,
    timezone,
    heroMediaType,
    heroVideoUrl,
    heroVideoFile {
      asset-> {
        _id,
        url
      }
    },
    heroTitle,
    heroBadge,
    heroFloatingText,
    heroFloatingImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    heroTagline,
    heroDescription,
    heroImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    aboutTag,
    aboutTitle,
    aboutBio,
    aboutQuote,
    aboutImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    contactHeading,
    contactSubheading,
    contactImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    emails,
    phones,
    socials
  }
`)

// 7. Fetch Testimonials
export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    author,
    role,
    stat,
    quote,
    avatar {
      ...,
      asset-> {
        _id,
        url
      }
    }
  }
`)
