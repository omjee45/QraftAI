const mongoose = require("mongoose")

async function connectToDB() {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL

    if (!uri) {
        console.error("FATAL: MongoDB URI is undefined! Set MONGO_URI or MONGODB_URI in Render environment variables.")
        return
    }

    try {
        await mongoose.connect(uri)
        console.log("Connected to Database successfully")
    }
    catch (err) {
        console.error("MongoDB Connection Failed:", err.message)
    }
}

module.exports = connectToDB