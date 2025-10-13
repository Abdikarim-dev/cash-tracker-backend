const express = require("express")
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/User")

const router = express.Router()

router.get("/read", getUsers)
router.post("/create", createUser)
router.patch("/update", updateUser)
router.delete("/delete", deleteUser)

module.exports = router