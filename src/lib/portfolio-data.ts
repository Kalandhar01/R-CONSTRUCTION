export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  location: string;
  description: string;
  category: string;
  coverImage: string;
  galleryImages: string[];
}

const projects: PortfolioProject[] = [
  {
    id: "sri-lakshmi-residence",
    title: "Sri Lakshmi Residence",
    slug: "sri-lakshmi-residence",
    location: "Coimbatore, Tamil Nadu",
    description: "Premium residential construction featuring contemporary architecture, durable materials, and high-quality exterior finishes.",
    category: "Premium Villa",
    coverImage: "/images/our-works/exterior/1.webp",
    galleryImages: ["/images/our-works/exterior/1.webp"],
  },
  {
    id: "anand-villa",
    title: "Anand Villa",
    slug: "anand-villa",
    location: "Madurai, Tamil Nadu",
    description: "Luxury villa with modern facade design, spacious layouts, and premium landscape integration for elegant living.",
    category: "Luxury Residence",
    coverImage: "/images/our-works/exterior/2.webp",
    galleryImages: ["/images/our-works/exterior/2.webp"],
  },
  {
    id: "green-meadows-residence",
    title: "Green Meadows Residence",
    slug: "green-meadows-residence",
    location: "Salem, Tamil Nadu",
    description: "Eco-friendly residential project surrounded by lush greenery with sustainable construction and modern amenities.",
    category: "Garden Estate",
    coverImage: "/images/our-works/exterior/3.webp",
    galleryImages: ["/images/our-works/exterior/3.webp"],
  },
  {
    id: "sai-elite-residence",
    title: "Sai Elite Residence",
    slug: "sai-elite-residence",
    location: "Chennai, Tamil Nadu",
    description: "Contemporary urban residence with sleek architectural lines, premium finishes, and smart home integration.",
    category: "Elite Villa",
    coverImage: "/images/our-works/exterior/4.webp",
    galleryImages: ["/images/our-works/exterior/4.webp"],
  },
  {
    id: "skm-residency",
    title: "SKM Residency",
    slug: "skm-residency",
    location: "Tiruppur, Tamil Nadu",
    description: "Premium residential development with thoughtfully designed spaces, quality construction, and modern infrastructure.",
    category: "Premium Villa",
    coverImage: "/images/our-works/exterior/5.webp",
    galleryImages: ["/images/our-works/exterior/5.webp"],
  },
  {
    id: "royal-avenue-villa",
    title: "Royal Avenue Villa",
    slug: "royal-avenue-villa",
    location: "Erode, Tamil Nadu",
    description: "Grand villa with majestic facade, spacious interiors, and meticulous attention to architectural detailing.",
    category: "Luxury Residence",
    coverImage: "/images/our-works/exterior/6.webp",
    galleryImages: ["/images/our-works/exterior/6.webp"],
  },
  {
    id: "elite-garden-house",
    title: "Elite Garden House",
    slug: "elite-garden-house",
    location: "Trichy, Tamil Nadu",
    description: "Beautiful garden residence blending indoor-outdoor living with landscaped courtyards and premium construction.",
    category: "Garden Estate",
    coverImage: "/images/our-works/exterior/7.webp",
    galleryImages: ["/images/our-works/exterior/7.webp"],
  },
  {
    id: "vasantham-residence",
    title: "Vasantham Residence",
    slug: "vasantham-residence",
    location: "Pollachi, Tamil Nadu",
    description: "Elegant residential project with traditional charm and modern comforts, crafted with superior materials.",
    category: "Elite Villa",
    coverImage: "/images/our-works/exterior/8.webp",
    galleryImages: ["/images/our-works/exterior/8.webp"],
  },
  {
    id: "palm-grove-villa",
    title: "Palm Grove Villa",
    slug: "palm-grove-villa",
    location: "Karur, Tamil Nadu",
    description: "Tropical-inspired villa with open layouts, natural ventilation, and premium exterior finishes throughout.",
    category: "Premium Villa",
    coverImage: "/images/our-works/exterior/9.webp",
    galleryImages: ["/images/our-works/exterior/9.webp"],
  },
  {
    id: "river-view-residence",
    title: "River View Residence",
    slug: "river-view-residence",
    location: "Thanjavur, Tamil Nadu",
    description: "Scenic riverfront residence offering panoramic views, contemporary design, and unparalleled construction quality.",
    category: "Luxury Residence",
    coverImage: "/images/our-works/exterior/10.webp",
    galleryImages: ["/images/our-works/exterior/10.webp"],
  },
  {
    id: "nila-garden-estate",
    title: "Nila Garden Estate",
    slug: "nila-garden-estate",
    location: "Tirunelveli, Tamil Nadu",
    description: "Expansive garden estate with premium landscaping, modern villas, and resort-style community amenities.",
    category: "Garden Estate",
    coverImage: "/images/our-works/exterior/11.webp",
    galleryImages: ["/images/our-works/exterior/11.webp"],
  },
  {
    id: "sengupta-luxury-villa",
    title: "Sengupta Luxury Villa",
    slug: "sengupta-luxury-villa",
    location: "Vellore, Tamil Nadu",
    description: "Opulent luxury villa with grand architecture, high-end specifications, and exquisite exterior craftsmanship.",
    category: "Elite Villa",
    coverImage: "/images/our-works/exterior/12.webp",
    galleryImages: ["/images/our-works/exterior/12.webp"],
  },
];

export function getAllProjects(): PortfolioProject[] {
  return projects;
}

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getRelatedProjects(slug: string, count = 3): PortfolioProject[] {
  return projects.filter((p) => p.slug !== slug).slice(0, count);
}
