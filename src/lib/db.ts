import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.warn("[db] MONGODB_URI is not set. Database features will be unavailable.")
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = { conn: null, promise: null }

export async function dbConnect() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined")
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
