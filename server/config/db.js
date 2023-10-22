const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DBURL,)
        console.log("Mongo DB Connected: ")
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB