import mongoose, { Schema, type Document } from "mongoose"

export interface PortfolioProjectDocument extends Document {
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

const ourWorkProjectSchema = new Schema<PortfolioProjectDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    division: { type: String, required: true, index: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Upcoming"],
      default: "Completed",
    },
    coverImage: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "portfolioprojects" }
)

export default mongoose.models.OurWorkProject ||
  mongoose.model<PortfolioProjectDocument>("OurWorkProject", ourWorkProjectSchema)
