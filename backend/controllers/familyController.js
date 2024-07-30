const Family = require('../models/FamilyModel')
const User = require('../models/UserModel')
const mongoose = require('mongoose')


//get all families
const getFamilies = async(req, res) => {
    const families = await Family.find({}).sort({createdAt:-1})
    return res.status(200).json(families)
}

//get family by id
const getFamilyById = async(req, res) => {
    const { id } = req.params

    //check if the id is even in valid format
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error: "Invalid ID"})
    }

    const family = await Family.findById(id).populate("members", "username points choresComplete role")

    if(!family) {
        return res.status(400).json({error: "Family does not exist"})
    }
    return res.status(200).json(family)    
}

//create a family
const createFamily = async(req, res) => {
    const {userId, name} = req.body

    let emptyFields = []
    if(!name) {emptyFields.push("name")}
    if(!userId) {emptyFields.push("userId")}

    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields!", emptyFields})
    }

    if(!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({error: "Invalid Id", emptyFields})
    }

    //need a try catch incase body values are incorrect or missing
    try {

        //CHECK if user exists
        const user = await User.findById(userId)

        if(!user) {
            return res.status(400).json({error: "User doesn't exist", emptyFields})
        }
        // else if (user.familyId) {
        //     return res.status(400).json({error: "Already in a family", emptyFields})
        // }

        const family = await Family.create({name, members: [userId], createdBy: userId})

        //UPDATE USER's FIELDS WHEN THEY CREATE A FAMILY
        const updatedUser = await User.findByIdAndUpdate(userId, {role: "Owner", familyId: family._id}, {new: true, select: '-password'})
        const populatedFamily = await Family.findById(family._id).populate("members", "username points choresComplete role")
        return res.status(200).json({family: populatedFamily, user: updatedUser})

    } catch (error) {
        return res.status(400).json({error: error.message, emptyFields})
    }
}

//add members in a family
const addMember = async(req, res) => {
    const {id: familyId} = req.params
    const { username, role } = req.body //the family id

    let emptyFields = []

    if(!username) {emptyFields.push("username")}
    if(!role) {emptyFields.push("role")}

    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields!", emptyFields})
    }

    if(!mongoose.isValidObjectId(familyId)) {
        return res.status(400).json({error: "Invalid ID", emptyFields})
    }

    const user= await User.findOne({username})
    if(!user) {
        return res.status(400).json({error: "User doesn't exist", emptyFields})
    }

    if(user.familyId != null) {
        return res.status(400).json({error: "User already in another family", emptyFields})
    }

    const user_id = user._id

    if(role !== "Admin" && role !== "Member") {
        return res.status(400).json({error: "Invalid role", emptyFields})
    }

    const family = await Family.findByIdAndUpdate(familyId, { $addToSet: { members: user_id } }) //adds a member's id to the member list

    if(!family) {
        return res.status(400).json({error: "Family doesn't exist", emptyFields})
    }

    const updatedFamily = await Family.findById(familyId)//.populate("members", "username points choresComplete role")

    if(family.members.length === updatedFamily.members.length) {
        return res.status(400).json({error: "User already in family!", emptyFields})
    }

    const newUser = await User.findByIdAndUpdate(user_id, {role, familyId, points: 0, choresComplete: 0}, {new: true, select: '-password -familyId'})
    return res.status(200).json(newUser)
}

