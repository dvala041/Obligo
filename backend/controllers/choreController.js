const Chore = require('../models/ChoreModel')
const User = require('../models/UserModel')
const mongoose = require('mongoose')

//get all chores; filter it the way you like with query params
const getChores = async(req, res) => {
    const {assigned_user, status, created_by} = req.query

    const filter = {}

    //need assigned_user and status for home and completed pages
    if(assigned_user && status) {
        filter.assigned_user = assigned_user //filter looks like this: {assigned_user}

        if (status.startsWith('ne:')) {
            const value = status.slice(3); // Get the value after 'ne:'
            filter.status = { $ne: value }; //creates a filter query for not equal to in MongoDB
          } else if (status) {
            filter.status = status;
          }
    //only need created_by for the all chores page
    } else if(created_by) {
        filter.created_by = created_by
    }

    try {
        const chores = await Chore.find(filter).sort({createdAt:-1})
        return res.status(200).json(chores)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
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
    return res.status(200).json(chore)   
} 

//create a chore
const createChore = async(req, res) => {
    const {title, description, due_date, points, assigned_user, created_by} = req.body
    const status = "Assigned"

    let emptyFields = []
    if(!title) {emptyFields.push("title")}
    if(!description) {emptyFields.push("description")}
    if(!due_date) { {emptyFields.push("due_date")}}
    if(points === "" || points === null) {{emptyFields.push("points")}}
    if(!assigned_user) {{emptyFields.push("assigned_user")}}

    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields!", emptyFields})
    }

    //need a try catch incase body values are incorrect or missing
    try {
        const chore = await Chore.create({title, description, due_date, points, status, assigned_user, created_by})
        return res.status(200).json(chore)
    } catch (error) {
        return res.status(400).json({error: error.message})
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

    return res.status(200).json(chore._id)
}

//update a chore
const updateChore = async(req, res) => {
    const { id: choreId } = req.params
    const {title, description, due_date, points, assigned_user, status} = req.body

    let emptyFields = []

    if(!title) {emptyFields.push("title")}
    if(!description) { emptyFields.push("description")}
    if(!due_date) {emptyFields.push("due_date")}
    if(points === "" || points === null) {emptyFields.push("points")}
    if(!assigned_user) {emptyFields.push("assigned_user")}
    if(!status) {emptyFields.push("status")}

    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill all fields", emptyFields})
    }

    if(!mongoose.isValidObjectId(choreId) || !mongoose.isValidObjectId(assigned_user)) {
        return res.status(400).json("Invalid ID", emptyFields)
    }

    const assigned_user_exists = User.findById(assigned_user)

    if(!assigned_user_exists) {
        return res.status(400).json({error: "User does not exist", emptyFields})
    }

    const chore = await Chore.findByIdAndUpdate(choreId, {title, description, due_date, points, assigned_user, status}, {new: true})

    if(!chore) {
        return res.status(400).json("Chore doesn't exist", emptyFields)
    }

    return res.status(200).json(chore)
}


const markDone = async (req, res) => {
    // Extract chore ID from request parameters
    const { id: choreId } = req.params;
    const { created_by, assigned_user, status, points } = req.body;
  
    // Validate input
    if (!mongoose.Types.ObjectId.isValid(choreId) ||!mongoose.Types.ObjectId.isValid(created_by) || !mongoose.Types.ObjectId.isValid(assigned_user)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    let newStatus

    //this runs if an admin is approving a chore hits "Done"
    if (status === "Pending") {
        newStatus = "Completed"

    //this runs when the assigned user hits "Done"
    } else if (status === "Assigned") {
        newStatus = created_by === assigned_user ? "Completed" : "Pending"
    }

    let user
    if(newStatus === "Completed") {
        user = await User.findByIdAndUpdate(assigned_user, {$inc: {points: points, choresComplete: 1}}, {new: true, select: "-password"})
    }
  
    try {
      // Find and update the chore
      const chore = await Chore.findByIdAndUpdate(choreId, { status: newStatus }, { new: true });
  
      // Check if the chore exists
      if (!chore) {
        return res.status(404).json({ error: "Chore not found" });
      }
  
      // Respond with the updated chore
      return res.status(200).json({chore, user});
    } catch (error) {
      // Handle any errors that occur during the database operation
      return res.status(500).json({ error: "An error occurred while updating the chore" });
    }
  };
  



module.exports = {
    getChores,
    getChore,
    createChore,
    deleteChore,
    updateChore, 
    markDone
}