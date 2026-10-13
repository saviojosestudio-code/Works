import { defineField, defineType } from 'sanity'

export const projectPhoto = defineType({
  name: 'projectPhoto',
  title: 'Project Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.custom((image, context) => {
          const parent = context.parent as { videoFile?: unknown; videoUrl?: unknown } | undefined
          if (!image && !parent?.videoFile && !parent?.videoUrl) {
            return 'Image is required (unless a video is provided)'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File (Optional)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video clip if this media item is a video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'External Video URL (Optional)',
      type: 'url',
      description: 'Or paste an external MP4, WebM, or streaming video URL',
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and screen readers',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Frame Name',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location Shot',
      type: 'string',
    }),
    defineField({
      name: 'aspect',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape (16:10 / 21:9)', value: 'landscape' },
          { title: 'Portrait (3:4)', value: 'portrait' },
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
    }),
    defineField({
      name: 'category',
      title: 'Subject Tag / Category',
      type: 'string',
      options: {
        list: [
          { title: 'Track Action', value: 'track' },
          { title: 'Pit Lane & Mechanics', value: 'pitlane' },
          { title: 'Paddock & Behind The Scenes', value: 'paddock' },
          { title: 'Aero & Engineering Detail', value: 'detail' },
          { title: 'Editorial / Lifestyle', value: 'editorial' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Photo',
        subtitle: subtitle || 'Editorial Shot',
        media,
      }
    },
  },
})
