const express = require("express")
const profile = require("../controllers/profile")
const { signup, login } = require("../controllers/authController")
const validate = require("../middleware/validateToken")
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/profile", validate, profile)

module.exports = router