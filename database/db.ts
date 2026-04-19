import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL!;

if (!MONGO_URL) {
  throw new Error("MONGO_URL no definida");
}

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseCache ||= {
  conn: null,
  promise: null,
};

export const connect = async () => {
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGO_URL, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;

  console.log("Mongo conectado");

  return global.mongooseCache.conn;
};

export const disconnect = async () => {
  // no hacer nada en Vercel/serverless
  return;
};