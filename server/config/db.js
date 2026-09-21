const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectDB = async() => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        })
        console.log(`connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB