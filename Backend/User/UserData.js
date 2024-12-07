const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.SECRET_KEY
const dataBaseLink = process.env.DATABASE_URL
console.log("The database link is :" + dataBaseLink)
console.log("The secret key is " + secret)
const express = require("express")
const router = express.Router()
const zod = require("zod")
const { PrismaClient } =  require('@prisma/client')
const prisma = new PrismaClient()

const effectiveUserEntry = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/createUser" , async(req,res)=>{
    let {success} = effectiveUserEntry.safeParse(req.body)
    if(!success) return res.json({msg:"Your data is not in proper format try to create it in a proper format"})
    // now we are going to check that kahin ye user already to present nahi hai na
    
    try{
    let userChecker = await prisma.user.findUnique({
        where:{
            username:req.body.username
        }
    })

    if(userChecker) return res.json({msg:"User with this email already exist here || try to add a new user"})

    let {username , password} = req.body

    console.log("The value of user is :" + username)
    console.log("The value of password of the user is : " + password)
    
    
      let userData = await prisma.user.create({
         data:{
            username : username,
            password: password
         }
      })
      
      // now we are going to give the jwt
      let userId = userData.id
      console.log("The id of the user is : " + userId)
      let createToken = jwt.sign({userId} , secret)
      res.json({
        token:createToken,
        msg :"Successfully created the token"
      })
    }

    catch(error){
        res.json({msg:"Something went wrong in the catch system " + error})
    }

})



router.post("/getbackuser" , async(req,res)=>{
    let {success} = effectiveUserEntry.safeParse(req.body)
    if(!success) return res.json({msg:"Your data is not in proper format try to create it in a proper format"})
    // now we are going to check that kahin ye user already to present nahi hai na


    try{
    let userChecker = await prisma.user.findUnique({
        where:{
            username:req.body.username
        }
    })

    if(!userChecker) return res.json({msg:"User with this email don't exist || Please try to again add the email"})
    if(userChecker.password !== req.body.password) return res.json({msg : "The password which you added is incorrect"})
    
    
    else{
        // now we are going to give the jwt
        let userId = userChecker.id
        let createToken = jwt.sign({userId} , secret)
        res.json({
            token:createToken,
            msg :"Successfully created the token"
        })
        }
    }

     

    catch(error){
        res.json({msg:"Something went wrong in the catch system " + error})
    }

})


router.get("/userinfo" , (req,res)=>{
   
})

module.exports = router