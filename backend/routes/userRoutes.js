const express = require('express')
const router = express.Router()

const {
    loginUser,
    signupUser,
    getUser
} = require('../controllers/userController')

router.get("/:id", getUser)

router.post("/login", loginUser)

router.post("/signup", signupUser)



module.exports = router