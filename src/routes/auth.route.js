
const express = require("express")
const router = express.Router()
const { authUser } = require("../controllers/auth.controller")

router.post("/login", authUser)

module.exports = router