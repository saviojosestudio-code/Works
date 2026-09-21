export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  location?: string;
  aspect?: "landscape" | "portrait";
  category?: string;
}

export interface ProjectSpecs {
  cameraTech?: string;
  duration?: string;
  turns?: string;
  elevation?: string;
  laps?: string;
  client?: string;
  role?: string;
  deliverables?: string;
  [key: string]: string | undefined;
}

export interface Project {
  slug: string;
  title: string;
  tag?: string;
  location?: string;
  date?: string;
  year?: string;
  client?: string;
  description?: string;
  coverImage: string;
  specs?: ProjectSpecs;
  images: (PhotoItem | string)[];
}

export interface Category {
  slug: string;
  title: string;
  tag?: string;
  description: string;
  coverImage: string;
  cta?: string;
  projects: Project[];
}

export const PORTFOLIO_CATEGORIES: Category[] = [
  {
    slug: "motorsports",
    title: "MOTORSPORTS",
    tag: "01 // CIRCUIT & ENDURANCE",
    description:
      "High-energy photography capturing speed, precision, apex limits, and the raw kinetic intensity of world-class racing.",
    coverImage:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=90",
    cta: "View Work",
    projects: [
      {
        slug: "24-hours-of-le-mans",
        title: "24 Hours of Le Mans",
        tag: "01 · Endurance Racing",
        location: "France · Endurance Racing",
        date: "June 2026",
        year: "2026",
        client: "FIA WEC / Endurance Series",
        description:
          "Iconic 24-hour endurance racing captured through track action, pit stops, paddock moments, and night racing.",
        coverImage:
          "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=90",
        specs: {
          laps: "380+ Laps",
          turns: "38 Corners",
          duration: "24h 00m",
          elevation: "Hunaudières Drop",
          cameraTech: "Sony A1 · 400mm f/2.8 GM · Panning 1/30s",
        },
        images: [
          {
            id: "lemans-01",
            src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=90",
            alt: "Hypercar flat-out down the Mulsanne straight at twilight",
            title: "Mulsanne Twilight Transition",
            subtitle: "340 km/h Terminal Velocity",
            location: "Circuit de la Sarthe",
            aspect: "landscape",
            category: "track",
          },
          {
            id: "lemans-02",
            src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=90",
            alt: "Driver focus and helmet reflection",
            title: "Driver Focus Before Night Stint",
            subtitle: "3:00 AM Paddock Vigil",
            location: "Garages",
            aspect: "portrait",
            category: "paddock",
          },
          {
            id: "lemans-03",
            src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90",
            alt: "Carbon brake rotors glowing cherry red into the corner",
            title: "Carbon Rotor Incandescence",
            subtitle: "Heavy Deceleration Zone",
            location: "Indianapolis Chicane",
            aspect: "landscape",
            category: "detail",
          },
        ],
      },
      {
        slug: "suzuka-1000km",
        title: "Suzuka 1000km",
        tag: "02 · GT Racing",
        location: "Japan · GT Racing",
        date: "August 2026",
        year: "2026",
        client: "Super GT Series",
        description:
          "High-speed GT racing through the legendary Suzuka circuit, focusing on cars, drivers, and track atmosphere.",
        coverImage:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=90",
        specs: {
          laps: "173 Laps",
          turns: "18 Corners (Figure 8)",
          duration: "5h 45m",
          cameraTech: "Sony A9 III · 600mm f/4 GM · S-Curves Apex",
        },
        images: [
          {
            id: "suzuka-01",
            src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=90",
            alt: "GT prototype carving through Suzuka S-curves",
            title: "Suzuka S-Curve Transition",
            subtitle: "High Lateral G Compression",
            location: "Suzuka International Circuit",
            aspect: "landscape",
            category: "track",
          },
          {
            id: "suzuka-02",
            src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=90",
            alt: "130R high speed sweep at dusk",
            title: "130R Apex at Dusk",
            subtitle: "Flat Out In 6th Gear",
            location: "Turn 15, Suzuka",
            aspect: "landscape",
            category: "track",
          },
        ],
      },
      {
        slug: "dubai-24-hour",
        title: "Dubai 24 Hour",
        tag: "03 · Endurance Racing",
        location: "UAE · Endurance Racing",
        date: "January 2026",
        year: "2026",
        client: "Creventic 24H Series",
        description:
          "Night-time endurance racing, pit-lane action, and the atmosphere of Dubai Autodrome.",
        coverImage:
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=90",
        specs: {
          turns: "16 Corners",
          duration: "24h 00m",
          cameraTech: "Sony A1 · 135mm f/1.8 GM · Night Exposure",
        },
        images: [
          {
            id: "dubai24-01",
            src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=90",
            alt: "Dubai Autodrome night race glow",
            title: "Nocturne Apex Sweeper",
            subtitle: "Cool Desert Night Flight",
            location: "Turn 1, Dubai Autodrome",
            aspect: "landscape",
            category: "track",
          },
          {
            id: "dubai24-02",
            src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=90",
            alt: "Pit crew refuelling under harsh neon illumination",
            title: "Desert Pit Fuel Rig",
            subtitle: "Rapid 40-liter dump",
            location: "Autodrome Garages",
            aspect: "portrait",
            category: "pitlane",
          },
        ],
      },
      {
        slug: "kyalami-9-hour",
        title: "Kyalami 9 Hour",
        tag: "04 · Endurance Racing",
        location: "South Africa · Endurance Racing",
        date: "December 2025",
        year: "2025",
        client: "Intercontinental GT Challenge",
        description:
          "A collection focused on GT racing, dramatic track moments, and the character of the Kyalami circuit.",
        coverImage:
          "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2000&q=90",
        specs: {
          turns: "16 Corners",
          duration: "9h 00m",
          elevation: "Highveld Altitude",
          cameraTech: "Canon R3 · 70-200mm f/2.8L IS · Sunset Stint",
        },
        images: [
          {
            id: "kyalami-01",
            src: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=90",
            alt: "Kyalami sunset over Highveld circuit",
            title: "Highveld Sunset Apex",
            subtitle: "Sunset Gold Over Pit Straight",
            location: "Kyalami Grand Prix Circuit",
            aspect: "landscape",
            category: "track",
          },
        ],
      },
      {
        slug: "24-hours-of-nurburgring",
        title: "24 Hours of Nürburgring",
        tag: "05 · Endurance Racing",
        location: "Germany · Endurance Racing",
        date: "May 2026",
        year: "2026",
        client: "ADAC RAVENOL 24h Nürburgring",
        description:
          "High-intensity racing across the legendary Nürburgring Nordschleife.",
        coverImage:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90",
        specs: {
          laps: "150+ Laps",
          turns: "170 Corners (Green Hell)",
          elevation: "300m Elevation Delta",
          cameraTech: "Leica SL2-S · 24-90mm Vario-Elmarit",
        },
        images: [
          {
            id: "nurburgring-01",
            src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90",
            alt: "Car airborne over Pflanzgarten crest",
            title: "Karussell & Pflanzgarten",
            subtitle: "Airborne Over The Crest",
            location: "Nürburgring Nordschleife",
            aspect: "landscape",
            category: "track",
          },
        ],
      },
      {
        slug: "24-hours-of-spa",
        title: "24 Hours of Spa",
        tag: "06 · GT Endurance",
        location: "Belgium · GT Endurance",
        date: "July 2026",
        year: "2026",
        client: "CrowdStrike 24 Hours of Spa",
        description:
          "GT3 racing, pit-lane moments, night action, and the atmosphere of Spa-Francorchamps.",
        coverImage:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=90",
        specs: {
          turns: "19 Corners",
          elevation: "102m Gradient",
          duration: "24h 00m",
          cameraTech: "Canon R3 · 70-200mm f/2.8 IS III · Wet Paddock",
        },
        images: [
          {
            id: "spa-01",
            src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=90",
            alt: "GT3 racecar climbing Eau Rouge in damp mist",
            title: "The Eau Rouge Compression",
            subtitle: "Full Throttle Blind Crest",
            location: "Raidillon / Eau Rouge",
            aspect: "landscape",
            category: "track",
          },
        ],
      },
    ],
  },
  {
    slug: "live-events",
    title: "LIVE EVENTS",
    tag: "02 // FESTIVALS & PRODUCTIONS",
    description:
      "Capturing the atmosphere, energy, VIP moments, and spatial drama of major music festivals, summits, and live entertainment.",
    coverImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=2000&q=90",
    cta: "View Work",
    projects: [
      {
        slug: "soundstorm",
        title: "Soundstorm",
        tag: "01 · Music Festival",
        location: "Riyadh · Music Festival",
        date: "December 2025",
        year: "2025",
        client: "MDLBEAST",
        description:
          "Large-scale festival photography capturing performers, crowds, lights, and backstage moments.",
        coverImage:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "MDLBEAST Soundstorm",
          role: "Mainstage Stills & Nocturne Feature",
          cameraTech: "Sony A1 · 16-35mm f/2.8 GM & 70-200mm f/2.8 GM",
        },
        images: [
          {
            id: "soundstorm-01",
            src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=90",
            alt: "Mainstage festival laser arrays in the desert night",
            title: "Big Beast Stage Volumetrics",
            subtitle: "400 kW Laser Array Over 50,000 Fans",
            location: "Banban, Riyadh",
            aspect: "landscape",
            category: "stage",
          },
        ],
      },
      {
        slug: "dubai-jazz-festival",
        title: "Dubai Jazz Festival",
        tag: "02 · Music Festival",
        location: "Dubai · Music Festival",
        date: "February 2026",
        year: "2026",
        client: "Dubai Media City Amphitheatre",
        description:
          "Live performances, artists, audience reactions, and atmospheric stage photography.",
        coverImage:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Dubai Jazz Fest",
          role: "Lead Stage Photographer",
          cameraTech: "Sony A7R V · 85mm f/1.4 GM · Acoustic Spotlight",
        },
        images: [
          {
            id: "jazz-01",
            src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=90",
            alt: "Trumpeter and saxophonist performing under warm spotlight",
            title: "Brass & Blue Spotlight",
            subtitle: "Headline Stint Encore",
            location: "Dubai Media City Amphitheatre",
            aspect: "landscape",
            category: "performance",
          },
        ],
      },
      {
        slug: "formula-1-fan-festival",
        title: "Formula 1 Fan Festival",
        tag: "03 · Live Event",
        location: "Abu Dhabi · Live Event",
        date: "November 2025",
        year: "2025",
        client: "Formula 1 / Yas Marina",
        description:
          "Fan experiences, performances, activities, and the energy surrounding a major motorsport event.",
        coverImage:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Ethara / Formula 1",
          role: "Fan Zone & Concert Stills",
          cameraTech: "Canon R5 · 24-70mm f/2.8L · Day & Dusk",
        },
        images: [
          {
            id: "f1fan-01",
            src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=90",
            alt: "Fan festival crowd celebration at sunset",
            title: "Fan Zone Euphoria",
            subtitle: "Post-Qualifying Festival Celebration",
            location: "Yas Island, Abu Dhabi",
            aspect: "landscape",
            category: "atmosphere",
          },
        ],
      },
      {
        slug: "dubai-opera-nights",
        title: "Dubai Opera Nights",
        tag: "04 · Performance",
        location: "Dubai · Performance",
        date: "October 2025",
        year: "2025",
        client: "Dubai Opera",
        description:
          "Artists, performers, stage design, and intimate moments from live performances.",
        coverImage:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Dubai Opera",
          role: "Performance Stills",
          cameraTech: "Leica M11 · 50mm Noctilux · Low Light",
        },
        images: [
          {
            id: "opera-01",
            src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=90",
            alt: "Ballet and symphonic performance on illuminated stage",
            title: "Grand Hall Proscenium",
            subtitle: "Act II Grand Ensemble",
            location: "Dubai Opera Grand Hall",
            aspect: "landscape",
            category: "performance",
          },
        ],
      },
      {
        slug: "art-dubai",
        title: "Art Dubai",
        tag: "05 · Cultural Event",
        location: "Dubai · Cultural Event",
        date: "March 2026",
        year: "2026",
        client: "Art Dubai Fair",
        description:
          "Contemporary art, installations, visitors, and the visual atmosphere of the event.",
        coverImage:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Art Dubai",
          role: "Fair & Installation Documentation",
          cameraTech: "Hasselblad X2D · 38mm f/2.5",
        },
        images: [
          {
            id: "artdubai-01",
            src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=90",
            alt: "Visitors engaging with monumental contemporary sculpture",
            title: "Sculptural Interactions",
            subtitle: "Gallery Pavilion Hall 3",
            location: "Madinat Jumeirah",
            aspect: "landscape",
            category: "exhibition",
          },
        ],
      },
      {
        slug: "red-carpet-premiere",
        title: "Red Carpet Premiere",
        tag: "06 · Entertainment",
        location: "Dubai · Entertainment",
        date: "December 2025",
        year: "2025",
        client: "Regional Film Gala",
        description:
          "Celebrity arrivals, portraits, media moments, and event atmosphere.",
        coverImage:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Dubai International Cinema Gala",
          role: "Red Carpet Arrivals & Media Wall",
          cameraTech: "Sony A1 · 24-70mm f/2.8 GM II · Profoto Flash",
        },
        images: [
          {
            id: "premiere-01",
            src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90",
            alt: "Flashbulbs popping as guests arrive on the red carpet",
            title: "Photocall Flash Array",
            subtitle: "Main Arrivals Step-and-Repeat",
            location: "Armani Pavilion",
            aspect: "landscape",
            category: "redcarpet",
          },
        ],
      },
    ],
  },
  {
    slug: "fashion",
    title: "FASHION",
    tag: "03 // EDITORIAL & RUNWAY",
    description:
      "Editorial, runway, and lifestyle storytelling focused on avant-garde tailoring, identity, couture styling, and metropolitan silhouettes.",
    coverImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=90",
    cta: "View Work",
    projects: [
      {
        slug: "dubai-fashion-week",
        title: "Dubai Fashion Week",
        tag: "01 · Fashion Week",
        location: "Dubai · Fashion Week",
        date: "February 2026",
        year: "2026",
        client: "Arab Fashion Council",
        description:
          "Runway photography, designers, models, backstage preparation, and street-style moments.",
        coverImage:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Dubai Fashion Week / d3",
          role: "Runway & Backstage Editorial",
          cameraTech: "Sony A7R V · 85mm f/1.4 GM · Fast Sync",
        },
        images: [
          {
            id: "dfw-01",
            src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=90",
            alt: "Couture runway model in dramatic lighting",
            title: "Runway Spotlight Silhouette",
            subtitle: "Haute Couture Presentation",
            location: "d3 Main Pavilion",
            aspect: "portrait",
            category: "runway",
          },
        ],
      },
      {
        slug: "editorial-after-dark",
        title: "Editorial — After Dark",
        tag: "02 · Editorial",
        location: "Dubai · Editorial",
        date: "January 2026",
        year: "2026",
        client: "Vogue Arabia / Feature",
        description:
          "A cinematic fashion editorial focused on dramatic lighting, styling, and architectural locations.",
        coverImage:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Editorial Magazine",
          role: "Creative Direction & Photography",
          cameraTech: "Leica M11 · 35mm Summicron-M ASPH",
        },
        images: [
          {
            id: "afterdark-01",
            src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=90",
            alt: "Monochrome fashion model on urban stone steps",
            title: "Geometric Sun & Shadow",
            subtitle: "Modernist Tailoring",
            location: "DIFC Promenade",
            aspect: "portrait",
            category: "editorial",
          },
        ],
      },
      {
        slug: "desert-collection",
        title: "Desert Collection",
        tag: "03 · Campaign",
        location: "UAE · Campaign",
        date: "November 2025",
        year: "2025",
        client: "Nomad Atelier",
        description:
          "A fashion campaign combining contemporary styling with the landscape of the UAE.",
        coverImage:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Nomad Atelier",
          role: "Campaign Visuals",
          cameraTech: "Phase One IQ4 · 80mm Schneider Kreuznach",
        },
        images: [
          {
            id: "desert-01",
            src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=90",
            alt: "Fluid silk silhouettes drifting in golden dune breezes",
            title: "Golden Dune Draping",
            subtitle: "Sunset in Al Madam Dunes",
            location: "Sharjah Desert",
            aspect: "portrait",
            category: "campaign",
          },
        ],
      },
      {
        slug: "urban-form",
        title: "Urban Form",
        tag: "04 · Street Fashion",
        location: "Dubai · Street Fashion",
        date: "October 2025",
        year: "2025",
        client: "Kuro Technical Streetwear",
        description:
          "Modern streetwear photographed through architecture, movement, and urban environments.",
        coverImage:
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Kuro Studio",
          role: "Lookbook Photography",
          cameraTech: "Contax G2 · 35mm Planar · Portra 400",
        },
        images: [
          {
            id: "urban-01",
            src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90",
            alt: "Streetwear styling against concrete overpasses",
            title: "Monochrome Concrete Stride",
            subtitle: "City Motion Series",
            location: "Business Bay, Dubai",
            aspect: "portrait",
            category: "street",
          },
        ],
      },
      {
        slug: "noir-collection",
        title: "Noir Collection",
        tag: "05 · Lookbook",
        location: "Dubai · Lookbook",
        date: "September 2025",
        year: "2025",
        client: "Atelier Noir",
        description:
          "Minimal studio portraits and detailed product-focused fashion imagery.",
        coverImage:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Atelier Noir",
          role: "Lookbook & E-commerce Stills",
          cameraTech: "Hasselblad H6D · 100mm Macro",
        },
        images: [
          {
            id: "noir-01",
            src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=90",
            alt: "High-contrast monochrome studio fashion portrait",
            title: "Deep Shadow Portraiture",
            subtitle: "Studio Minimalist Stance",
            location: "Studio 11, Alserkal",
            aspect: "portrait",
            category: "lookbook",
          },
        ],
      },
      {
        slug: "new-season-campaign",
        title: "New Season Campaign",
        tag: "06 · Brand Campaign",
        location: "Dubai · Brand Campaign",
        date: "August 2025",
        year: "2025",
        client: "Aura Luxury Ready-to-Wear",
        description:
          "Commercial fashion photography created for a seasonal brand launch.",
        coverImage:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Aura Ready-to-Wear",
          role: "Global Campaign Stills",
          cameraTech: "Sony A1 · 50mm f/1.2 GM · High Key",
        },
        images: [
          {
            id: "newseason-01",
            src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90",
            alt: "Tailored suit against architectural glass facade",
            title: "Spring Summer Horizon",
            subtitle: "Key Visual 01",
            location: "One Za'abeel",
            aspect: "portrait",
            category: "campaign",
          },
        ],
      },
    ],
  },
  {
    slug: "marketing",
    title: "MARKETING",
    tag: "04 // COMMERCIAL & CAMPAIGNS",
    description:
      "Purpose-driven visual campaigns created for automotive manufacturers, luxury horology brands, and global product launches.",
    coverImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=90",
    cta: "View Work",
    projects: [
      {
        slug: "mercedes-benz-performance",
        title: "Mercedes-Benz — Performance",
        tag: "01 · Automotive Campaign",
        location: "Dubai · Automotive Campaign",
        date: "March 2026",
        year: "2026",
        client: "Mercedes-AMG Middle East",
        description:
          "Premium automotive imagery focused on vehicle design, performance, and cinematic locations.",
        coverImage:
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Mercedes-AMG",
          role: "Lead Photographer",
          cameraTech: "Sony A1 · 70-200mm f/2.8 GM II · Tracking Car Rig",
        },
        images: [
          {
            id: "mb-01",
            src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=90",
            alt: "Performance coupe cornering under streetlights",
            title: "AMG Aero Dynamics",
            subtitle: "Jebel Jais Pass at Dawn",
            location: "Ras Al Khaimah",
            aspect: "landscape",
            category: "commercial",
          },
        ],
      },
      {
        slug: "apex-motors-launch-campaign",
        title: "Apex Motors — Launch Campaign",
        tag: "02 · Product Campaign",
        location: "Dubai · Product Campaign",
        date: "February 2026",
        year: "2026",
        client: "Apex Electric Hypercars",
        description:
          "A complete visual campaign created around a new vehicle launch.",
        coverImage:
          "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Apex Motors",
          role: "Global Unveil Visuals",
          cameraTech: "RED V-Raptor & Hasselblad H6D-100c",
        },
        images: [
          {
            id: "apex-01",
            src: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=90",
            alt: "Hypercar silhouette under dark studio lighting",
            title: "Apex Monocoque Silhouette",
            subtitle: "Global Launch Visual 01",
            location: "Studio Apex, Dubai",
            aspect: "landscape",
            category: "commercial",
          },
        ],
      },
      {
        slug: "nike-city-motion",
        title: "Nike — City Motion",
        tag: "03 · Brand Campaign",
        location: "Dubai · Brand Campaign",
        date: "January 2026",
        year: "2026",
        client: "Nike Middle East",
        description:
          "Dynamic lifestyle photography combining athletes, movement, and urban environments.",
        coverImage:
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Nike Running",
          role: "Urban Motion Photography",
          cameraTech: "Sony A9 III · 24-70mm f/2.8 GM II · 120fps Stills",
        },
        images: [
          {
            id: "nike-01",
            src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=90",
            alt: "Runner in motion through illuminated Dubai Canal bridges",
            title: "Canal Night Sprint",
            subtitle: "Alphafly 3 Field Test",
            location: "Dubai Water Canal",
            aspect: "landscape",
            category: "action",
          },
        ],
      },
      {
        slug: "luma-product-launch",
        title: "Luma — Product Launch",
        tag: "04 · Commercial",
        location: "Dubai · Commercial",
        date: "December 2025",
        year: "2025",
        client: "Luma Optics & Lighting",
        description:
          "Clean product photography and campaign imagery created for a new product release.",
        coverImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Luma Design Labs",
          role: "Product Photography",
          cameraTech: "Sony A1 · 90mm f/2.8 Macro G OSS",
        },
        images: [
          {
            id: "luma-01",
            src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=90",
            alt: "Minimal precision product hardware in clean studio light",
            title: "Titanium Chassis Precision",
            subtitle: "Industrial Design Stills",
            location: "Luma Studio",
            aspect: "landscape",
            category: "product",
          },
        ],
      },
      {
        slug: "nova-brand-identity",
        title: "NOVA — Brand Identity",
        tag: "05 · Commercial Campaign",
        location: "Dubai · Commercial Campaign",
        date: "November 2025",
        year: "2025",
        client: "NOVA Space Technology",
        description:
          "Visual storytelling focused on brand identity, people, products, and environments.",
        coverImage:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "NOVA Group",
          role: "Corporate Brand Identity Imagery",
          cameraTech: "Canon R5 · 50mm f/1.2L · Ambient Architectural",
        },
        images: [
          {
            id: "nova-01",
            src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=90",
            alt: "Engineers and designers collaborating around luminous model",
            title: "Future Systems Lab",
            subtitle: "Design Headquarters",
            location: "DIFC Innovation Hub",
            aspect: "landscape",
            category: "commercial",
          },
        ],
      },
      {
        slug: "gulf-motors-social-campaign",
        title: "Gulf Motors — Social Campaign",
        tag: "06 · Social Media Campaign",
        location: "Dubai · Social Media Campaign",
        date: "October 2025",
        year: "2025",
        client: "Gulf Motors Digital",
        description:
          "Short-form commercial photography created for digital and social media campaigns.",
        coverImage:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90",
        specs: {
          client: "Gulf Motors",
          role: "Social Media Campaign Visuals",
          cameraTech: "Sony A7R V · 35mm f/1.4 GM",
        },
        images: [
          {
            id: "gulf-01",
            src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90",
            alt: "Automotive detail and twilight city reflections",
            title: "City Light Reflections",
            subtitle: "Digital Social Drop 02",
            location: "Downtown Boulevard",
            aspect: "landscape",
            category: "social",
          },
        ],
      },
    ],
  },
];

