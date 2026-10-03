import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Site Settings & Global Profile
      S.listItem()
        .title('Site Settings & Profile')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),

      // Core Portfolio Content
      S.documentTypeListItem('category').title('Portfolio Categories'),
      S.documentTypeListItem('project').title('Projects & Galleries'),
      S.divider(),

      // Social Proof & Testimonials
      S.documentTypeListItem('testimonial').title('Client Testimonials'),
    ])
