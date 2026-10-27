const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    // Reuse existing connection if already connected (critical for serverless / Vercel)
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            console.warn("MongoDB warning: MONGO_URI is not set in environment variables.");
            return;
        }

        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState >= 1;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        // Do not crash the entire process in serverless environments
        if (!process.env.VERCEL) {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
