import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(import.meta.dirname, "../.env") });

import mongoose from "mongoose";

const FIXES: Record<string, { cover: string; gallery: string[] }> = {
  "premium-residential-development": {
    cover: "/images/construction/our-work-finished-villa-08.webp",
    gallery: [
      "/images/construction/our-work-finished-villa-08.webp",
      "/images/construction/our-work-finished-apartment-09.webp",
      "/images/construction/our-work-finished-row-houses-12.webp",
    ],
  },
  "commercial-complex-development": {
    cover: "/images/construction/our-work-commercial-complex-handover-03.webp",
    gallery: [
      "/images/construction/our-work-commercial-complex-handover-03.webp",
      "/images/construction/our-work-commercial-complex-site-01.webp",
      "/images/construction/our-work-commercial-complex-structure-02.webp",
    ],
  },
};

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const db = mongoose.connection.db!;
  const col = db.collection("projects");

  for (const [slug, f] of Object.entries(FIXES)) {
    const res = await col.updateOne(
      { slug },
      { $set: { coverImage: f.cover, imageUrl: f.cover, galleryImages: f.gallery } }
    );
    if (res.modifiedCount > 0) {
      console.log(`Updated ${slug}`);
    } else if (res.matchedCount > 0) {
      console.log(`Already up to date: ${slug}`);
    } else {
      console.log(`Not found: ${slug}`);
    }
  }

  await mongoose.disconnect();
}
fix().catch(console.error);
