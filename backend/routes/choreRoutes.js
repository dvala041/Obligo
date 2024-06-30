const express = require('express')
const { 
    getChores,
    getChore,
    createChore,
    deleteChore,
    updateChore
} = require("../controllers/choreController")

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

//get all chores
router.get("/", getChores)

//get a single chore
router.get("/:id", getChore)

//create a chore
router.post("/", createChore)

//delete a chore 
router.delete("/:id", deleteChore)


//update a chore
router.patch("/:id", updateChore)


module.exports = router

