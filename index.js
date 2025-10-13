const express = require("express")
const dotenv = require("dotenv")

const { connectDB } = require("./config/config")
const app = express()

dotenv.config()

const PORT = process.env.PORT || 8007
connectDB()

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON :http://localhost:${PORT}`)
})