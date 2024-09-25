const mongoose = require("mongoose")

const connectDb = async(req,res) => {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
        console.log("Database connection error")
    }
}
module.exports = connectDb