const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB