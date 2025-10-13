const express = require("express")
const dotenv = require("dotenv")
const chalk = require("chalk")

const { connectDB } = require("./config/config")
const app = express()

dotenv.config()

const userRouter = require("./routes/User")

const PORT = process.env.PORT || 8007
connectDB()

app.use("/api/user", userRouter)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON :${chalk.yellow(`http://localhost:${PORT}`)}`)
})