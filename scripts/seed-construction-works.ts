import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(import.meta.dirname, "../.env") });

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is required");
  process.exit(1);
}

const projectSchema = new mongoose.Schema({
  division: String,
  slug: { type: String, unique: true },
  title: String,
  category: String,
  subcategory: String,
  location: String,
  summary: String,
  description: String,
  year: String,
  status: String,
  clientName: String,
  coverImage: String,
  imageUrl: String,
  galleryImages: [String],
  featured: Boolean,
  position: { type: Number, default: 0 },
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

function exteriorProject(fileName: string, title: string, slug: string, pos: number) {
  const ext = fileName.endsWith(".jpg") ? ".jpg" : ".webp";
  const fullPath = `/images/our-work/Exterior/${fileName}`;
  return {
    division: "construction",
    title,
    slug: `exterior-${slug}`,
    category: "Exterior Design",
    subcategory: "Architectural Exterior",
    location: "Coimbatore, Tamil Nadu",
    summary: `${title} — exterior design project showcasing architectural detailing and premium finishes.`,
    description: `A detailed exterior design project featuring thoughtful architectural composition, material selection, and precision craftsmanship. The design emphasizes clean lines, harmonious proportions, and durable finishes that enhance the built environment.`,
    year: "2025",
    status: "completed",
    imageUrl: fullPath,
    coverImage: fullPath,
    galleryImages: [fullPath],
    featured: pos <= 4,
    position: pos,
  };
}

const raguDuraiProject = {
  division: "construction",
  title: "Ragu Durai Residence Exterior",
  slug: "ragu-durai-residence-exterior",
  category: "Exterior Design",
  subcategory: "Residential Exterior",
  location: "Coimbatore, Tamil Nadu",
  summary: "Complete exterior design for Ragu Durai residence featuring elegant facade styling, material detailing, and refined architectural composition.",
  description: "A comprehensive exterior design project for the Ragu Durai residence, showcasing refined architectural composition with premium material selection. The design integrates elegant facade styling, coordinated color schemes, and detailed craftsmanship to create a distinguished residential exterior that balances aesthetics with functional durability.",
  year: "2025",
  status: "completed",
  coverImage: "/images/our-work/Ragu Durai Residence Exteriror/Mr.Raghu Res - Ele.jpg",
  imageUrl: "/images/our-work/Ragu Durai Residence Exteriror/Mr.Raghu Res - Ele.jpg",
  galleryImages: [
    "/images/our-work/Ragu Durai Residence Exteriror/Mr.Raghu Res - Ele.jpg",
    "/images/our-work/Ragu Durai Residence Exteriror/Mr.Raghu Res - Ele 2_2 - Photo.jpg",
    "/images/our-work/Ragu Durai Residence Exteriror/Mr.Raghu Res - Ele 2_4 - Photo.jpg",
  ],
  featured: true,
  position: 2,
};

const projects = [
  raguDuraiProject,
  {
    division: "construction",
    title: "Premium Residential Development",
    slug: "premium-residential-development",
    category: "Construction",
    subcategory: "Residential Construction",
    location: "Coimbatore, Tamil Nadu",
    summary: "A premium residential development featuring finished villas, modern apartments, and row houses designed for contemporary urban living.",
    description: "A comprehensive residential development project showcasing premium construction across multiple housing typologies. The project spans finished villas with meticulous attention to detail, modern apartment complexes with premium amenities, and well-planned row houses. Each structure demonstrates commitment to quality craftsmanship, durable materials, and design excellence that defines modern residential construction.",
    year: "2025",
    status: "completed",
    coverImage: "/images/construction/our-work-finished-villa-08.webp",
    imageUrl: "/images/construction/our-work-finished-villa-08.webp",
    galleryImages: [
      "/images/construction/our-work-finished-villa-08.webp",
      "/images/construction/our-work-finished-apartment-09.webp",
      "/images/construction/our-work-finished-row-houses-12.webp",
    ],
    featured: true,
    position: 1,
  },
  exteriorProject("Sastha Construction - Elevation_2 - Photo_1 - Photo.jpg", "Sastha Construction Elevation", "sastha-construction-elevation", 3),
  exteriorProject("NFC_2 - Photo.jpg", "NFC Exterior Design 1", "nfc-2", 4),
  exteriorProject("NFC_OPT -3_3 - Photo.jpg", "NFC Exterior Design 2", "nfc-opt-3-3", 5),
  exteriorProject("OPT -1_2 - Photo.jpg", "OPT Exterior Design 1", "opt-1-2", 6),
  exteriorProject("OPT -2_4 - Photo.jpg", "OPT Exterior Design 2", "opt-2-4", 7),
  exteriorProject("OPT -3_3 - Photo.jpg", "OPT Exterior Design 3", "opt-3-3", 8),
  exteriorProject("2_2 - Photo.jpg", "Exterior Design 2.2", "2-2", 9),
  exteriorProject("Untitled-1.jpg", "Exterior Design Project", "untitled-1", 10),
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB");

    for (const project of projects) {
      const existing = await Project.findOne({ slug: project.slug });
      if (existing) {
        console.log(`Skipping "${project.title}" (slug: ${project.slug}) — already exists`);
        continue;
      }
      await Project.create(project);
      console.log(`Created "${project.title}" (slug: ${project.slug})`);
    }

    console.log("Seed complete");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
