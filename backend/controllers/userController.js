const User = require('../models/UserModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//create a token for authorization
const createToken =(id) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '3d'} )
}

//Login a user
const loginUser = async(req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        const userWithToken = {...user.toObject(), token}
        delete userWithToken.password

        res.status(200).json(userWithToken)

    } catch(error) {
        res.status(400).json({error: error.message})
    }
} 

//Sign up a user
const signupUser = async(req, res) => {
    const {username, password, permission} = req.body

    try {
        const user = await User.signup(username, password, permission)
        const token = createToken(user._id)

        res.status(200).json({user, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//Get a user by their id
const getUser = async(req, res) => {
    const {id} = req.params

    //if id param is not valid
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error: "Invalid id"})
    }

    const user = await User.findById(id)

    //if user doesn't exist
    if(!user) {
        return res.status(400).json({error: "User doesn't exist"})
    }

    res.status(200).json(user)
}

module.exports = {
    loginUser,
    signupUser,
    getUser
}