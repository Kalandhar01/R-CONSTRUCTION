import dbConnect from "@/lib/db"
import OurWorkProjectModel from "@/models/OurWorkProject"

export type OurWorkProject = {
  _id: string
  id: string
  title: string
  slug: string
  division: string
  shortDescription: string
  description: string
  location: string
  status: "Completed" | "Ongoing" | "Upcoming"
  coverImage: string
  galleryImages: string[]
  featured: boolean
  published: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

function toPlain(doc: Record<string, unknown>): OurWorkProject {
  const id = String(doc._id)
  return {
    _id: id,
    id,
    title: doc.title as string,
    slug: doc.slug as string,
    division: doc.division as string,
    shortDescription: (doc.shortDescription as string) || "",
    description: (doc.description as string) || "",
    location: (doc.location as string) || "",
    status: (doc.status as "Completed" | "Ongoing" | "Upcoming") || "Completed",
    coverImage: (doc.coverImage as string) || "",
    galleryImages: (doc.galleryImages as string[]) || [],
    featured: !!doc.featured,
    published: !!doc.published,
    displayOrder: (doc.displayOrder as number) || 0,
    createdAt: doc.createdAt as Date,
    updatedAt: doc.updatedAt as Date,
  }
}

export async function getProjectsByDivision(division: string): Promise<OurWorkProject[]> {
  try {
    await dbConnect()
    const docs = await OurWorkProjectModel.find({ division, published: true })
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .lean()
    return (docs as unknown as Record<string, unknown>[]).map(toPlain)
  } catch (error) {
    console.warn("[our-works] Failed to fetch projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<OurWorkProject | null> {
  try {
    await dbConnect()
    const doc = await OurWorkProjectModel.findOne({ slug, published: true }).lean()
    if (!doc) return null
    return toPlain(doc as unknown as Record<string, unknown>)
  } catch (error) {
    console.warn("[our-works] Failed to fetch project by slug:", error)
    return null
  }
}