// Helper functions for dynamic querying
export function getAllCategories(): Category[] {
  return PORTFOLIO_CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const normalized = slug.toLowerCase().trim();
  // Support aliases
  if (normalized === "motorsport" || normalized === "motorsports") {
    return PORTFOLIO_CATEGORIES.find(
      (cat) => cat.slug === "motorsports" || cat.slug === "motorsport"
    );
  }
  if (
    normalized === "live-events" ||
    normalized === "events" ||
    normalized === "live-event"
  ) {
    return PORTFOLIO_CATEGORIES.find(
      (cat) => cat.slug === "live-events" || cat.slug === "events"
    );
  }
  return PORTFOLIO_CATEGORIES.find((cat) => cat.slug.toLowerCase() === normalized);
}

// Returns the photography categories displayed in the 3-panel editorial view on /work
export function getWorkEditorialCategories(): Category[] {
  const targetSlugs = ["motorsports", "live-events", "fashion"];
  const matched = targetSlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((cat): cat is Category => Boolean(cat));
  return matched.length >= 3 ? matched : PORTFOLIO_CATEGORIES.slice(0, 3);
}

export function getProject(
  categorySlug: string,
  projectSlug: string
): {
  category: Category;
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
} | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  const normalizedProjectSlug = projectSlug.toLowerCase().trim();
  const projectIndex = category.projects.findIndex(
    (p) => p.slug.toLowerCase() === normalizedProjectSlug
  );

  if (projectIndex === -1) return undefined;

  const project = category.projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? category.projects[projectIndex - 1] : undefined;
  const nextProject =
    projectIndex < category.projects.length - 1
      ? category.projects[projectIndex + 1]
      : undefined;

  return {
    category,
    project,
    prevProject,
    nextProject,
  };
}

