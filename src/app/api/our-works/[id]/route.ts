import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import OurWorkProject from "@/models/OurWorkProject"
import { deleteImage } from "@/lib/cloudinary"
import mongoose from "mongoose"

export const dynamic = "force-dynamic"

async function findDoc(id: string) {
  const isObjectId = mongoose.Types.ObjectId.isValid(id)
  let doc = null
  if (isObjectId) {
    doc = await OurWorkProject.findById(id).lean()
  }
  if (!doc) {
    doc = await OurWorkProject.findOne({ slug: id }).lean()
  }
  return doc
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    const { id } = await params
    const doc = await findDoc(id)
    if (!doc)
      return NextResponse.json({ error: "Work not found" }, { status: 404 })
    return NextResponse.json({
      ...doc,
      _id: String(doc._id),
      id: String(doc._id),
    })
  } catch (error) {
    console.error("[our-works/id] GET Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    const { id } = await params
    const existing = await findDoc(id)
    if (!existing)
      return NextResponse.json({ error: "Work not found" }, { status: 404 })

    const body = await request.json()
    const update: Record<string, unknown> = { ...body }
    delete update._id
    delete update.id
    if (!update.slug && update.title) {
      update.slug = (update.title as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }
    if (update.slug) {
      const slugConflict = await OurWorkProject.findOne({
        slug: update.slug,
        _id: { $ne: existing._id },
      })
      if (slugConflict) {
        update.slug = `${update.slug}-${Date.now()}`
      }
    }

    const doc = await OurWorkProject.findByIdAndUpdate(existing._id, update, {
      new: true,
      runValidators: true,
    }).lean()

    if (!doc)
      return NextResponse.json({ error: "Work not found" }, { status: 404 })

    return NextResponse.json({
      ...doc,
      _id: String(doc._id),
      id: String(doc._id),
    })
  } catch (error) {
    console.error("[our-works/id] PUT Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    const { id } = await params
    const doc = await findDoc(id)
    if (!doc)
      return NextResponse.json({ error: "Work not found" }, { status: 404 })

    const d = doc as unknown as Record<string, unknown>
    const imagesToDelete: string[] = []
    if (d.coverImage && typeof d.coverImage === "string") {
      imagesToDelete.push(d.coverImage as string)
    }
    if (Array.isArray(d.galleryImages)) {
      imagesToDelete.push(...(d.galleryImages as string[]))
    }

    if (imagesToDelete.length > 0) {
      await Promise.allSettled(imagesToDelete.map((url) => deleteImage(url)))
    }

    await OurWorkProject.findByIdAndDelete(d._id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[our-works/id] DELETE Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
