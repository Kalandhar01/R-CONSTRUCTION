import { NextResponse } from "next/server"
import { uploadImageBuffer } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filename = file.name

    const result = await uploadImageBuffer(buffer, filename)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("[upload] Error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
