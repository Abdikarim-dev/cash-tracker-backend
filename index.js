const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const chalk = require("chalk")

const { connectDB } = require("./config/config")
const app = express()

dotenv.config()
const authRouter = require("./routes/Auth")
const userRouter = require("./routes/User")
const { authenticate, authorize } = require("./middleware/authMiddleware")

const PORT = process.env.PORT || 8007

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}))
connectDB()

app.use("/api/auth", authRouter)
app.use("/api/user", authenticate, authorize("ADMIN"), userRouter)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON :${chalk.yellow(`http://localhost:${PORT}`)}`)
})