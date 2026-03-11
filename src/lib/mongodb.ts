import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* ---- Schemas ---- */

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
