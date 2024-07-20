const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema

const userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    choresComplete: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'User'
    },
    familyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
        default: null
    }
})

userSchema.statics.login = async function(username, password) {
    if(!username || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({username})

    if(!user) {
        throw Error("User doesn't exist")
    }

    //compare(password, hash) NOT other way around
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error("Username or password is incorrect")
    }
    return user
}

userSchema.statics.signup = async function(username, password) {
    if(!username || !password) {
        throw Error("All fields must be filled")
    }
    
    //check if username already taken
    const exists = await this.findOne({username})

    if(exists) {
        throw Error ("Username already taken")
    }


    //create user
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, password: hash})
    return user
}

module.exports = mongoose.model('User', userSchema)