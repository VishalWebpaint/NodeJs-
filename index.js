const express = require("express")
const connectDb = require("./config/db")
const router = require("./routes/routes")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
connectDb()
//routes
app.use("/auth", router)

const port = process.env.port
app.listen(port, ()=> {
    console.log(`Listening to ${port}`)
})