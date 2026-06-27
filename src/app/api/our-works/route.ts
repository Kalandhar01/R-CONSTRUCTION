import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import OurWorkProject from "@/models/OurWorkProject"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const division = searchParams.get("division") || "Construction"
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const admin = searchParams.get("admin") === "true"
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")))

    const filter: Record<string, unknown> = { division }
    if (!admin) filter.published = true
    if (status) filter.status = status
    if (featured === "true") filter.featured = true
    if (featured === "false") filter.featured = false
    if (search) filter.title = { $regex: search, $options: "i" }

    const [docs, total] = await Promise.all([
      OurWorkProject.find(filter)
        .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      OurWorkProject.countDocuments(filter),
    ])

    const works = (docs as unknown as Record<string, unknown>[]).map((d) => ({
      ...d,
      _id: String(d._id),
      id: String(d._id),
    }))

    return NextResponse.json({
      works,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("[our-works] GET Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = (await request.json()) as Record<string, unknown>

    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    let slug = body.slug as string | undefined
    if (!slug) {
      slug = (body.title as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    const existing = await OurWorkProject.findOne({ slug })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const project = await OurWorkProject.create({
      title: body.title,
      slug,
      division: "Construction",
      shortDescription: body.shortDescription || "",
      description: body.description || "",
      location: body.location || "",
      status: body.status || "Completed",
      coverImage: body.coverImage || "",
      galleryImages: body.galleryImages || [],
      featured: body.featured || false,
      published: body.published || false,
      displayOrder: body.displayOrder || 0,
    })

    return NextResponse.json(
      { ...project.toObject(), id: String(project._id) },
      { status: 201 }
    )
  } catch (error) {
    console.error("[our-works] POST Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
