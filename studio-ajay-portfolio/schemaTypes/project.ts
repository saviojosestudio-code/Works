import { defineArrayMember, defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'e.g. 01 · Endurance Racing',
    }),
    defineField({
      name: 'location',
      title: 'Location / Series',
      type: 'string',
      description: 'e.g. France · Endurance Racing or Abu Dhabi, UAE',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'date',
      title: 'Display Date',
      type: 'string',
      description: 'e.g. June 2026',
    }),
    defineField({
      name: 'client',
      title: 'Client / Publication',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Editorial Narrative / Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover / Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'specs',
      title: 'Project Specifications',
      type: 'projectSpecs',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'projectPhoto',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      year: 'year',
      media: 'coverImage',
    },
    prepare({ title, category, year, media }) {
      return {
        title,
        subtitle: [category, year].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
