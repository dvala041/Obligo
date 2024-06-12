require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const choreRoutes = require('./routes/choreRoutes')


const app = express()

app.use(express.json()) //Middleware for accessing the req object
app.use((req, res, next) => { 
    console.log(req.path, req.method)
    next()
})


//Middleware for checking routes
app.use("/api/chore", choreRoutes) 

//connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected to db and listening on port", process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})