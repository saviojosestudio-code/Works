import { defineField, defineType } from 'sanity'

export const projectSpecs = defineType({
  name: 'projectSpecs',
  title: 'Project Specifications',
  type: 'object',
  fields: [
    defineField({
      name: 'cameraTech',
      title: 'Camera & Optics / Tech',
      type: 'string',
      description: 'e.g. Sony A1 · 400mm f/2.8 GM · Panning 1/30s',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 24h 00m',
    }),
    defineField({
      name: 'turns',
      title: 'Turns / Corners',
      type: 'string',
      description: 'e.g. 38 Corners',
    }),
    defineField({
      name: 'elevation',
      title: 'Elevation',
      type: 'string',
      description: 'e.g. Hunaudières Drop',
    }),
    defineField({
      name: 'laps',
      title: 'Laps',
      type: 'string',
      description: 'e.g. 380+ Laps',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'string',
    }),
  ],
})
