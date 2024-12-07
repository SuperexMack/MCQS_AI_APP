const express = require("express")
const app = express()
require("dotenv").config()
let PORT = process.env.PORT
const user = require("./User/UserData")
const callAI = require("./AIData/aidata")
const cors = require("cors")
app.get("/" , (req,res)=>{
    res.json({
        msg : "Welcome to the site"
    })
})

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    llowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())


app.use("/v1" , user)
app.use("/v1/ai" , callAI)

app.listen(PORT , ()=>{
    console.log(`Server is running on the port number ${PORT}`)
})