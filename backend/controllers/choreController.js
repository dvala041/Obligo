const Chore = require('../models/ChoreModel')
const mongoose = require('mongoose')

//get all chores; filter it the way you like with query params
const getChores = async(req, res) => {
    const chores = await Chore.find({...req.query}).sort({createdAt:-1})
    res.status(200).json(chores)
}

//get a chore
const getChore = async(req, res) => {
    const { id } = req.params

    //check if the id is even in valid format
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json("Invalid ID")
    }

    const chore = await Chore.findById(id)

    if(!chore) {
        return res.status(400).json({error: "Chore does not exist"})
    }
    res.status(200).json(chore)   
} 

//create a chore
const createChore = async(req, res) => {
    const {title, description, due_date, points, status, assigned_user} = req.body

    //need a try catch incase body values are incorrect or missing
    try {
        const chore = await Chore.create({title, description, due_date, points, status, assigned_user})
        res.status(200).json(chore)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete chore
const deleteChore = async(req, res) => {
    const {id} = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json("Invalid ID")
    }

    const chore = await Chore.findByIdAndDelete(id)

    if(!chore) {
        return res.status(400).json({error: "Chore doesn't exist"})
    }

    res.status(200).json(chore)
}

//update a chore
const updateChore = async(req, res) => {
    const { id } = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json("Invalid ID")
    }

    const chore = await Chore.findByIdAndUpdate(id, {...req.body})

    if(!chore) {
        return res.status(400).json("Chore doesn't exist")
    }

    const updatedChore = await Chore.findById(id)

    res.status(200).json(updatedChore)
}



module.exports = {
    getChores,
    getChore,
    createChore,
    deleteChore,
    updateChore
}