import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
    throw new Error("Please add your DATABASE_URL to .env.local");
}

export const DATABASE_CONNECTION = mongoose.createConnection(DATABASE_URL, {
    maxConnecting: 10,
    bufferCommands: false
});

export const connectToDatabase = async () => {
    if (DATABASE_CONNECTION.readyState === 1)
        return;
    await DATABASE_CONNECTION.asPromise();
};