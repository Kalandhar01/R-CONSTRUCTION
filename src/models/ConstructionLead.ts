import mongoose, { Schema, type Document } from "mongoose"

export interface ConstructionLeadDocument extends Document {
  fullName: string
  email: string
  phone?: string
  selectedServices: string[]
  projectType?: string
  projectLocation?: string
  budgetRange?: string
  timeline?: string
  message?: string
  status: "new" | "contacted" | "qualified" | "proposal_sent" | "won" | "lost"
  createdAt: Date
  updatedAt: Date
}

const constructionLeadSchema = new Schema<ConstructionLeadDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    selectedServices: { type: [String], default: [] },
    projectType: { type: String },
    projectLocation: { type: String },
    budgetRange: { type: String },
    timeline: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal_sent", "won", "lost"],
      default: "new",
    },
  },
  { timestamps: true, collection: "constructionleads" }
)

export default mongoose.models.ConstructionLead ||
  mongoose.model<ConstructionLeadDocument>("ConstructionLead", constructionLeadSchema)
