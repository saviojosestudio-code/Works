import { defineField, defineType } from 'sanity'

export const projectVideo = defineType({
  name: 'projectVideo',
  title: 'Project Video',
  type: 'object',
  fields: [
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video clip (MP4, WebM, MOV)',
    }),
    defineField({
      name: 'videoUrl',
      title: 'External Video URL',
      type: 'url',
      description: 'Or paste an external MP4, WebM, or streaming video URL',
    }),
    defineField({
      name: 'poster',
      title: 'Video Poster / Cover Still',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Still frame image displayed before video playback or while loading',
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text / Description',
      type: 'string',
      description: 'Description for accessibility and SEO',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Clip Name',
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
      subtitle: 'alt',
      media: 'poster',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Project Video',
        subtitle: subtitle || 'Editorial Video Clip',
        media,
      }
    },
  },
})