// REMOVES A MEMBER FROM A FAMILY
const removeMember = async(req, res) => {
    const {id: familyId} = req.params
    const {userId} = req.body

    if (!mongoose.isValidObjectId(familyId) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const family = await Family.findById(familyId)

    if(!family) {
        return res.status(400).json({error: "Family not found"})
    }

    const isMember = await Family.findOne({_id: familyId, members: {$in: [userId]}})

    if(!isMember) {
        return res.status(400).json({error: "User is not a member of this family"})
    }

    //remove them from the member list
    family.members = family.members.filter(member => member.toString() !== userId) //make new array excluding the userId
    await family.save()

     //set their familyId to null and their role to User
    const user = await User.findByIdAndUpdate(userId, {role: "User", familyId: null, points: 0, choresComplete: 0}, {new: true, select: '-password'}) 

    return res.status(200).json(user)
}

//returns updated User object
const updateMember = async(req, res) => {
    const {id: familyId} = req.params 
    const {userId, role, points, choresComplete, editorId} = req.body 

    let emptyFields = []

    if(!role) {emptyFields.push("role")}
    if(points === "" || points === null) {emptyFields.push("points")}
    if(choresComplete === "" || points === null) {emptyFields.push("choresComplete")}

    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill all fields", emptyFields})
    }

    if(!mongoose.isValidObjectId(familyId) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({error: "Invalid id", emptyFields})
    }

    //make sure the user is in the family
    const family = await Family.findById(familyId)

    if(!family) {
        return res.status(400).json({error: "Family doesn't exist", emptyFields})
    }

    const isMember = await Family.findOne({_id: familyId, members: {$in: [userId]}})

    if(!isMember) {
        return res.status(400).json({error: "User is not a member of this family", emptyFields})
    }

    if(role === "Admin" || role === "Member" || role === "Owner") {

        //if we are changing a user's role to owner first check if person making this change is an owner themselves 
        //its assumed but i do wanna be very safe


        let editor = null 

        //this is for assigning a new owner
        if(role === "Owner" && userId != editorId) {
            // if(editorRole !== "Owner") {
            //     return res.status(400).json({error: "You don't have permission to do this", emptyFields})
            // }
            //change the editor's role from "Owner" to "Admin"
            editor = await User.findByIdAndUpdate(editorId, {role: "Admin"}, {new: true, select: '-password -familyId'})
        }

        const user = await User.findByIdAndUpdate(userId, {role, points, choresComplete}, {new: true, select: '-password -familyId'})
        return res.status(200).json({user, editor})
    } else {
        return res.status(400).json({error: "Invalid role", emptyFields})
    }
}

const leaveFamily = async(req, res) => {
    const {id: familyId} = req.params
    const {userId} = req.body

    if(!mongoose.isValidObjectId(familyId) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({error: "Invalid id"})
    }

    const family = await Family.findById(familyId)

    if(!family) {
        return res.status(400).json({error: "Family doesn't exist"})
    }

    const isMember = await Family.findOne({_id: familyId, members: {$in: [userId]}})

    if(!isMember) {
        return res.status(400).json({error: "User is not a member of this family"})
    }

    //Now that we've checked if this is a valid user and family we can proceed with leaving the family
    await Family.findByIdAndUpdate(familyId, {$pull : {members: userId}})
    const user = await User.findByIdAndUpdate(userId, {familyId: null, role: "User", points: 0, choresComplete: 0}, 
        {new: true, select: '-password'})


    //return the userId that we removed from the members array
    return res.status(200).json(user) //I DID {user} AND IT COST ME 20 FUCKING MINUTES TO SOLVE
}

//edit a family (like name)
const updateFamily = async(req, res) => {
    const { id } = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error: "Invalid id"})
    }

    const family = await Family.findByIdAndUpdate(id, {...req.body}, {new: true})

    if(!family) {
        return res.status(400).json({error: "Family doesn't exist"})
    }

    return res.status(200).json(family)
}

//delete a family
const deleteFamily = async(req, res) => {
    const {id} = req.params
    const {userId} = req.body

    if(!userId) {
        return res.status(400).json({error: "Missing userId"})
    }

    if(!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({error: "Invalid id"})
    }

    const family = await Family.findByIdAndDelete(id)

    if(!family) {
        return res.status(400).json({error: "Family doesn't exist"})
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Update each member in the family's members array
        await User.updateMany(
            { _id: { $in: family.members } },
            {
                $set: {
                    points: 0,
                    choresComplete: 0,
                    role: 'User',
                    familyId: null
                }
            },
            { session }
        );

        // Delete the family
        await Family.findByIdAndDelete(id, { session });

        await session.commitTransaction();
        session.endSession();

        const user = await User.findById(userId).select('-password');

        return res.status(200).json(user);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: "Something went wrong", details: error.message });

    }
}


module.exports = {
    getFamilies,
    getFamilyById,
    createFamily,
    updateFamily,
    deleteFamily,
    addMember,
    updateMember,
    removeMember,
    leaveFamily
}