export function getAllCategorySlugs(): string[] {
  // Return canonical and alias slugs for static generation
  return [
    "motorsports",
    "motorsport",
    "live-events",
    "events",
    "fashion",
    "marketing",
  ];
}

export function getAllProjectPaths(): { category: string; project: string }[] {
  const paths: { category: string; project: string }[] = [];
  for (const cat of PORTFOLIO_CATEGORIES) {
    for (const proj of cat.projects) {
      paths.push({ category: cat.slug, project: proj.slug });
      // Add alias paths for motorsports / live-events
      if (cat.slug === "motorsports") {
        paths.push({ category: "motorsport", project: proj.slug });
      }
      if (cat.slug === "live-events") {
        paths.push({ category: "events", project: proj.slug });
      }
    }
  }
  return paths;
}

// Helper to normalize photos so components can handle either string URL or PhotoItem
export function normalizePhotoItem(
  item: PhotoItem | string,
  index: number,
  fallbackTitle?: string
): PhotoItem {
  if (typeof item === "string") {
    return {
      id: `photo-${index}`,
      src: item,
      alt: fallbackTitle ? `${fallbackTitle} frame ${index + 1}` : `Photograph ${index + 1}`,
      title: fallbackTitle ? `${fallbackTitle} // ${index + 1}` : undefined,
      aspect: "landscape",
    };
  }
  return item;
}
