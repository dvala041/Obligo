const express = require('express')
const { 
    getChores,
    getChore,
    createChore,
    deleteChore,
    updateChore
} = require("../controllers/choreController")

const router = express.Router()

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

