const mongoose = require("mongoose");

const projects = [
  { id: "sri-lakshmi-residence", title: "Sri Lakshmi Residence", slug: "sri-lakshmi-residence", location: "Coimbatore, Tamil Nadu", description: "Premium residential construction featuring contemporary architecture, durable materials, and high-quality exterior finishes.", shortDescription: "Premium residential construction in Coimbatore", category: "Premium Villa", coverImage: "/images/our-works/exterior/1.webp", galleryImages: ["/images/our-works/exterior/1.webp"] },
  { id: "anand-villa", title: "Anand Villa", slug: "anand-villa", location: "Madurai, Tamil Nadu", description: "Luxury villa with modern facade design, spacious layouts, and premium landscape integration for elegant living.", shortDescription: "Luxury villa in Madurai", category: "Luxury Residence", coverImage: "/images/our-works/exterior/2.webp", galleryImages: ["/images/our-works/exterior/2.webp"] },
  { id: "green-meadows-residence", title: "Green Meadows Residence", slug: "green-meadows-residence", location: "Salem, Tamil Nadu", description: "Eco-friendly residential project surrounded by lush greenery with sustainable construction and modern amenities.", shortDescription: "Eco-friendly residence in Salem", category: "Garden Estate", coverImage: "/images/our-works/exterior/3.webp", galleryImages: ["/images/our-works/exterior/3.webp"] },
  { id: "sai-elite-residence", title: "Sai Elite Residence", slug: "sai-elite-residence", location: "Chennai, Tamil Nadu", description: "Contemporary urban residence with sleek architectural lines, premium finishes, and smart home integration.", shortDescription: "Contemporary residence in Chennai", category: "Elite Villa", coverImage: "/images/our-works/exterior/4.webp", galleryImages: ["/images/our-works/exterior/4.webp"] },
  { id: "skm-residency", title: "SKM Residency", slug: "skm-residency", location: "Tiruppur, Tamil Nadu", description: "Premium residential development with thoughtfully designed spaces, quality construction, and modern infrastructure.", shortDescription: "Premium development in Tiruppur", category: "Premium Villa", coverImage: "/images/our-works/exterior/5.webp", galleryImages: ["/images/our-works/exterior/5.webp"] },
  { id: "royal-avenue-villa", title: "Royal Avenue Villa", slug: "royal-avenue-villa", location: "Erode, Tamil Nadu", description: "Grand villa with majestic facade, spacious interiors, and meticulous attention to architectural detailing.", shortDescription: "Grand villa in Erode", category: "Luxury Residence", coverImage: "/images/our-works/exterior/6.webp", galleryImages: ["/images/our-works/exterior/6.webp"] },
  { id: "elite-garden-house", title: "Elite Garden House", slug: "elite-garden-house", location: "Trichy, Tamil Nadu", description: "Beautiful garden residence blending indoor-outdoor living with landscaped courtyards and premium construction.", shortDescription: "Garden residence in Trichy", category: "Garden Estate", coverImage: "/images/our-works/exterior/7.webp", galleryImages: ["/images/our-works/exterior/7.webp"] },
  { id: "vasantham-residence", title: "Vasantham Residence", slug: "vasantham-residence", location: "Pollachi, Tamil Nadu", description: "Elegant residential project with traditional charm and modern comforts, crafted with superior materials.", shortDescription: "Elegant residence in Pollachi", category: "Elite Villa", coverImage: "/images/our-works/exterior/8.webp", galleryImages: ["/images/our-works/exterior/8.webp"] },
  { id: "palm-grove-villa", title: "Palm Grove Villa", slug: "palm-grove-villa", location: "Karur, Tamil Nadu", description: "Tropical-inspired villa with open layouts, natural ventilation, and premium exterior finishes throughout.", shortDescription: "Tropical villa in Karur", category: "Premium Villa", coverImage: "/images/our-works/exterior/9.webp", galleryImages: ["/images/our-works/exterior/9.webp"] },
  { id: "river-view-residence", title: "River View Residence", slug: "river-view-residence", location: "Thanjavur, Tamil Nadu", description: "Scenic riverfront residence offering panoramic views, contemporary design, and unparalleled construction quality.", shortDescription: "Riverfront residence in Thanjavur", category: "Luxury Residence", coverImage: "/images/our-works/exterior/10.webp", galleryImages: ["/images/our-works/exterior/10.webp"] },
  { id: "nila-garden-estate", title: "Nila Garden Estate", slug: "nila-garden-estate", location: "Tirunelveli, Tamil Nadu", description: "Expansive garden estate with premium landscaping, modern villas, and resort-style community amenities.", shortDescription: "Garden estate in Tirunelveli", category: "Garden Estate", coverImage: "/images/our-works/exterior/11.webp", galleryImages: ["/images/our-works/exterior/11.webp"] },
  { id: "sengupta-luxury-villa", title: "Sengupta Luxury Villa", slug: "sengupta-luxury-villa", location: "Vellore, Tamil Nadu", description: "Opulent luxury villa with grand architecture, high-end specifications, and exquisite exterior craftsmanship.", shortDescription: "Luxury villa in Vellore", category: "Elite Villa", coverImage: "/images/our-works/exterior/12.webp", galleryImages: ["/images/our-works/exterior/12.webp"] },
];

const MONGODB_URI = "mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/Ractysh-Main?retryWrites=true&w=majority&appName=RactyshCluster";

async function seed() {
  const conn = await mongoose.createConnection(MONGODB_URI).asPromise();
  const db = conn.db;
  const collection = db.collection("portfolioprojects");

  let seeded = 0;
  for (const p of projects) {
    const exists = await collection.findOne({ slug: p.slug });
    if (exists) {
      console.log(`  SKIP: ${p.title} — already exists`);
      continue;
    }

    await collection.insertOne({
      title: p.title,
      slug: p.slug,
      division: "Construction",
      shortDescription: p.shortDescription || p.description.slice(0, 100),
      description: p.description,
      location: p.location,
      status: "Completed",
      coverImage: p.coverImage,
      galleryImages: p.galleryImages,
      featured: false,
      published: true,
      displayOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`  SEEDED: ${p.title} (${p.category})`);
    seeded++;
  }

  console.log(`\nDone! ${seeded} projects seeded, ${projects.length - seeded} skipped.`);
  await conn.close();
  process.exit(0);
}

seed().catch((err) => { console.error("Failed:", err); process.exit(1); });
