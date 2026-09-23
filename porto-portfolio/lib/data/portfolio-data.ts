export interface MotorsportProject {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  alt: string;
  location?: string;
  details?: string;
}

export const RAPHREV_DATA = {
  profile: {
    brand: "RaphRev",
    name: "Ajay",
    fullName: "Ajay Johnson",
    role: "Editorial Photographer + Visual Artist",
    location: "Based in Dubai,",
    country: "UAE",
    fullLocation: "DUBAI, UNITED ARAB EMIRATES",
    availability: "Available All Around",
    availabilityScope: "Worldwide",
    timezone: "Asia/Dubai",
    phones: [
      { label: "INDIA", number: "+91 794552562" },
      { label: "DUBAI", number: "+971 62310551" },
    ],
    emails: ["raphrev@gmail.com", "ajayjohnson@gmail.com"],
    socials: [
      { name: "INSTAGRAM", url: "https://instagram.com" },
      { name: "FACEBOOK", url: "https://facebook.com" },
      { name: "TWITTER", url: "https://twitter.com" },
    ],
  },

  hero: {
    title: "RaphRev",
    image: "/DSC09652.jpg",
    imageAlt:
      "Formula 1 race car accelerating down the main straight under circuit floodlights",
    badge: "Abu Dhabi // Twilight GP",
  },

  about: {
    tag: "02 // Profile",
    title: "About Ajay",
    p1: "Dubai-based editorial photographer and visual storyteller specializing in premier motorsport, hypercars, and high-contrast architecture across the Middle East, Europe, and Asia.",
    p2: "Capturing speed at twilight, precision engineering, and the dramatic interplay between carbon fiber, neon, and sand.",
  },

  archive: {
    tag: "03 // Archive",
    count: "[ 04 Events ]",
    title: "Motorsport",
    projects: [
      {
        id: "01",
        tag: "01 · Grand Prix",
        title: "Yas Marina GP — Abu Dhabi",
        subtitle: "Formula 1 // Twilight Grand Prix",
        year: "2026",
        image:
          "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=90",
        alt: "Yas Marina Circuit Abu Dhabi Formula 1 twilight race",
        location: "Abu Dhabi, UAE",
        details: "Chasing apex lines under 5,000 floodlights along the Yas Marina harbor circuit.",
      },
      {
        id: "02",
        tag: "02 · Hillclimb",
        title: "Jebel Jais Hillclimb",
        subtitle: "Historic Rally // Desert Mountain",
        year: "2026",
        image:
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=90",
        alt: "Historic Porsche 911 rallying on Jebel Jais mountain pass",
        location: "Ras Al Khaimah, UAE",
        details: "Air-cooled flat-six acoustics echoing through jagged hairpin switchbacks at 1,900m elevation.",
      },
      {
        id: "03",
        tag: "03 · Endurance",
        title: "Dubai 24H Endurance",
        subtitle: "GT Series // Nocturne Sprint",
        year: "2026",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90",
        alt: "Dubai Autodrome 24H endurance GT night racing",
        location: "Dubai Autodrome",
        details: "Glowing brake rotors and searing headlamps slicing through 3:00 AM desert darkness.",
      },
      {
        id: "04",
        tag: "04 · Prototype",
        title: "Equinox Pit Lane Sprint",
        subtitle: "Hypercar Prototype // Night Shift",
        year: "2026",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=90",
        alt: "Equinox Hypercar prototype pit lane preparation at night",
        location: "Pit Garages, Nocturne",
        details: "Carbon monocoque inspection and aero tuning under focused cold tungsten lights.",
      },
    ] as MotorsportProject[],
  },

  contact: {
    tag: "",
    heading: "GET IN TOUCH",
    subheading: "Reach out and let's create something amazing together. Let's achieve greatness.",
    formTitle: "FILL THIS FORM OUT",
    image: "/DSC08714.jpg",
    imageAlt: "GT Series endurance race cars lined up on track",
  },
};
