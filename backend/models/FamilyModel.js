const mongoose = require('mongoose')

const Schema = mongoose.Schema
const familySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
}, {timestamps:true})

module.exports = mongoose.model("Family", familySchema)