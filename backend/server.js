require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const choreRoutes = require('./routes/choreRoutes')
const userRoutes = require('./routes/userRoutes')
const familyRoutes = require('./routes/familyRoutes')
const cors = require('cors')
const dataCleanup = require('./cron/cleanup')
const markDone = require('./cron/markLate')



const app = express()

app.use(express.json()) //Middleware for accessing the req object
app.use((req, res, next) => { 
    console.log(req.path, req.method)
    next()
})

app.use(cors({origin: "http://localhost:3000"}))


//Middleware for checking routes
app.use("/api/chore", choreRoutes) 
app.use("/api/user", userRoutes)
app.use("/api/family", familyRoutes)

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

app.get("*", (req, res) => {
    res.send("You have reached a route not defined in this API");
  });