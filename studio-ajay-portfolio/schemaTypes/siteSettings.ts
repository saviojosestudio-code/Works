import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand Name',
      type: 'string',
      initialValue: 'RaphRev',
    }),
    defineField({
      name: 'name',
      title: 'Photographer Name',
      type: 'string',
      initialValue: 'Ajay Johnson',
    }),
    defineField({
      name: 'role',
      title: 'Professional Title',
      type: 'string',
      initialValue: 'Editorial Photographer + Visual Artist',
    }),
    defineField({
      name: 'location',
      title: 'Location Tag',
      type: 'string',
      initialValue: 'DUBAI, UNITED ARAB EMIRATES',
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      initialValue: 'Available Worldwide',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      initialValue: 'Asia/Dubai',
    }),

    // Hero Section Settings
    defineField({
      name: 'heroMediaType',
      title: 'Hero Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
      description: 'Choose whether to display an autoplaying background video or a static hero image.',
    }),
    defineField({
      name: 'heroVideoFile',
      title: 'Hero Video File (Upload MP4 / WebM / MOV)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video file directly to Sanity Content Lake CDN.',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video External URL',
      type: 'url',
      description: 'Or paste a direct URL to an MP4 video (e.g. Cloudinary, AWS S3, or CDN). Used if no file is uploaded above.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Homepage Hero Image (or Poster for Video)',
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
      description: 'Static image used when Media Type is Image, or as the fallback poster while Video loads.',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge / Tag',
      type: 'string',
      description: 'e.g. Abu Dhabi // Twilight GP',
    }),

    // Homepage Description (below hero)
    defineField({
      name: 'heroTagline',
      title: 'Homepage Tagline (below hero)',
      type: 'string',
      description: 'Large headline shown in the description card below the hero. e.g. "Capturing the Apex of Energy and Emotion."',
      initialValue: 'Capturing the Apex of Energy and Emotion Across the UK and Worldwide.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Homepage Description (below hero)',
      type: 'text',
      rows: 4,
      description: 'Supporting paragraph shown beneath the tagline on the homepage.',
      initialValue: "In the moments that define your event – the roar of the crowd, the first chord from the stage, the shared vision at a corporate launch – lie stories waiting to be told. I deliver high-impact photography that becomes a lasting asset for your brand.",
    }),

    // About Section
    defineField({
      name: 'aboutTag',
      title: 'About Tag',
      type: 'string',
      initialValue: '02 // Profile',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      initialValue: 'About Ajay',
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Bio Paragraphs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'aboutQuote',
      title: 'About Highlight Quote',
      type: 'string',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Page Portrait Image',
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
    }),

    // Contact Section
    defineField({
      name: 'contactHeading',
      title: 'Contact Heading',
      type: 'string',
      initialValue: 'GET IN TOUCH',
    }),
    defineField({
      name: 'contactSubheading',
      title: 'Contact Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contactImage',
      title: 'Contact Section Image',
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
    }),

    // Communications & Socials
    defineField({
      name: 'emails',
      title: 'Contact Email Addresses',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'phones',
      title: 'Contact Phone Numbers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Location Label (e.g. DUBAI, INDIA)' }),
            defineField({ name: 'number', type: 'string', title: 'Phone Number' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Network Name (e.g. INSTAGRAM)' }),
            defineField({ name: 'url', type: 'url', title: 'Profile URL' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'brand',
      subtitle: 'role',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Global Configuration',
        media,
      }
    },
  },
})
