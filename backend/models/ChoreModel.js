const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const choreSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    assigned_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model("Chore", choreSchema)