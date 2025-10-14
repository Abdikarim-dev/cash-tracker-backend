const express = require("express")
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/User")

const router = express.Router()

router.get("/read", getUsers)
router.post("/create", createUser)
router.patch("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)

module.exports = router