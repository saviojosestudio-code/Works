import { getCliClient } from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seed() {
  const client = getCliClient()
  console.log('--- Starting Sanity Content Lake Migration ---')

  const publicDir = path.resolve(__dirname, '../../porto-portfolio/public')
  const motorsportsDir = path.join(publicDir, 'images/motorsports')

  // Helper to upload local images
  const assetCache = new Map<string, any>()
  async function uploadImage(filePath: string, filename?: string) {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`)
      return null
    }
    if (assetCache.has(filePath)) {
      return assetCache.get(filePath)
    }
    const basename = filename || path.basename(filePath)
    console.log(`Uploading asset: ${basename}...`)
    const stream = fs.createReadStream(filePath)
    const asset = await client.assets.upload('image', stream, {
      filename: basename,
    })
    assetCache.set(filePath, asset)
    return asset
  }

  // 1. Seed Site Settings Singleton
  console.log('Seeding Site Settings singleton...')
  let heroAsset = null
  let contactAsset = null

  if (fs.existsSync(path.join(motorsportsDir, 'lan-1.jpg'))) {
    heroAsset = await uploadImage(path.join(motorsportsDir, 'lan-1.jpg'))
  }
  if (fs.existsSync(path.join(motorsportsDir, 'lan-6.jpg'))) {
    contactAsset = await uploadImage(path.join(motorsportsDir, 'lan-6.jpg'))
  }

  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    brand: 'RaphRev',
    name: 'Ajay Johnson',
    role: 'Editorial Photographer + Visual Artist',
    location: 'DUBAI, UNITED ARAB EMIRATES',
    availability: 'Available Worldwide',
    timezone: 'Asia/Dubai',
    heroTitle: 'RaphRev',
    heroBadge: 'Abu Dhabi // Twilight GP',
    ...(heroAsset && {
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroAsset._id },
        alt: 'Formula 1 race car accelerating down the main straight under circuit floodlights',
      },
    }),
    aboutTag: '02 // Profile',
    aboutTitle: 'About Ajay',
    aboutBio: [
      'Dubai-based editorial photographer and visual storyteller specializing in premier motorsport, hypercars, and high-contrast architecture across the Middle East, Europe, and Asia.',
      'Capturing speed at twilight, precision engineering, and the dramatic interplay between carbon fiber, neon, and sand.',
    ],
    aboutQuote: 'This is more than just capturing what happens. It’s about capturing what it feels like.',
    contactHeading: 'GET IN TOUCH',
    contactSubheading: "Reach out and let's create something amazing together. Let's achieve greatness.",
    ...(contactAsset && {
      contactImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: contactAsset._id },
        alt: 'GT Series endurance race cars lined up on track',
      },
    }),
    emails: ['raphrev@gmail.com', 'ajayjohnson@gmail.com'],
    phones: [
      { _key: 'phone-in', label: 'INDIA', number: '+91 794552562' },
      { _key: 'phone-uae', label: 'DUBAI', number: '+971 62310551' },
    ],
    socials: [
      { _key: 'soc-ig', name: 'INSTAGRAM', url: 'https://instagram.com' },
      { _key: 'soc-fb', name: 'FACEBOOK', url: 'https://facebook.com' },
      { _key: 'soc-tw', name: 'TWITTER', url: 'https://twitter.com' },
    ],
  }

  await client.createOrReplace(siteSettingsDoc)
  console.log('✓ Site Settings saved.')

  // 2. Pre-upload motorsports photo pool
  const photoPool: Record<string, any> = {}
  const poolFiles = ['lan-1.jpg', 'lan-2.jpg', 'lan-3.jpg', 'lan-5.jpg', 'lan-6.jpg', 'pot-1.jpg', 'pot-2.jpg', 'pot-3.jpg']
  for (const f of poolFiles) {
    const fullP = path.join(motorsportsDir, f)
    if (fs.existsSync(fullP)) {
      photoPool[f] = await uploadImage(fullP)
    }
  }

  // 3. Seed Categories
  console.log('Seeding Categories...')
  const categoriesData = [
    {
      slug: 'motorsports',
      title: 'MOTORSPORTS',
      tag: '01 // CIRCUIT & ENDURANCE',
      description: 'High-energy photography capturing speed, precision, apex limits, and the raw kinetic intensity of world-class racing.',
      order: 1,
      coverImgFile: 'lan-1.jpg',
    },
    {
      slug: 'live-events',
      title: 'LIVE EVENTS',
      tag: '02 // FESTIVALS & ARENA',
      description: 'Atmospheric performance photography documenting world-tour stadium concerts, dusk festival stages, and intimate green-room narratives.',
      order: 2,
      coverImgFile: 'lan-2.jpg',
    },
    {
      slug: 'fashion',
      title: 'FASHION',
      tag: '03 // RUNWAY & COUTURE',
      description: 'High-contrast editorial narratives that juxtapose architectural tailoring against raw, brutalist environments.',
      order: 3,
      coverImgFile: 'lan-3.jpg',
    },
    {
      slug: 'marketing',
      title: 'MARKETING',
      tag: '04 // CAMPAIGNS & COMMERCIAL',
      description: 'Strategic visual identities engineered for global automotive, athletic, and lifestyle brand rollouts.',
      order: 4,
      coverImgFile: 'lan-5.jpg',
    },
  ]

  const categoryDocMap: Record<string, any> = {}

  for (const cat of categoriesData) {
    const existing = await client.fetch('*[_type == "category" && slug.current == $slug][0]', { slug: cat.slug })
    const asset = photoPool[cat.coverImgFile] || photoPool['lan-1.jpg']

    const doc = {
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      tag: cat.tag,
      description: cat.description,
      cta: 'View Work',
      order: cat.order,
      ...(asset && {
        coverImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: cat.title,
        },
      }),
    }

    if (existing) {
      await client.patch(existing._id).set(doc).commit()
      categoryDocMap[cat.slug] = existing
      console.log(`✓ Updated category: ${cat.title}`)
    } else {
      const created = await client.create(doc)
      categoryDocMap[cat.slug] = created
      console.log(`✓ Created category: ${cat.title}`)
    }
  }

  // 4. Seed Motorsports Projects
  console.log('Seeding Projects for Motorsports...')
  const motorsportsCat = categoryDocMap['motorsports']

  if (motorsportsCat) {
    const msProjects = [
      {
        slug: '24-hours-of-le-mans',
        title: '24 Hours of Le Mans',
        tag: '01 · Endurance Racing',
        location: 'France · Endurance Racing',
        year: '2026',
        date: 'June 2026',
        client: 'FIA WEC / Endurance Series',
        description: 'Iconic 24-hour endurance racing captured through track action, pit stops, paddock moments, and night racing.',
        coverImg: 'lan-1.jpg',
        specs: {
          laps: '380+ Laps',
          turns: '38 Corners',
          duration: '24h 00m',
          elevation: 'Hunaudières Drop',
          cameraTech: 'Sony A1 · 400mm f/2.8 GM · Panning 1/30s',
        },
        order: 1,
        photos: [
          { key: 'p1', img: 'lan-1.jpg', alt: 'Hypercar flat-out down Mulsanne straight', aspect: 'landscape', tag: 'track' },
          { key: 'p2', img: 'pot-1.jpg', alt: 'Driver focus and helmet reflection in garage', aspect: 'portrait', tag: 'paddock' },
          { key: 'p3', img: 'lan-2.jpg', alt: 'Carbon brake rotors glowing cherry red', aspect: 'landscape', tag: 'detail' },
          { key: 'p4', img: 'lan-3.jpg', alt: 'Pit stop tire change high tempo execution', aspect: 'landscape', tag: 'pitlane' },
          { key: 'p5', img: 'pot-2.jpg', alt: 'Mechanic holding wheel gun ready at entrance', aspect: 'portrait', tag: 'pitlane' },
          { key: 'p6', img: 'lan-5.jpg', alt: 'Hypercar prototype aero tuning under lights', aspect: 'landscape', tag: 'detail' },
        ],
      },
      {
        slug: 'suzuka-1000km',
        title: 'Suzuka 1000km',
        tag: '02 · Super GT Championship',
        location: 'Japan · Super GT',
        year: '2026',
        date: 'August 2026',
        client: 'Super GT Championship',
        description: 'High-speed technical circuit photography focusing on the iconic figure-eight layout, Esses sequence, and intense multi-class GT racing.',
        coverImg: 'lan-2.jpg',
        specs: {
          laps: '173 Laps',
          turns: '18 Corners',
          duration: '5h 45m',
          elevation: '40m Rise to Spoon',
          cameraTech: 'Sony A1 · 600mm f/4 GM · Trackside High Speed',
        },
        order: 2,
        photos: [
          { key: 'p1', img: 'lan-2.jpg', alt: 'GT500 prototype carving through the Esses sequence', aspect: 'landscape', tag: 'track' },
          { key: 'p2', img: 'pot-2.jpg', alt: 'Team engineer scrutinizing telemetry data in pit garage', aspect: 'portrait', tag: 'paddock' },
          { key: 'p3', img: 'lan-3.jpg', alt: 'Full fuel rig refueling stop under torrential rain lights', aspect: 'landscape', tag: 'pitlane' },
          { key: 'p4', img: 'lan-5.jpg', alt: 'Front splitter carbon weave detail after race distance', aspect: 'landscape', tag: 'detail' },
        ],
      },
      {
        slug: 'dubai-24-hour',
        title: 'Dubai 24 Hour',
        tag: '03 · 24H Series',
        location: 'Dubai Autodrome · 24H Series',
        year: '2026',
        date: 'January 2026',
        client: 'Creventic / 24H Series',
        description: 'Endurance racing through desert night conditions. Glowing brake rotors, illuminated pit boxes, and sunrise over Dubai Autodrome.',
        coverImg: 'lan-3.jpg',
        specs: {
          laps: '600+ Laps',
          turns: '16 Corners',
          duration: '24h 00m',
          elevation: '12m Gradient',
          cameraTech: 'Sony A1 · 135mm f/1.8 GM · Low-Light Nocturne',
        },
        order: 3,
        photos: [
          { key: 'p1', img: 'lan-3.jpg', alt: 'Night stint brake glow slicing through darkness', aspect: 'landscape', tag: 'track' },
          { key: 'p2', img: 'pot-3.jpg', alt: 'Driver helmet inspection in paddock', aspect: 'portrait', tag: 'paddock' },
          { key: 'p3', img: 'lan-5.jpg', alt: 'Pit crew changing slicks during nocturne safety car', aspect: 'landscape', tag: 'pitlane' },
          { key: 'p4', img: 'lan-6.jpg', alt: 'Cars aligned at start finish straight', aspect: 'landscape', tag: 'track' },
        ],
      },
      {
        slug: 'kyalami-9-hour',
        title: 'Kyalami 9 Hour',
        tag: '04 · Intercontinental GT',
        location: 'South Africa · Intercontinental GT',
        year: '2026',
        date: 'November 2026',
        client: 'SRO Motorsports Group',
        description: 'Historic Kyalami Grand Prix Circuit hosting the Intercontinental GT Challenge finale under South African summer twilight.',
        coverImg: 'lan-5.jpg',
        specs: {
          laps: '280+ Laps',
          turns: '16 Corners',
          duration: '9h 00m',
          elevation: 'High Altitude 1500m',
          cameraTech: 'Sony A1 · 70-200mm f/2.8 GM II · Dusk Aperture',
        },
        order: 4,
        photos: [
          { key: 'p1', img: 'lan-5.jpg', alt: 'Kyalami Sunset into turn 1 braking point', aspect: 'landscape', tag: 'track' },
          { key: 'p2', img: 'pot-1.jpg', alt: 'Driver exhaustion after double stint', aspect: 'portrait', tag: 'paddock' },
          { key: 'p3', img: 'lan-6.jpg', alt: 'Grid celebration podium trophy ceremony', aspect: 'landscape', tag: 'track' },
        ],
      },
    ]

    for (const proj of msProjects) {
      const existing = await client.fetch('*[_type == "project" && slug.current == $slug][0]', { slug: proj.slug })
      const coverAsset = photoPool[proj.coverImg] || photoPool['lan-1.jpg']

      const galleryImages = proj.photos.map((p) => {
        const a = photoPool[p.img]
        return {
          _key: p.key,
          _type: 'projectPhoto',
          title: p.alt,
          aspect: p.aspect,
          category: p.tag,
          alt: p.alt,
          ...(a && {
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: a._id },
            },
          }),
        }
      })

      const doc = {
        _type: 'project',
        title: proj.title,
        slug: { _type: 'slug', current: proj.slug },
        category: { _type: 'reference', _ref: motorsportsCat._id },
        tag: proj.tag,
        location: proj.location,
        year: proj.year,
        date: proj.date,
        client: proj.client,
        description: proj.description,
        order: proj.order,
        featured: proj.order === 1,
        specs: proj.specs,
        images: galleryImages,
        ...(coverAsset && {
          coverImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: coverAsset._id },
            alt: proj.title,
          },
        }),
      }

      if (existing) {
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated project: ${proj.title}`)
      } else {
        await client.create(doc)
        console.log(`✓ Created project: ${proj.title}`)
      }
    }
  }

  // 5. Seed Testimonials
  console.log('Seeding Testimonials...')
  const testimonialsData = [
    {
      author: 'Marcus Albrecht',
      role: 'Team Principal, Veloce GT Racing',
      stat: '300+ km/h Paddock & Track Coverage',
      quote: 'The precision Ajay brings to trackside photography is extraordinary. Freezing high-speed braking zones and raw pit-lane adrenaline into razor-sharp editorial art is what sets him apart in the paddock.',
      order: 1,
    },
    {
      author: 'Layla Al-Rashid',
      role: 'Head of Communications, Gulf Motorsport & F1 Events',
      stat: 'Paddock to Press in < 3 Hours',
      quote: 'From qualifying shootouts to the podium under the Yas Marina floodlights, Ajay delivers world-class editorial imagery before the engine heat even dissipates. Unmatched speed and aesthetic perfection.',
      order: 2,
    },
    {
      author: 'Tomás Vega',
      role: 'Editor-in-Chief, Apex Motorsport Journal',
      stat: '14 Magazine Covers Worldwide',
      quote: 'Working with Ajay Johnson defined the visual identity of our motorsport publication for an entire season. His panning technique through night corners is nothing short of pure cinematic mastery.',
      order: 3,
    },
  ]

  for (const t of testimonialsData) {
    const existing = await client.fetch('*[_type == "testimonial" && author == $author][0]', { author: t.author })
    const doc = {
      _type: 'testimonial',
      author: t.author,
      role: t.role,
      stat: t.stat,
      quote: t.quote,
      order: t.order,
    }
    if (existing) {
      await client.patch(existing._id).set(doc).commit()
      console.log(`✓ Updated testimonial: ${t.author}`)
    } else {
      await client.create(doc)
      console.log(`✓ Created testimonial: ${t.author}`)
    }
  }

  console.log('🎉 Migration completed successfully!')
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
